import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import path from 'path';
import { readFile } from 'fs/promises';
import { connectdb } from '@/lib/db';
import CarListing from '@/model/carListing.model';
import EvNewArrival from '@/model/evNewArrival.model';
import SellCar from '@/model/sellCar.model';
import ExchangeEV from '@/model/exchangeEV.model';
import User from '@/model/user.model';
import { carListingSeeds } from '@/data/seed/carListings';
import { evNewArrivalSeeds } from '@/data/seed/evNewArrivals';
import { sellCarSeeds } from '@/data/seed/sellCars';
import { exchangeEvSeeds } from '@/data/seed/exchangeEVRequests';

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

function getContentTypeByExt(filename: string) {
  const ext = filename.toLowerCase().split('.').pop() ?? '';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'pdf') return 'application/pdf';
  return 'application/octet-stream';
}

const PLACEHOLDER_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/ax0Gv8AAAAASUVORK5CYII=';
const PLACEHOLDER_PNG_BUFFER = Buffer.from(PLACEHOLDER_PNG_BASE64, 'base64');

async function getBuckets() {
  await connectdb();
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection is not ready');

  const carListingImages = new mongoose.mongo.GridFSBucket(db, { bucketName: 'carListingImages' });
  const evNewArrivalsImages = new mongoose.mongo.GridFSBucket(db, { bucketName: 'evNewArrivalsImages' });
  const exchangeUploads = new mongoose.mongo.GridFSBucket(db, { bucketName: 'exchangeUploads' });
  return { carListingImages, evNewArrivalsImages, exchangeUploads };
}

async function uploadLocalImage(params: {
  bucket: mongoose.mongo.GridFSBucket;
  absolutePath: string;
  filename: string;
  metadata?: Record<string, unknown>;
}) {
  let buffer: Buffer;
  let contentType = getContentTypeByExt(params.filename);
  let filename = params.filename;
  try {
    buffer = await readFile(params.absolutePath);
  } catch {
    buffer = PLACEHOLDER_PNG_BUFFER;
    contentType = 'image/png';
    const base = path.basename(params.filename, path.extname(params.filename)) || 'image';
    filename = sanitizeFilename(`${base}-placeholder.png`);
  }

  return await new Promise<{ fileId: mongoose.Types.ObjectId; size: number; contentType: string; filename: string }>((resolve, reject) => {
    const uploadStream = params.bucket.openUploadStream(filename, {
      contentType,
      metadata: params.metadata,
    });
    uploadStream.on('error', reject);
    uploadStream.on('finish', () => {
      resolve({
        fileId: uploadStream.id as mongoose.Types.ObjectId,
        size: buffer.length,
        contentType,
        filename,
      });
    });
    uploadStream.end(buffer);
  });
}

async function safeDeleteGridFsFile(bucket: mongoose.mongo.GridFSBucket, id: mongoose.Types.ObjectId) {
  try {
    await bucket.delete(id);
    return true;
  } catch {
    return false;
  }
}

