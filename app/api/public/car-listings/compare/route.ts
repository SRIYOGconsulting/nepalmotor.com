import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectdb } from '@/lib/db';
import CarListing from '@/model/carListing.model';
import { MAX_COMPARE } from '@/lib/compareConstants';

type ListingLean = {
  _id: unknown;
  title?: unknown;
  make?: unknown;
  model?: unknown;
  year?: unknown;
  price?: unknown;
  mileage?: unknown;
  transmission?: unknown;
  fuelType?: unknown;
  location?: unknown;
  carType?: unknown;
  variant?: unknown;
  status?: unknown;
  images?: Array<{ fileId?: unknown }>;
};

function parseIdsParam(req: NextRequest): string[] {
  const raw = req.nextUrl.searchParams.get('ids');
  if (!raw?.trim()) return [];
  const parts = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const p of parts) {
    if (seen.has(p)) continue;
    seen.add(p);
    unique.push(p);
    if (unique.length >= MAX_COMPARE) break;
  }
  return unique.filter((id) => mongoose.Types.ObjectId.isValid(id));
}

export async function GET(req: NextRequest) {
  try {
    const orderedIds = parseIdsParam(req);
    if (!orderedIds.length) {
      return NextResponse.json({ success: true, listings: [] }, { status: 200 });
    }

    await connectdb();
    const objectIds = orderedIds.map((id) => new mongoose.Types.ObjectId(id));
    const docs = await CarListing.find({
      _id: { $in: objectIds },
      status: 'available',
    })
      .select({
        title: 1,
        make: 1,
        model: 1,
        year: 1,
        price: 1,
        mileage: 1,
        transmission: 1,
        fuelType: 1,
        location: 1,
        carType: 1,
        variant: 1,
        images: 1,
        status: 1,
      })
      .lean();

    const byId = new Map<string, ListingLean>();
    for (const d of docs as ListingLean[]) {
      byId.set(String(d._id), d);
    }

    const listings: Array<{
      _id: string;
      title: string;
      make: string;
      model: string;
      year: number | null;
      price: number | null;
      mileage: number | null;
      transmission: string | null;
      fuelType: string | null;
      location: string | null;
      carType: string | null;
      variant: string | null;
      primaryImageUrl: string | null;
    }> = [];

    for (const id of orderedIds) {
      const l = byId.get(id);
      if (!l) continue;
      const fileId = l?.images?.[0]?.fileId ? String(l.images[0].fileId) : '';
      listings.push({
        _id: id,
        title: typeof l.title === 'string' ? l.title : '',
        make: typeof l.make === 'string' ? l.make : '',
        model: typeof l.model === 'string' ? l.model : '',
        year: typeof l.year === 'number' ? l.year : null,
        price: typeof l.price === 'number' ? l.price : null,
        mileage: typeof l.mileage === 'number' ? l.mileage : null,
        transmission: typeof l.transmission === 'string' ? l.transmission : null,
        fuelType: typeof l.fuelType === 'string' ? l.fuelType : null,
        location: typeof l.location === 'string' ? l.location : null,
        carType: typeof l.carType === 'string' ? l.carType : null,
        variant: typeof l.variant === 'string' ? l.variant : null,
        primaryImageUrl: fileId ? `/api/car-files/${fileId}` : null,
      });
    }

    return NextResponse.json({ success: true, listings }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load compare data';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
