import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import SellCar from '@/model/sellCar.model';
import ExchangeEV from '@/model/exchangeEV.model';
import { uploadToExchangeBucket } from '@/lib/gridfs';

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
    const car = await SellCar.findById(id).populate('user').lean();
    if (!car) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const serialized = JSON.parse(JSON.stringify(car));
    return NextResponse.json({ success: true, car: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch sell car' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }

  const contentType = req.headers.get('content-type') || '';
  const updateSet: Record<string, unknown> = {};

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const getStr = (k: string) => String(form.get(k) || '').trim();

      const strFields = [
        'vehicleModel',
        'vehicleBrand',
        'vehicleType',
        'makeYear',
        'vehicleColor',
        'kmDriven',
        'expectedValuation',
        'features',
        'fuelType',
        'condition',
        'accidents',
        'accidentInfo',
        'transmission',
        'additionalInfo',
        'status',
        'rejectionReason',
      ];

      for (const key of strFields) {
        const v = getStr(key);
        if (v !== '') updateSet[key] = v;
      }

      const rawDoc = form.get('vehicleDocument');
      const rawPhoto = form.get('vehiclePhoto');
      const rawPhotos = form.getAll('vehiclePhotos');
      const vehicleDocument = rawDoc && typeof rawDoc !== 'string' ? rawDoc : null;
      const vehiclePhoto = rawPhoto && typeof rawPhoto !== 'string' ? rawPhoto : null;
      const vehiclePhotos = rawPhotos.filter((f): f is File => typeof f !== 'string');

      const maxBytes = 5 * 1024 * 1024;
      const allowedDocTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
      const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

      if (vehicleDocument) {
        if (vehicleDocument.size > maxBytes) {
          return NextResponse.json({ success: false, message: 'Document must be <= 5MB' }, { status: 400 });
        }
        if (!allowedDocTypes.has(vehicleDocument.type)) {
          return NextResponse.json({ success: false, message: 'Document must be PDF or an image (JPG/PNG/WEBP)' }, { status: 400 });
        }
        const filename = sanitizeFilename(vehicleDocument.name || 'vehicle-document');
        const uploaded = await uploadToExchangeBucket({
          file: vehicleDocument,
          filename,
          contentType: vehicleDocument.type || 'application/octet-stream',
          metadata: { kind: 'vehicleDocument', source: 'admin' },
        });
        updateSet.vehicleDocumentFileId = uploaded.fileId;
        updateSet.vehicleDocumentFileName = filename;
        updateSet.vehicleDocumentContentType = vehicleDocument.type || undefined;
        updateSet.vehicleDocumentSize = vehicleDocument.size || undefined;
      }

      if (vehiclePhoto) {
        if (vehiclePhoto.size > maxBytes) {
          return NextResponse.json({ success: false, message: 'Photo must be <= 5MB' }, { status: 400 });
        }
        if (!allowedPhotoTypes.has(vehiclePhoto.type)) {
          return NextResponse.json({ success: false, message: 'Photo must be an image (JPG/PNG/WEBP)' }, { status: 400 });
        }
        const filename = sanitizeFilename(vehiclePhoto.name || 'vehicle-photo');
        const uploaded = await uploadToExchangeBucket({
          file: vehiclePhoto,
          filename,
          contentType: vehiclePhoto.type || 'application/octet-stream',
          metadata: { kind: 'vehiclePhoto', source: 'admin' },
        });
        updateSet.vehiclePhotoFileId = uploaded.fileId;
        updateSet.vehiclePhotoFileName = filename;
        updateSet.vehiclePhotoContentType = vehiclePhoto.type || undefined;
        updateSet.vehiclePhotoSize = vehiclePhoto.size || undefined;
      }

      if (vehiclePhotos.length) {
        const uploadedPhotos: Array<{ fileId: unknown; filename?: string; contentType?: string; size?: number }> = [];
        for (const file of vehiclePhotos) {
          if (file.size > maxBytes) {
            return NextResponse.json({ success: false, message: 'Each photo must be <= 5MB' }, { status: 400 });
          }
          if (!allowedPhotoTypes.has(file.type)) {
            return NextResponse.json({ success: false, message: 'Photos must be JPG, PNG, or WEBP' }, { status: 400 });
          }
          const filename = sanitizeFilename(file.name || 'vehicle-photo');
          const uploaded = await uploadToExchangeBucket({
            file,
            filename,
            contentType: file.type || 'application/octet-stream',
            metadata: { kind: 'vehiclePhoto', source: 'admin' },
          });
          uploadedPhotos.push({
            fileId: uploaded.fileId,
            filename,
            contentType: file.type || undefined,
            size: file.size || undefined,
          });
        }
        updateSet.vehiclePhotos = uploadedPhotos;

        if (!updateSet.vehiclePhotoFileId && uploadedPhotos[0]?.fileId) {
          updateSet.vehiclePhotoFileId = uploadedPhotos[0].fileId;
          updateSet.vehiclePhotoFileName = uploadedPhotos[0].filename;
          updateSet.vehiclePhotoContentType = uploadedPhotos[0].contentType;
          updateSet.vehiclePhotoSize = uploadedPhotos[0].size;
        }
      }
    } else {
      let body: Record<string, unknown>;
      try {
        body = (await req.json()) as Record<string, unknown>;
      } catch {
        return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
      }
      const keys = [
        'vehicleModel',
        'vehicleBrand',
        'vehicleType',
        'makeYear',
        'vehicleColor',
        'kmDriven',
        'expectedValuation',
        'features',
        'fuelType',
        'condition',
        'accidents',
        'accidentInfo',
        'transmission',
        'additionalInfo',
        'status',
        'rejectionReason',
      ];
      for (const key of keys) {
        const v = body[key];
        if (typeof v === 'string') updateSet[key] = v.trim();
      }
    }

    const allowedStatus = new Set(['pending', 'approved', 'rejected', 'sold']);
    if (updateSet.status !== undefined) {
      const s = String(updateSet.status);
      if (!allowedStatus.has(s)) {
        return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
      }
      updateSet.status = s;
    }

    if (updateSet.status === 'rejected') {
      const reason = typeof updateSet.rejectionReason === 'string' ? updateSet.rejectionReason.trim() : '';
      if (!reason) {
        return NextResponse.json({ success: false, message: 'Rejection reason is required' }, { status: 400 });
      }
      updateSet.rejectionReason = reason;
    }

    if (updateSet.status === 'approved' || updateSet.status === 'sold' || updateSet.status === 'pending') {
      if ('rejectionReason' in updateSet) updateSet.rejectionReason = undefined;
    }

    await connectdb();
    const updated = await SellCar.findByIdAndUpdate(id, { $set: updateSet }, { new: true }).lean();
    if (!updated) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    const updatedStatus = String((updated as { status?: unknown }).status || '');
    const updatedReason = (updated as { rejectionReason?: unknown }).rejectionReason;
    if (updatedStatus === 'approved' || updatedStatus === 'rejected') {
      const ex = await ExchangeEV.findOne({ sellCar: new mongoose.Types.ObjectId(id) }).lean();
      if (ex && (ex as { _id?: unknown })._id) {
        await ExchangeEV.findByIdAndUpdate(String((ex as { _id: unknown })._id), {
          $set: {
            status: updatedStatus,
            rejectionReason: updatedStatus === 'rejected' ? (typeof updatedReason === 'string' ? updatedReason : undefined) : undefined,
          },
        });
      }
    }

    const serialized = JSON.parse(JSON.stringify(updated));
    return NextResponse.json({ success: true, car: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update sell car' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
  }
  try {
    await connectdb();
    const deleted = await SellCar.findByIdAndDelete(id).lean();
    if (!deleted) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete sell car' }, { status: 500 });
  }
}
