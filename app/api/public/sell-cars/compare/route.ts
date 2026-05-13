import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectdb } from '@/lib/db';
import SellCar from '@/model/sellCar.model';
import { MAX_COMPARE } from '@/lib/compareConstants';

type SellLean = {
  _id: unknown;
  vehicleModel?: unknown;
  vehicleBrand?: unknown;
  vehicleType?: unknown;
  makeYear?: unknown;
  vehicleColor?: unknown;
  kmDriven?: unknown;
  expectedValuation?: unknown;
  fuelType?: unknown;
  transmission?: unknown;
  status?: unknown;
  vehiclePhotoFileId?: unknown;
  vehiclePhotos?: Array<{ fileId?: unknown }>;
  user?: { city?: unknown };
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
    const docs = await SellCar.find({
      _id: { $in: objectIds },
      status: 'approved',
    })
      .select({
        vehicleModel: 1,
        vehicleBrand: 1,
        vehicleType: 1,
        makeYear: 1,
        vehicleColor: 1,
        kmDriven: 1,
        expectedValuation: 1,
        fuelType: 1,
        transmission: 1,
        vehiclePhotoFileId: 1,
        vehiclePhotos: 1,
        user: 1,
        status: 1,
      })
      .populate('user', 'city')
      .lean();

    const byId = new Map<string, SellLean>();
    for (const d of docs as SellLean[]) {
      byId.set(String(d._id), d);
    }

    const listings: Array<{
      _id: string;
      title: string;
      priceDisplay: string;
      year: string | null;
      make: string;
      model: string;
      mileage: string | null;
      transmission: string | null;
      fuelType: string | null;
      location: string | null;
      carType: string | null;
      variant: string | null;
      primaryImageUrl: string | null;
    }> = [];

    for (const id of orderedIds) {
      const s = byId.get(id);
      if (!s) continue;
      const firstPhoto =
        Array.isArray(s.vehiclePhotos) && s.vehiclePhotos[0]?.fileId
          ? String(s.vehiclePhotos[0].fileId)
          : s.vehiclePhotoFileId
            ? String(s.vehiclePhotoFileId)
            : '';
      const brand = typeof s.vehicleBrand === 'string' ? s.vehicleBrand : '';
      const model = typeof s.vehicleModel === 'string' ? s.vehicleModel : '';
      const title = `${brand ? `${brand} ` : ''}${model || 'Car'}`.trim() || 'Car';
      const ev = s.expectedValuation;
      const priceDisplay =
        typeof ev === 'string' && ev.trim()
          ? ev.trim()
          : typeof ev === 'number' && Number.isFinite(ev)
            ? `NPR ${ev.toLocaleString('en-US')}`
            : 'Price on request';

      listings.push({
        _id: id,
        title,
        priceDisplay,
        year: typeof s.makeYear === 'string' ? s.makeYear : null,
        make: brand,
        model,
        mileage: typeof s.kmDriven === 'string' ? s.kmDriven : null,
        transmission: typeof s.transmission === 'string' ? s.transmission : null,
        fuelType: typeof s.fuelType === 'string' ? s.fuelType : null,
        location: typeof s.user?.city === 'string' ? s.user.city : null,
        carType: typeof s.vehicleType === 'string' ? s.vehicleType : null,
        variant: typeof s.vehicleColor === 'string' ? s.vehicleColor : null,
        primaryImageUrl: firstPhoto ? `/api/sellcar-files/${firstPhoto}` : null,
      });
    }

    return NextResponse.json({ success: true, listings }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load compare data';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
