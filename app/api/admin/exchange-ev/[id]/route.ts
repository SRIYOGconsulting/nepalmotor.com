import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import ExchangeEV from '@/model/exchangeEV.model';
import SellCar from '@/model/sellCar.model';

type PatchBody = {
  status?: 'approved' | 'rejected';
  rejectionReason?: string;
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const nextStatus = body?.status;
  if (nextStatus !== 'approved' && nextStatus !== 'rejected') {
    return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
  }

  const reason = typeof body.rejectionReason === 'string' ? body.rejectionReason.trim() : '';
  if (nextStatus === 'rejected' && !reason) {
    return NextResponse.json({ success: false, message: 'Rejection reason is required' }, { status: 400 });
  }

  try {
    await connectdb();

    const exchangeEv = await ExchangeEV.findById(id);
    if (!exchangeEv) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    exchangeEv.status = nextStatus;
    exchangeEv.rejectionReason = nextStatus === 'rejected' ? reason : undefined;
    await exchangeEv.save();

    const sellCarId = (exchangeEv as unknown as { sellCar?: unknown }).sellCar;
    if (sellCarId && mongoose.Types.ObjectId.isValid(String(sellCarId))) {
      await SellCar.findByIdAndUpdate(String(sellCarId), {
        $set: {
          status: nextStatus,
          rejectionReason: nextStatus === 'rejected' ? reason : undefined,
        },
      });
    }

    const serialized = JSON.parse(JSON.stringify(exchangeEv));
    return NextResponse.json({ success: true, exchangeEv: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update exchange request' }, { status: 500 });
  }
}

