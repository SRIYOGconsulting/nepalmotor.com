import { NextRequest, NextResponse } from 'next/server';
import { connectdb } from '@/lib/db';
import SellCar from '@/model/sellCar.model';
import { uploadToExchangeBucket } from '@/lib/gridfs';

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

export async function GET() {
  try {
    await connectdb();
    const cars = await SellCar.find({}).sort({ createdAt: -1 }).populate('user').lean();
    const serialized = JSON.parse(JSON.stringify(cars));
    return NextResponse.json({ success: true, cars: serialized }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch sell cars' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const getStr = (k: string) => String(form.get(k) || '').trim();

    const vehicleModel = getStr('vehicleModel');
    const vehicleBrand = getStr('vehicleBrand');
    const vehicleType = getStr('vehicleType');
    const makeYear = getStr('makeYear');
    const vehicleColor = getStr('vehicleColor');
    const kmDriven = getStr('kmDriven');
    const expectedValuation = getStr('expectedValuation');
    const features = getStr('features');
    const fuelType = getStr('fuelType');
    const condition = getStr('condition');
    const accidents = getStr('accidents');
    const accidentInfo = getStr('accidentInfo');
    const transmission = getStr('transmission');
    const additionalInfo = getStr('additionalInfo');
    const status = getStr('status') || 'approved';

    if (!vehicleModel || !vehicleType || !makeYear || !vehicleColor || !kmDriven || !features || !fuelType || !condition || !accidents || !transmission) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const allowedStatus = new Set(['pending', 'approved', 'rejected', 'sold']);
    const nextStatus = allowedStatus.has(status) ? status : 'approved';

    const rawDoc = form.get('vehicleDocument');
    const rawPhoto = form.get('vehiclePhoto');
    const rawPhotos = form.getAll('vehiclePhotos');
    const vehicleDocument = rawDoc && typeof rawDoc !== 'string' ? rawDoc : null;
    const vehiclePhoto = rawPhoto && typeof rawPhoto !== 'string' ? rawPhoto : null;
    const vehiclePhotos = rawPhotos.filter((f): f is File => typeof f !== 'string');

    const maxBytes = 5 * 1024 * 1024;
    const allowedDocTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
    const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

    const createSet: Record<string, unknown> = {
      vehicleModel,
      vehicleBrand: vehicleBrand || undefined,
      vehicleType,
      makeYear,
      vehicleColor,
      kmDriven,
      expectedValuation: expectedValuation || undefined,
      features,
      fuelType,
      condition,
      accidents,
      accidentInfo: accidentInfo || undefined,
      transmission,
      additionalInfo: additionalInfo || undefined,
      status: nextStatus,
      source: 'admin',
    };

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
      createSet.vehicleDocumentFileId = uploaded.fileId;
      createSet.vehicleDocumentFileName = filename;
      createSet.vehicleDocumentContentType = vehicleDocument.type || undefined;
      createSet.vehicleDocumentSize = vehicleDocument.size || undefined;
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
      createSet.vehiclePhotoFileId = uploaded.fileId;
      createSet.vehiclePhotoFileName = filename;
      createSet.vehiclePhotoContentType = vehiclePhoto.type || undefined;
      createSet.vehiclePhotoSize = vehiclePhoto.size || undefined;
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
      createSet.vehiclePhotos = uploadedPhotos;

      if (!createSet.vehiclePhotoFileId && uploadedPhotos[0]?.fileId) {
        createSet.vehiclePhotoFileId = uploadedPhotos[0].fileId;
        createSet.vehiclePhotoFileName = uploadedPhotos[0].filename;
        createSet.vehiclePhotoContentType = uploadedPhotos[0].contentType;
        createSet.vehiclePhotoSize = uploadedPhotos[0].size;
      }
    }

    await connectdb();
    const created = await SellCar.create(createSet);
    const serialized = JSON.parse(JSON.stringify(created));
    return NextResponse.json({ success: true, car: serialized }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create sell car' }, { status: 500 });
  }
}
