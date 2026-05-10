'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Listing = {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  status?: string;
  images?: Array<{ fileId?: string }>;
};

export default function CarListingsTable(props: { listings: Listing[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const deleteTarget = deleteTargetId ? props.listings.find((l) => l._id === deleteTargetId) : undefined;

  async function deleteListing(id: string) {
    if (!id) return;
    if (deletingId) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/car-listings/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="min-w-[980px] w-full border-collapse">
        <thead className="bg-gray-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Make/Model</th>
            <th className="px-4 py-3">Year</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
          {props.listings.map((l) => (
            <tr key={l._id}>
              <td className="px-4 py-3">
                <div className="font-semibold">{l.title || '-'}</div>
              </td>
              <td className="px-4 py-3">
                {l.make || '-'} {l.model || ''}
              </td>
              <td className="px-4 py-3">{l.year ?? '-'}</td>
              <td className="px-4 py-3">{typeof l.price === 'number' ? `NPR ${l.price.toLocaleString()}` : '-'}</td>
              <td className="px-4 py-3">{l.status || '-'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link className="text-[#f4c430] hover:underline" href={`/admin/car-listings/${l._id}/edit`}>
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTargetId(l._id)}
                    disabled={deletingId === l._id}
                    className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === l._id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {props.listings.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">
                No car listings yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AlertDialog open={deleteTargetId !== null} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this car listing?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.title
                ? `This will permanently remove “${deleteTarget.title}”. This cannot be undone.`
                : 'This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteTargetId !== null && deletingId === deleteTargetId}
              onClick={() => {
                const id = deleteTargetId;
                if (!id) return;
                setDeleteTargetId(null);
                void deleteListing(id);
              }}
            >
              {deleteTargetId && deletingId === deleteTargetId ? 'Deleting…' : 'Delete'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