async function resetSeedData() {
  const { carListingImages, evNewArrivalsImages, exchangeUploads } = await getBuckets();

  const carListings = await CarListing.find({ source: 'seed' }).select({ images: 1 }).lean();
  let deletedCarImages = 0;
  for (const listing of carListings) {
    const images = (listing as unknown as { images?: Array<{ fileId?: mongoose.Types.ObjectId }> }).images ?? [];
    for (const img of images) {
      if (!img?.fileId) continue;
      const ok = await safeDeleteGridFsFile(carListingImages, img.fileId);
      if (ok) deletedCarImages += 1;
    }
  }
  const carDeleteRes = await CarListing.deleteMany({ source: 'seed' });

  const evArrivals = await EvNewArrival.find({ source: 'seed' }).select({ imageFileId: 1 }).lean();
  let deletedEvImages = 0;
  for (const arrival of evArrivals) {
    const imageFileId = (arrival as unknown as { imageFileId?: mongoose.Types.ObjectId }).imageFileId;
    if (!imageFileId) continue;
    const ok = await safeDeleteGridFsFile(evNewArrivalsImages, imageFileId);
    if (ok) deletedEvImages += 1;
  }
  const evDeleteRes = await EvNewArrival.deleteMany({ source: 'seed' });

  const seedRegex = /^__seed__:/;
  const sellCars = await SellCar.find({ additionalInfo: { $regex: seedRegex } })
    .select({ vehicleDocumentFileId: 1, vehiclePhotoFileId: 1, vehiclePhotos: 1 })
    .lean();
  let deletedExchangeFiles = 0;
  for (const car of sellCars) {
    const docId = (car as unknown as { vehicleDocumentFileId?: mongoose.Types.ObjectId }).vehicleDocumentFileId;
    const photoId = (car as unknown as { vehiclePhotoFileId?: mongoose.Types.ObjectId }).vehiclePhotoFileId;
    const photos = (car as unknown as { vehiclePhotos?: Array<{ fileId?: mongoose.Types.ObjectId }> }).vehiclePhotos ?? [];
    const ids: mongoose.Types.ObjectId[] = [];
    if (docId) ids.push(docId);
    if (photoId) ids.push(photoId);
    for (const p of photos) {
      if (p?.fileId) ids.push(p.fileId);
    }
    for (const id of ids) {
      const ok = await safeDeleteGridFsFile(exchangeUploads, id);
      if (ok) deletedExchangeFiles += 1;
    }
  }
  const sellCarDeleteRes = await SellCar.deleteMany({ additionalInfo: { $regex: seedRegex } });
  const exchangeDeleteRes = await ExchangeEV.deleteMany({ additionalInfo: { $regex: seedRegex } });
  const userDeleteRes = await User.deleteMany({ fullName: { $regex: /^__seed__/ } });

  return {
    deletedCarListings: carDeleteRes.deletedCount ?? 0,
    deletedCarImages,
    deletedEvArrivals: evDeleteRes.deletedCount ?? 0,
    deletedEvImages,
    deletedSellCars: sellCarDeleteRes.deletedCount ?? 0,
    deletedExchangeEvs: exchangeDeleteRes.deletedCount ?? 0,
    deletedSeedUsers: userDeleteRes.deletedCount ?? 0,
    deletedExchangeFiles,
  };
}

