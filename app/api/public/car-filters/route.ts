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

export async function GET(req: NextRequest) {
  try {
    const make = normalizeFilterValue(req.nextUrl.searchParams.get('make'));
    const model = normalizeFilterValue(req.nextUrl.searchParams.get('model'));

    await connectdb();
    const baseFilter: Record<string, unknown> = { status: 'available' };

    const makesRaw = (await CarListing.distinct('make', baseFilter)) as string[];
    const makes = makesRaw.filter(Boolean).sort((a, b) => a.localeCompare(b));

    const carTypesRaw = (await CarListing.distinct('carType', baseFilter)) as string[];
    const carTypes = carTypesRaw.filter(Boolean).sort((a, b) => a.localeCompare(b));

    let models: string[] = [];
    if (make) {
      const modelsRaw = (await CarListing.distinct('model', { ...baseFilter, make })) as string[];
      models = modelsRaw.filter(Boolean).sort((a, b) => a.localeCompare(b));
    }

    let years: number[] = [];
    if (make && model) {
      const yearsRaw = (await CarListing.distinct('year', { ...baseFilter, make, model })) as number[];
      years = yearsRaw
        .filter((y) => typeof y === 'number' && Number.isFinite(y))
        .sort((a, b) => b - a);
    }

    return NextResponse.json(
      {
        success: true,
        makes,
        carTypes,
        models,
        years,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load filters';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
