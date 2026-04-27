import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import path from 'path';
import { readFile } from 'fs/promises';
import { connectdb } from '@/lib/db';
import CarListing from '@/model/carListing.model';
import EvNewArrival from '@/model/evNewArrival.model';
import { carListingSeeds } from '@/data/seed/carListings';
import { evNewArrivalSeeds } from '@/data/seed/evNewArrivals';

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
  return { carListingImages, evNewArrivalsImages };
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
  const { carListingImages, evNewArrivalsImages } = await getBuckets();

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

  return {
    deletedCarListings: carDeleteRes.deletedCount ?? 0,
    deletedCarImages,
    deletedEvArrivals: evDeleteRes.deletedCount ?? 0,
    deletedEvImages,
  };
}

async function seedData() {
  const resetStats = await resetSeedData();
  const { carListingImages, evNewArrivalsImages } = await getBuckets();

  const seedTag = `seed-${new Date().toISOString().slice(0, 10)}`;
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

  return {
    reset: resetStats,
    inserted: {
      carListings: insertedCarListings,
      carImages: insertedCarImages,
      evArrivals: insertedEvArrivals,
      evImages: insertedEvImages,
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
