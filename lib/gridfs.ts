import mongoose from 'mongoose';
import { connectdb } from '@/lib/db';

const BUCKET_NAME = 'exchangeUploads';

export async function getExchangeUploadsBucket() {
  await connectdb();
  const db = mongoose.connection.db;
  if (!db) throw new Error('MongoDB connection is not ready');
  return new mongoose.mongo.GridFSBucket(db, { bucketName: BUCKET_NAME });
}

export async function uploadToExchangeBucket(params: {
  file: File;
  filename: string;
  contentType: string;
  metadata?: Record<string, unknown>;
}) {
  const bucket = await getExchangeUploadsBucket();
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

export async function findExchangeFileById(id: mongoose.Types.ObjectId) {
  const bucket = await getExchangeUploadsBucket();
  const files = await bucket.find({ _id: id }).toArray();
  return files[0] ?? null;
}

export async function openExchangeDownloadStream(id: mongoose.Types.ObjectId) {
  const bucket = await getExchangeUploadsBucket();
  return bucket.openDownloadStream(id);
}

