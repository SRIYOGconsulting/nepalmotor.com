const encoder = new TextEncoder();

function base64UrlEncodeBytes(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlEncodeString(input: string) {
  return base64UrlEncodeBytes(encoder.encode(input));
}

function base64UrlDecodeToString(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (input.length % 4)) % 4);
  const binary = atob(base64);
  let out = '';
  for (let i = 0; i < binary.length; i++) out += binary.charAt(i);
  return out;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
  return out === 0;
}

async function hmacSha256(data: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return new Uint8Array(sig);
}

export type AdminSessionPayload = {
  exp: number;
};

export async function createAdminSessionToken(params: { secret: string; ttlMs?: number }) {
  const ttlMs = params.ttlMs ?? 1000 * 60 * 60 * 24 * 7;
  const payload: AdminSessionPayload = { exp: Date.now() + ttlMs };
  const payloadEncoded = base64UrlEncodeString(JSON.stringify(payload));
  const sig = await hmacSha256(payloadEncoded, params.secret);
  const sigEncoded = base64UrlEncodeBytes(sig);
  return `${payloadEncoded}.${sigEncoded}`;
}

export async function verifyAdminSessionToken(params: { token: string; secret: string }) {
  const parts = params.token.split('.');
  if (parts.length !== 2) return { ok: false as const };
  const [payloadEncoded, sigEncoded] = parts;
  let payloadRaw = '';
  try {
    payloadRaw = base64UrlDecodeToString(payloadEncoded);
  } catch {
    return { ok: false as const };
  }

  let payload: AdminSessionPayload | null = null;
  try {
    payload = JSON.parse(payloadRaw) as AdminSessionPayload;
  } catch {
    return { ok: false as const };
  }

  if (!payload?.exp || typeof payload.exp !== 'number') return { ok: false as const };
  if (Date.now() > payload.exp) return { ok: false as const };

  const expectedSig = await hmacSha256(payloadEncoded, params.secret);
  let sigBytes: Uint8Array;
  try {
    const base64 = sigEncoded.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (sigEncoded.length % 4)) % 4);
    const binary = atob(base64);
    sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) sigBytes[i] = binary.charCodeAt(i);
  } catch {
    return { ok: false as const };
  }

  if (!constantTimeEqual(expectedSig, sigBytes)) return { ok: false as const };

  return { ok: true as const, payload };
}

