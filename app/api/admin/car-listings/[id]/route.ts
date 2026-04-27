import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import CarListing from '@/model/carListing.model';
import { connectdb } from '@/lib/db';
import { deleteCarListingImageById, uploadToCarListingImagesBucket } from '@/lib/carGridfs';

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
    const listing = await CarListing.findById(id).lean();
    if (!listing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const serialized = JSON.parse(JSON.stringify(listing));
    return NextResponse.json({ success: true, listing: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch car listing' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }
  const contentType = req.headers.get('content-type') || '';

  const updateSet: Record<string, unknown> = {};
  const imagesToAdd: Array<{ fileId: mongoose.Types.ObjectId; filename?: string; contentType?: string; size?: number }> = [];

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    const getStr = (k: string) => String(form.get(k) || '').trim();
    const strFields = ['title', 'make', 'model', 'transmission', 'fuelType', 'location', 'status', 'description', 'carType', 'variant'];
    for (const k of strFields) {
      const v = getStr(k);
      if (v !== '') updateSet[k] = v;
    }

    const yearRaw = getStr('year');
    const priceRaw = getStr('price');
    const mileageRaw = getStr('mileage');
    if (yearRaw !== '') updateSet.year = Number(yearRaw);
    if (priceRaw !== '') updateSet.price = Number(priceRaw);
    if (mileageRaw !== '') updateSet.mileage = Number(mileageRaw);

    const rawFiles = form.getAll('images');
    const files = rawFiles.filter((f): f is File => typeof f !== 'string');
    for (const file of files) {
      if (!file || !(file instanceof File)) continue;
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, message: 'Each image must be <= 5MB' }, { status: 400 });
      }
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowed.includes(file.type)) {
        return NextResponse.json({ success: false, message: 'Only JPG, PNG, or WEBP images are allowed' }, { status: 400 });
      }

      const filename = sanitizeFilename(file.name || 'image');
      const uploaded = await uploadToCarListingImagesBucket({
        file,
        filename,
        contentType: file.type || 'application/octet-stream',
      });
      imagesToAdd.push({
        fileId: uploaded.fileId,
        filename,
        contentType: file.type,
        size: file.size,
      });
    }
  } else {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }

    const strFields = ['title', 'make', 'model', 'transmission', 'fuelType', 'location', 'status', 'description', 'carType', 'variant'];
    for (const key of strFields) {
      const v = (body as Record<string, unknown> | null)?.[key];
      if (typeof v === 'string') updateSet[key] = v.trim();
    }
    const year = (body as Record<string, unknown> | null)?.year;
    const price = (body as Record<string, unknown> | null)?.price;
    const mileage = (body as Record<string, unknown> | null)?.mileage;
    if (year !== undefined) updateSet.year = Number(year);
    if (price !== undefined) updateSet.price = Number(price);
    if (mileage !== undefined) updateSet.mileage = mileage === '' ? undefined : Number(mileage);
  }

  try {
    await connectdb();
    const updateOp: Record<string, unknown> = { $set: updateSet };
    if (imagesToAdd.length) updateOp.$push = { images: { $each: imagesToAdd } };
    const updated = await CarListing.findByIdAndUpdate(id, updateOp, { new: true }).lean();
    if (!updated) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const serialized = JSON.parse(JSON.stringify(updated));
    return NextResponse.json({ success: true, listing: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update car listing' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }
  try {
    await connectdb();
    const listing = await CarListing.findById(id).lean();
    if (!listing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    const images = Array.isArray((listing as { images?: unknown }).images) ? ((listing as { images?: unknown }).images as Array<{ fileId?: unknown }>) : [];
    for (const img of images) {
      if (img?.fileId && mongoose.Types.ObjectId.isValid(String(img.fileId))) {
        try {
          await deleteCarListingImageById(new mongoose.Types.ObjectId(String(img.fileId)));
        } catch {}
      }
    }

    await CarListing.deleteOne({ _id: id });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete car listing' }, { status: 500 });
  }
}
