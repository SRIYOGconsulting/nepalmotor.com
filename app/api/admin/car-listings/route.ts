import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import CarListing from '@/model/carListing.model';
import { connectdb } from '@/lib/db';
import { uploadToCarListingImagesBucket } from '@/lib/carGridfs';

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

export async function GET() {
  try {
    await connectdb();
    const listings = await CarListing.find({}).sort({ createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(listings));
    return NextResponse.json({ success: true, listings: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch car listings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const title = String(form.get('title') || '').trim();
    const make = String(form.get('make') || '').trim();
    const model = String(form.get('model') || '').trim();
    const year = Number(String(form.get('year') || '').trim());
    const price = Number(String(form.get('price') || '').trim());
    const mileageRaw = String(form.get('mileage') || '').trim();
    const mileage = mileageRaw ? Number(mileageRaw) : undefined;
    const transmission = String(form.get('transmission') || '').trim();
    const fuelType = String(form.get('fuelType') || '').trim();
    const location = String(form.get('location') || '').trim();
    const description = String(form.get('description') || '').trim();
    const status = String(form.get('status') || 'available').trim();
    const carType = String(form.get('carType') || '').trim();
    const variant = String(form.get('variant') || '').trim();

    if (!title || !make || !model || !Number.isFinite(year) || !Number.isFinite(price)) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const rawFiles = form.getAll('images');
    const files = rawFiles.filter((f): f is File => typeof f !== 'string');

    const images: Array<{ fileId: mongoose.Types.ObjectId; filename?: string; contentType?: string; size?: number }> = [];
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
      images.push({
        fileId: uploaded.fileId,
        filename,
        contentType: file.type,
        size: file.size,
      });
    }

    await connectdb();
    const listing = await CarListing.create({
      source: 'admin',
      carType: carType || undefined,
      variant: variant || undefined,
      title,
      make,
      model,
      year,
      price,
      mileage: typeof mileage === 'number' && Number.isFinite(mileage) ? mileage : undefined,
      transmission: transmission || undefined,
      fuelType: fuelType || undefined,
      location: location || undefined,
      description: description || undefined,
      status: status || 'available',
      images,
    });

    const serialized = JSON.parse(JSON.stringify(listing));
    return NextResponse.json({ success: true, listing: serialized }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create car listing' }, { status: 500 });
  }
}
