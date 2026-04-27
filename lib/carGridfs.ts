import mongoose from 'mongoose';
import { connectdb } from '@/lib/db';

const BUCKET_NAME = 'carListingImages';

export async function getCarListingImagesBucket() {
  await connectdb();
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection is not ready');
  return new mongoose.mongo.GridFSBucket(db, { bucketName: BUCKET_NAME });
}

export async function uploadToCarListingImagesBucket(params: {
  file: File;
  filename: string;
  contentType: string;
  metadata?: Record<string, unknown>;
}) {
  const bucket = await getCarListingImagesBucket();
  const buffer = Buffer.from(await params.file.arrayBuffer());

  return await new Promise<{ fileId: mongoose.Types.ObjectId }>((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(params.filename, {
      contentType: params.contentType,
      metadata: params.metadata,
    });

    uploadStream.on('error', reject);
    uploadStream.on('finish', () => {
      resolve({ fileId: uploadStream.id as mongoose.Types.ObjectId });
    });

    uploadStream.end(buffer);
  });
}

export async function findCarListingImageById(id: mongoose.Types.ObjectId) {
  const bucket = await getCarListingImagesBucket();
  const files = await bucket.find({ _id: id }).toArray();
  return files[0] ?? null;
}

export async function openCarListingImageDownloadStream(id: mongoose.Types.ObjectId) {
  const bucket = await getCarListingImagesBucket();
  return bucket.openDownloadStream(id);
}

export async function deleteCarListingImageById(id: mongoose.Types.ObjectId) {
  const bucket = await getCarListingImagesBucket();
  await bucket.delete(id);
}

