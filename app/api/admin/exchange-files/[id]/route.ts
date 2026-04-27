import mongoose from 'mongoose';
import { Readable } from 'node:stream';
import { findExchangeFileById, openExchangeDownloadStream } from '@/lib/gridfs';

function sanitizeFilename(name: string) {
  const cleaned = name.replace(/[/\\?%*:|"<>]/g, '-').trim();
  return cleaned || 'file';
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: 'Invalid file id' }, { status: 400 });
  }

  const objectId = new mongoose.Types.ObjectId(id);
  const fileDoc = await findExchangeFileById(objectId);

  if (!fileDoc) {
    return Response.json({ success: false, message: 'File not found' }, { status: 404 });
  }

  const nodeStream = await openExchangeDownloadStream(objectId);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream;
  const filename = sanitizeFilename(String(fileDoc.filename || 'file'));

  return new Response(webStream, {
    headers: {
      'Content-Type': String(fileDoc.contentType || 'application/octet-stream'),
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