async function seedData() {
  const resetStats = await resetSeedData();
  const { carListingImages, evNewArrivalsImages, exchangeUploads } = await getBuckets();

  const seedTag = `seed-${new Date().toISOString().slice(0, 10)}`;
  const seedPrefix = `__seed__:${seedTag}`;
  const publicDir = path.join(process.cwd(), 'public');

  let insertedCarListings = 0;
  let insertedCarImages = 0;
  for (const seed of carListingSeeds) {
    const images: Array<{ fileId: mongoose.Types.ObjectId; filename?: string; contentType?: string; size?: number }> = [];
    for (const relPath of seed.imagePaths) {
      const requestedFilename = sanitizeFilename(path.basename(relPath));
      const absolutePath = path.join(publicDir, relPath);
      const uploaded = await uploadLocalImage({
        bucket: carListingImages,
        absolutePath,
        filename: requestedFilename,
        metadata: { source: 'seed', seedTag, requestedPath: relPath },
      });
      images.push({ fileId: uploaded.fileId, filename: uploaded.filename, contentType: uploaded.contentType, size: uploaded.size });
      insertedCarImages += 1;
    }

    await CarListing.create({
      source: 'seed',
      carType: seed.carType,
      variant: seed.variant,
      title: seed.title,
      make: seed.make,
      model: seed.model,
      year: seed.year,
      price: seed.price,
      mileage: seed.mileage,
      transmission: seed.transmission,
      fuelType: seed.fuelType,
      location: seed.location,
      status: seed.status,
      images,
    });
    insertedCarListings += 1;
  }

  let insertedEvArrivals = 0;
  let insertedEvImages = 0;
  for (const seed of evNewArrivalSeeds) {
    const requestedFilename = sanitizeFilename(path.basename(seed.imagePath));
    const absolutePath = path.join(publicDir, seed.imagePath);
    const uploaded = await uploadLocalImage({
      bucket: evNewArrivalsImages,
      absolutePath,
      filename: requestedFilename,
      metadata: { source: 'seed', seedTag, requestedPath: seed.imagePath },
    });

    await EvNewArrival.create({
      source: 'seed',
      label: seed.label,
      priceText: seed.priceText,
      href: seed.href,
      sortOrder: seed.sortOrder,
      imageFileId: uploaded.fileId,
      imageFileName: uploaded.filename,
      imageContentType: uploaded.contentType,
      imageSize: uploaded.size,
    });

    insertedEvArrivals += 1;
    insertedEvImages += 1;
  }

  let insertedSellCars = 0;
  let insertedExchangeEvs = 0;
  let insertedExchangeFiles = 0;

  for (const seed of sellCarSeeds) {
    const uploadedPhotos: Array<{ fileId: mongoose.Types.ObjectId; filename?: string; contentType?: string; size?: number }> = [];
    for (const relPath of seed.photoPaths) {
      const requestedFilename = sanitizeFilename(path.basename(relPath));
      const absolutePath = path.join(publicDir, relPath);
      const uploaded = await uploadLocalImage({
        bucket: exchangeUploads,
        absolutePath,
        filename: requestedFilename,
        metadata: { source: 'seed', seedTag, kind: 'vehiclePhoto', requestedPath: relPath },
      });
      uploadedPhotos.push({ fileId: uploaded.fileId, filename: uploaded.filename, contentType: uploaded.contentType, size: uploaded.size });
      insertedExchangeFiles += 1;
    }

    let docUpload: { fileId: mongoose.Types.ObjectId; size: number; contentType: string; filename: string } | null = null;
    if (seed.documentPath) {
      const requestedFilename = sanitizeFilename(path.basename(seed.documentPath));
      const absolutePath = path.join(publicDir, seed.documentPath);
      docUpload = await uploadLocalImage({
        bucket: exchangeUploads,
        absolutePath,
        filename: requestedFilename,
        metadata: { source: 'seed', seedTag, kind: 'vehicleDocument', requestedPath: seed.documentPath },
      });
      insertedExchangeFiles += 1;
    }

    const firstPhoto = uploadedPhotos[0];
    await SellCar.create({
      source: 'admin',
      status: 'approved',
      rejectionReason: undefined,
      vehicleBrand: seed.vehicleBrand || undefined,
      vehicleModel: seed.vehicleModel,
      vehicleType: seed.vehicleType,
      makeYear: seed.makeYear,
      vehicleColor: seed.vehicleColor,
      kmDriven: seed.kmDriven,
      expectedValuation: seed.expectedValuation || undefined,
      features: seed.features,
      fuelType: seed.fuelType,
      condition: seed.condition,
      accidents: seed.accidents,
      accidentInfo: seed.accidentInfo || undefined,
      transmission: seed.transmission,
      additionalInfo: seedPrefix,
      vehiclePhotos: uploadedPhotos,
      vehiclePhotoFileId: firstPhoto?.fileId,
      vehiclePhotoFileName: firstPhoto?.filename,
      vehiclePhotoContentType: firstPhoto?.contentType,
      vehiclePhotoSize: firstPhoto?.size,
      vehicleDocumentFileId: docUpload?.fileId,
      vehicleDocumentFileName: docUpload?.filename,
      vehicleDocumentContentType: docUpload?.contentType,
      vehicleDocumentSize: docUpload?.size,
    });
    insertedSellCars += 1;
  }

  for (const seed of exchangeEvSeeds) {
    const user = await User.create({
      fullName: seed.user.fullName,
      email: seed.user.email,
      phone: seed.user.phone,
      city: seed.user.city,
    });

    const photoFilename = sanitizeFilename(path.basename(seed.sellCar.photoPath));
    const photoAbsolute = path.join(publicDir, seed.sellCar.photoPath);
    const photoUpload = await uploadLocalImage({
      bucket: exchangeUploads,
      absolutePath: photoAbsolute,
      filename: photoFilename,
      metadata: { source: 'seed', seedTag, kind: 'vehiclePhoto', requestedPath: seed.sellCar.photoPath },
    });
    insertedExchangeFiles += 1;

    const docFilename = sanitizeFilename(path.basename(seed.sellCar.documentPath));
    const docAbsolute = path.join(publicDir, seed.sellCar.documentPath);
    const docUpload = await uploadLocalImage({
      bucket: exchangeUploads,
      absolutePath: docAbsolute,
      filename: docFilename,
      metadata: { source: 'seed', seedTag, kind: 'vehicleDocument', requestedPath: seed.sellCar.documentPath },
    });
    insertedExchangeFiles += 1;

    const sellCar = await SellCar.create({
      user: user._id,
      source: 'user',
      status: 'pending',
      rejectionReason: undefined,
      vehicleBrand: seed.sellCar.vehicleBrand || undefined,
      vehicleModel: seed.sellCar.vehicleModel,
      vehicleType: seed.sellCar.vehicleType,
      makeYear: seed.sellCar.makeYear,
      vehicleColor: seed.sellCar.vehicleColor,
      kmDriven: seed.sellCar.kmDriven,
      expectedValuation: seed.sellCar.expectedValuation,
      features: seed.sellCar.features,
      fuelType: seed.sellCar.fuelType,
      condition: seed.sellCar.condition,
      accidents: seed.sellCar.accidents,
      accidentInfo: seed.sellCar.accidentInfo || undefined,
      transmission: seed.sellCar.transmission,
      additionalInfo: seedPrefix,
      vehicleDocumentFileId: docUpload.fileId,
      vehicleDocumentFileName: docUpload.filename,
      vehicleDocumentContentType: docUpload.contentType,
      vehicleDocumentSize: docUpload.size,
      vehiclePhotoFileId: photoUpload.fileId,
      vehiclePhotoFileName: photoUpload.filename,
      vehiclePhotoContentType: photoUpload.contentType,
      vehiclePhotoSize: photoUpload.size,
      vehiclePhotos: [{ fileId: photoUpload.fileId, filename: photoUpload.filename, contentType: photoUpload.contentType, size: photoUpload.size }],
    });

    await ExchangeEV.create({
      user: user._id,
      sellCar: sellCar._id,
      newVehicleBrand: seed.exchange.newVehicleBrand,
      newVehicleModel: seed.exchange.newVehicleModel,
      newVehiclePriceRange: seed.exchange.newVehiclePriceRange,
      downPayment: seed.exchange.downPayment,
      finance: seed.exchange.finance,
      additionalInfo: seedPrefix,
      status: 'pending',
      rejectionReason: undefined,
    });

    insertedExchangeEvs += 1;
  }

  return {
    reset: resetStats,
    inserted: {
      carListings: insertedCarListings,
      carImages: insertedCarImages,
      evArrivals: insertedEvArrivals,
      evImages: insertedEvImages,
      sellCars: insertedSellCars,
      exchangeEvs: insertedExchangeEvs,
      exchangeFiles: insertedExchangeFiles,
    },
  };
}

export async function POST(req: NextRequest) {
  const seedToken = process.env.SEED_TOKEN ?? '';
  const headerToken = req.headers.get('x-seed-token') ?? '';
  if (!seedToken || !headerToken || !constantTimeEqual(seedToken, headerToken)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && process.env.ALLOW_SEED_IN_PROD !== 'true') {
    return NextResponse.json({ success: false, message: 'Seed is disabled in production' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const action = typeof (body as { action?: unknown })?.action === 'string' ? String((body as { action?: unknown }).action) : '';
  if (action !== 'seed' && action !== 'reset') {
    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  }

  try {
    if (action === 'reset') {
      const stats = await resetSeedData();
      return NextResponse.json({ success: true, stats }, { status: 200 });
    }

    const stats = await seedData();
    return NextResponse.json({ success: true, stats }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Seed failed';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
