import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getEnv(name: string) {
  const v = process.env[name];
  return v ? v.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildAuthHeader(apiKey: string) {
  const token = Buffer.from(`anystring:${apiKey}`).toString('base64');
  return `Basic ${token}`;
}

function readStringField(obj: unknown, key: string) {
  if (!obj || typeof obj !== 'object') return '';
  const v = (obj as Record<string, unknown>)[key];
  return typeof v === 'string' ? v : '';
}

function isMailchimpMemberExistsError(status: number, data: unknown) {
  if (status !== 400 && status !== 409) return false;
  const title = readStringField(data, 'title');
  const detail = readStringField(data, 'detail');
  return title.toLowerCase().includes('member exists') || detail.toLowerCase().includes('already a list member');
}

async function applyNewsletterFooterTag(input: {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
  emailLower: string;
}) {
  const subscriberHash = createHash('md5').update(input.emailLower).digest('hex');
  const url = `https://${input.serverPrefix}.api.mailchimp.com/3.0/lists/${input.audienceId}/members/${subscriberHash}/tags`;

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: buildAuthHeader(input.apiKey),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tags: [{ name: 'newsletter_footer', status: 'active' }],
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const emailRaw = typeof body?.email === 'string' ? body.email : '';
    const emailLower = emailRaw.trim().toLowerCase();

    if (!emailLower || !isValidEmail(emailLower)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const apiKey = getEnv('MAILCHIMP_API_KEY');
    const serverPrefix = getEnv('MAILCHIMP_SERVER_PREFIX');
    const audienceId = getEnv('MAILCHIMP_AUDIENCE_ID');

    if (!apiKey || !serverPrefix || !audienceId) {
      return NextResponse.json(
        { success: false, message: 'Newsletter is not configured.' },
        { status: 500 }
      );
    }

    const subscribeUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    const subscribeRes = await fetch(subscribeUrl, {
      method: 'POST',
      headers: {
        Authorization: buildAuthHeader(apiKey),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: emailLower,
        status: 'subscribed',
      }),
    });

    const subscribeData = await subscribeRes.json().catch(() => null);

    if (!subscribeRes.ok && !isMailchimpMemberExistsError(subscribeRes.status, subscribeData)) {
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again later.' },
        { status: 502 }
      );
    }

    await applyNewsletterFooterTag({ apiKey, serverPrefix, audienceId, emailLower }).catch(() => null);

    const message = subscribeRes.ok ? 'Thanks for signing up!' : "You're already subscribed.";
    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to subscribe';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
