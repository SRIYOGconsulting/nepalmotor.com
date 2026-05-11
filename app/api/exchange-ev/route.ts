import { getAllNewEVVehicleDetails } from '@/actions/exchangeEV.action';
import { sendExchangeAdminNotification } from '@/lib/email';
import { uploadToExchangeBucket } from '@/lib/gridfs';
import ExchangeEV from '@/model/exchangeEV.model';
import SellCar from '@/model/sellCar.model';
import User from '@/model/user.model';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
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

    const newVehicleBrand = getText('newVehicleBrand');
    const newVehicleModel = getText('newVehicleModel');
    const newVehiclePriceRange = getText('newVehiclePriceRange');
    const downpayment = getText('downpayment');
    const finance = getText('finance');
    const additionalInfo = getText('additionalInfo');

    const vehicleDocument = getFile('vehicleDocument');
    const photoFiles = formData.getAll('vehiclePhotos').filter((x): x is File => typeof x !== 'string');

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
      !expectedValuation ||
      !features ||
      !fuelType ||
      !condition ||
      !accidents ||
      !transmission
    ) {
      return NextResponse.json({ success: false, message: 'Old vehicle details are required' }, { status: 400 });
    }

    if (!newVehicleBrand || !newVehicleModel || !newVehiclePriceRange || !downpayment || !finance) {
      return NextResponse.json({ success: false, message: 'New vehicle details are required' }, { status: 400 });
    }

    if (!vehicleDocument) {
      return NextResponse.json({ success: false, message: 'Vehicle document is required' }, { status: 400 });
    }

    if (photoFiles.length < 5) {
      return NextResponse.json({ success: false, message: 'At least 5 vehicle photos are required' }, { status: 400 });
    }

    const maxBytes = 5 * 1024 * 1024;
    if (vehicleDocument.size > maxBytes) {
      return NextResponse.json({ success: false, message: 'Document must be 5MB or smaller' }, { status: 400 });
    }
    for (const f of photoFiles) {
      if (f.size > maxBytes) {
        return NextResponse.json({ success: false, message: 'Each upload must be 5MB or smaller' }, { status: 400 });
      }
    }

    const allowedDocTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
    const allowedPhotoTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
    if (!allowedDocTypes.has(vehicleDocument.type)) {
      return NextResponse.json({ success: false, message: 'Vehicle document must be PDF or an image (JPG/PNG/WEBP)' }, { status: 400 });
    }
    for (const f of photoFiles) {
      if (!allowedPhotoTypes.has(f.type)) {
        return NextResponse.json({ success: false, message: 'Vehicle photo must be an image (JPG/PNG/WEBP)' }, { status: 400 });
      }
    }

    const [docUpload, ...photoUploads] = await Promise.all([
      uploadToExchangeBucket({
        file: vehicleDocument,
        filename: vehicleDocument.name || 'vehicle-document',
        contentType: vehicleDocument.type || 'application/octet-stream',
        metadata: { kind: 'vehicleDocument' },
      }),
      ...photoFiles.map((file, index) =>
        uploadToExchangeBucket({
          file,
          filename: file.name || `vehicle-photo-${index + 1}`,
          contentType: file.type || 'application/octet-stream',
          metadata: { kind: 'vehiclePhoto' },
        }),
      ),
    ]);

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
      expectedValuation,
      features,
      fuelType,
      condition,
      accidents,
      accidentInfo: accidentInfo || undefined,
      transmission,
      additionalInfo: additionalInfo || undefined,
      vehicleDocumentFileId: docUpload.fileId,
      vehicleDocumentFileName: vehicleDocument.name || undefined,
      vehicleDocumentContentType: vehicleDocument.type || undefined,
      vehicleDocumentSize: vehicleDocument.size || undefined,
      vehiclePhotoFileId: photoUploads[0].fileId,
      vehiclePhotoFileName: photoFiles[0].name || undefined,
      vehiclePhotoContentType: photoFiles[0].type || undefined,
      vehiclePhotoSize: photoFiles[0].size || undefined,
      vehiclePhotos: photoUploads.map((upload, i) => ({
        fileId: upload.fileId,
        filename: photoFiles[i].name || undefined,
        contentType: photoFiles[i].type || undefined,
        size: photoFiles[i].size || undefined,
      })),
      status: 'pending',
      source: 'user',
    });
    await sellCar.save();

    const exchangeEv = new ExchangeEV({
      user: user._id,
      sellCar: sellCar._id,
      downPayment: downpayment,
      finance,
      newVehicleBrand,
      newVehicleModel,
      newVehiclePriceRange,
      additionalInfo: additionalInfo || undefined,
      status: 'pending',
    });
    await exchangeEv.save();

    let emailSent = false;
    try {
      await sendExchangeAdminNotification({
        fullName,
        email,
        phone,
        city,
        vehicleModel,
        vehicleType,
        makeYear,
        newVehicleBrand,
        newVehicleModel,
        newVehiclePriceRange,
        createdAtISO: new Date(exchangeEv.createdAt).toISOString(),
      });
      emailSent = true;
    } catch (error) {
      console.error('Failed to send exchange admin notification email:', error);
    }

    return NextResponse.json({ success: true, data: exchangeEv, emailSent }, { status: 201 });
  } catch (error) {
    console.error('Error in exchange ev request:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
   
}


export async function GET() {
    try {
        const result=await getAllNewEVVehicleDetails();
         if (!result.success) {
            return NextResponse.json(
                { error: result.message || "Failed to fetch categories" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, evDetails: result.evDetails }, { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
