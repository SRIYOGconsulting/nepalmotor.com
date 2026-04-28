import { connectdb } from '@/lib/db';
import { uploadToExchangeBucket } from '@/lib/gridfs';
import SellCar from '@/model/sellCar.model';
import User from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectdb();
    const formData = await req.formData();

    const getText = (key: string) => {
      const v = formData.get(key);
      return typeof v === 'string' ? v.trim() : '';
    };

    const getFile = (key: string) => {
      const v = formData.get(key);
      if (!v) return null;
      if (typeof v === 'string') return null;
      return v;
    };

    const fullName = getText('fullName');
    const email = getText('email');
    const phone = getText('phone').replace(/\D/g, '').slice(0, 10);
    const city = getText('city');

    const vehicleModel = getText('vehicleModel');
    const vehicleBrand = getText('vehicleBrand');
    const vehicleType = getText('vehicleType');
    const makeYear = getText('makeYear').replace(/\D/g, '').slice(0, 4);
    const vehicleColor = getText('vehicleColor');
    const kmDriven = getText('kmDriven');
    const expectedValuation = getText('expectedValuation');
    const features = getText('features');
    const fuelType = getText('fuelType');
    const condition = getText('condition');
    const accidents = getText('accidents');
    const accidentInfo = getText('accidentInfo');
    const transmission = getText('transmission');
    const additionalInfo = getText('additionalInfo');

    const vehicleDocument = getFile('vehicleDocument');
    const vehiclePhoto = getFile('vehiclePhoto');

    if (!fullName || !email || !phone || !city) {
      return NextResponse.json({ success: false, message: 'Full name, email, phone, and city are required' }, { status: 400 });
    }

    if (phone.length !== 10) {
      return NextResponse.json({ success: false, message: 'Phone must be a valid 10-digit number' }, { status: 400 });
    }

    if (
      !vehicleModel ||
      !vehicleType ||
      !makeYear ||
      !vehicleColor ||
      !kmDriven ||
      !features ||
      !fuelType ||
      !condition ||
      !accidents ||
      !transmission
    ) {
      return NextResponse.json({ success: false, message: 'Vehicle details are required' }, { status: 400 });
    }

    const maxBytes = 5 * 1024 * 1024;
    const allowedDocTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
    const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

    const uploads: Record<string, unknown> = {};

    if (vehicleDocument) {
      if (vehicleDocument.size > maxBytes) {
        return NextResponse.json({ success: false, message: 'Document must be 5MB or smaller' }, { status: 400 });
      }
      if (!allowedDocTypes.has(vehicleDocument.type)) {
        return NextResponse.json({ success: false, message: 'Vehicle document must be PDF or an image (JPG/PNG/WEBP)' }, { status: 400 });
      }
      const docUpload = await uploadToExchangeBucket({
        file: vehicleDocument,
        filename: vehicleDocument.name || 'vehicle-document',
        contentType: vehicleDocument.type || 'application/octet-stream',
        metadata: { kind: 'vehicleDocument' },
      });
      uploads.vehicleDocumentFileId = docUpload.fileId;
      uploads.vehicleDocumentFileName = vehicleDocument.name || undefined;
      uploads.vehicleDocumentContentType = vehicleDocument.type || undefined;
      uploads.vehicleDocumentSize = vehicleDocument.size || undefined;
    }

    let photoUpload: { fileId: unknown } | null = null;
    if (vehiclePhoto) {
      if (vehiclePhoto.size > maxBytes) {
        return NextResponse.json({ success: false, message: 'Photo must be 5MB or smaller' }, { status: 400 });
      }
      if (!allowedPhotoTypes.has(vehiclePhoto.type)) {
        return NextResponse.json({ success: false, message: 'Vehicle photo must be an image (JPG/PNG/WEBP)' }, { status: 400 });
      }
      photoUpload = await uploadToExchangeBucket({
        file: vehiclePhoto,
        filename: vehiclePhoto.name || 'vehicle-photo',
        contentType: vehiclePhoto.type || 'application/octet-stream',
        metadata: { kind: 'vehiclePhoto' },
      });
      uploads.vehiclePhotoFileId = photoUpload.fileId;
      uploads.vehiclePhotoFileName = vehiclePhoto.name || undefined;
      uploads.vehiclePhotoContentType = vehiclePhoto.type || undefined;
      uploads.vehiclePhotoSize = vehiclePhoto.size || undefined;
      uploads.vehiclePhotos = [
        {
          fileId: photoUpload.fileId,
          filename: vehiclePhoto.name || undefined,
          contentType: vehiclePhoto.type || undefined,
          size: vehiclePhoto.size || undefined,
        },
      ];
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ fullName, email, phone, city });
      await user.save();
    } else {
      user.fullName = fullName;
      user.email = email;
      user.city = city;
      await user.save();
    }

    const sellCar = new SellCar({
      user: user._id,
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
      ...uploads,
      status: 'pending',
      source: 'user',
    });
    await sellCar.save();

    return NextResponse.json({ success: true, data: { sellCarId: sellCar._id } }, { status: 201 });
  } catch (error) {
    console.error('Error in sell old car request:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
