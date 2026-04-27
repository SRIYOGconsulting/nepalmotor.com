import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import CarListing from '@/model/carListing.model';

function normalizeFilterValue(value: string | null) {
  const v = (value ?? '').trim();
  if (!v) return '';
  if (v === 'All') return '';
  if (v === 'All years') return '';
  return v;
}

type ListingLean = {
  _id: unknown;
  title?: unknown;
  make?: unknown;
  model?: unknown;
  year?: unknown;
  price?: unknown;
  mileage?: unknown;
  transmission?: unknown;
  variant?: unknown;
  carType?: unknown;
  images?: Array<{ fileId?: unknown }>;
};

export async function GET(req: NextRequest) {
  try {
    const make = normalizeFilterValue(req.nextUrl.searchParams.get('make'));
    const model = normalizeFilterValue(req.nextUrl.searchParams.get('model'));
    const carType = normalizeFilterValue(req.nextUrl.searchParams.get('carType'));
    const yearRaw = normalizeFilterValue(req.nextUrl.searchParams.get('year'));
    const limitRaw = normalizeFilterValue(req.nextUrl.searchParams.get('limit'));

    const limit = Math.max(1, Math.min(50, Number(limitRaw || '20') || 20));
    const year = yearRaw ? Number(yearRaw) : undefined;

    const filter: Record<string, unknown> = { status: 'available' };
    if (make) filter.make = make;
    if (model) filter.model = model;
    if (carType) filter.carType = carType;
    if (typeof year === 'number' && Number.isFinite(year)) filter.year = year;

    await connectdb();
    const listings = await CarListing.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select({
        title: 1,
        make: 1,
        model: 1,
        year: 1,
        price: 1,
        mileage: 1,
        transmission: 1,
        variant: 1,
        carType: 1,
        images: 1,
        createdAt: 1,
      })
      .lean();

    const payload = (listings as ListingLean[]).map((l) => {
      const fileId = l?.images?.[0]?.fileId ? String(l.images[0].fileId) : '';
      return {
        _id: String(l._id),
        title: typeof l.title === 'string' ? l.title : '',
        make: typeof l.make === 'string' ? l.make : '',
        model: typeof l.model === 'string' ? l.model : '',
        year: typeof l.year === 'number' ? l.year : 0,
        price: typeof l.price === 'number' ? l.price : 0,
        mileage: typeof l.mileage === 'number' ? l.mileage : null,
        transmission: typeof l.transmission === 'string' ? l.transmission : null,
        variant: typeof l.variant === 'string' ? l.variant : null,
        carType: typeof l.carType === 'string' ? l.carType : null,
        primaryImageUrl: fileId ? `/api/car-files/${fileId}` : null,
      };
    });

    return NextResponse.json({ success: true, listings: payload }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load car listings';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
