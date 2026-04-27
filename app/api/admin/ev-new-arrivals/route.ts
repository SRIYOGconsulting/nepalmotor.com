import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import EvNewArrival from '@/model/evNewArrival.model';
import { uploadToEvNewArrivalsImagesBucket } from '@/lib/evArrivalsGridfs';

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

export async function GET() {
  try {
    await connectdb();
    const items = await EvNewArrival.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(items));
    return NextResponse.json({ success: true, items: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch EV new arrivals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const label = String(form.get('label') || '').trim();
    const priceText = String(form.get('priceText') || '').trim();
    const href = String(form.get('href') || '').trim();
    const sortOrderRaw = String(form.get('sortOrder') || '').trim();
    const sortOrder = sortOrderRaw ? Number(sortOrderRaw) : 0;

    const file = form.get('image');
    if (!label || !priceText) {
      return NextResponse.json({ success: false, message: 'Label and price are required' }, { status: 400 });
    }
    if (!file || typeof file === 'string' || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'Image is required' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'Image must be <= 5MB' }, { status: 400 });
    }
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ success: false, message: 'Only JPG, PNG, or WEBP images are allowed' }, { status: 400 });
    }

    const filename = sanitizeFilename(file.name || 'image');
    const uploaded = await uploadToEvNewArrivalsImagesBucket({ file, filename, contentType: file.type });

    await connectdb();
    const created = await EvNewArrival.create({
      source: 'admin',
      label,
      priceText,
      href: href || undefined,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      imageFileId: uploaded.fileId,
      imageFileName: filename,
      imageContentType: file.type,
      imageSize: file.size,
    });

    const serialized = JSON.parse(JSON.stringify(created));
    return NextResponse.json({ success: true, item: serialized }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create EV new arrival' }, { status: 500 });
  }
}
