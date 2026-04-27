import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import EvNewArrival from '@/model/evNewArrival.model';
import { deleteEvNewArrivalImageById, uploadToEvNewArrivalsImagesBucket } from '@/lib/evArrivalsGridfs';

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }
  try {
    await connectdb();
    const item = await EvNewArrival.findById(id).lean();
    if (!item) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const serialized = JSON.parse(JSON.stringify(item));
    return NextResponse.json({ success: true, item: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch EV new arrival' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }

  const contentType = req.headers.get('content-type') || '';
  const updateSet: Record<string, unknown> = {};
  let newImage: { fileId: mongoose.Types.ObjectId; filename: string; contentType: string; size: number } | null = null;

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const label = String(form.get('label') || '').trim();
    const priceText = String(form.get('priceText') || '').trim();
    const href = String(form.get('href') || '').trim();
    const sortOrderRaw = String(form.get('sortOrder') || '').trim();
    if (label !== '') updateSet.label = label;
    if (priceText !== '') updateSet.priceText = priceText;
    if (href !== '') updateSet.href = href;
    if (sortOrderRaw !== '') updateSet.sortOrder = Number(sortOrderRaw);

    const file = form.get('image');
    if (file && typeof file !== 'string' && file instanceof File && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, message: 'Image must be <= 5MB' }, { status: 400 });
      }
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(file.type)) {
        return NextResponse.json({ success: false, message: 'Only JPG, PNG, or WEBP images are allowed' }, { status: 400 });
      }
      const filename = sanitizeFilename(file.name || 'image');
      const uploaded = await uploadToEvNewArrivalsImagesBucket({ file, filename, contentType: file.type });
      newImage = { fileId: uploaded.fileId, filename, contentType: file.type, size: file.size };
    }
  } else {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }
    const rec = body as Record<string, unknown> | null;
    if (typeof rec?.label === 'string') updateSet.label = rec.label.trim();
    if (typeof rec?.priceText === 'string') updateSet.priceText = rec.priceText.trim();
    if (typeof rec?.href === 'string') updateSet.href = rec.href.trim();
    if (rec?.sortOrder !== undefined) updateSet.sortOrder = Number(rec.sortOrder);
  }

  try {
    await connectdb();
    const existing = await EvNewArrival.findById(id).lean();
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    if (newImage) {
      const oldId = (existing as { imageFileId?: unknown }).imageFileId;
      if (oldId && mongoose.Types.ObjectId.isValid(String(oldId))) {
        try {
          await deleteEvNewArrivalImageById(new mongoose.Types.ObjectId(String(oldId)));
        } catch {}
      }
      updateSet.imageFileId = newImage.fileId;
      updateSet.imageFileName = newImage.filename;
      updateSet.imageContentType = newImage.contentType;
      updateSet.imageSize = newImage.size;
    }

    const updated = await EvNewArrival.findByIdAndUpdate(id, { $set: updateSet }, { new: true }).lean();
    const serialized = JSON.parse(JSON.stringify(updated));
    return NextResponse.json({ success: true, item: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update EV new arrival' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }
  try {
    await connectdb();
    const existing = await EvNewArrival.findById(id).lean();
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    const imageId = (existing as { imageFileId?: unknown }).imageFileId;
    if (imageId && mongoose.Types.ObjectId.isValid(String(imageId))) {
      try {
        await deleteEvNewArrivalImageById(new mongoose.Types.ObjectId(String(imageId)));
      } catch {}
    }

    await EvNewArrival.deleteOne({ _id: id });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete EV new arrival' }, { status: 500 });
  }
}
