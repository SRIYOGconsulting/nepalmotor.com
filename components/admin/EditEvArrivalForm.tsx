'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Item = {
  _id: string;
  label?: string;
  priceText?: string;
  href?: string;
  sortOrder?: number;
  imageFileId?: string;
};

export default function EditEvArrivalForm(props: { item: Item }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch(`/api/admin/ev-new-arrivals/${props.item._id}`, { method: 'PATCH', body: formData });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to update item');
        return;
      }
      router.push('/admin/ev-new-arrivals');
      router.refresh();
    } catch {
      setError('Failed to update item');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Label *</label>
          <input
            name="label"
            required
            defaultValue={props.item.label || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price *</label>
          <input
            name="priceText"
            required
            defaultValue={props.item.priceText || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Link (optional)</label>
          <input
            name="href"
            defaultValue={props.item.href || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={props.item.sortOrder ?? 0}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Replace Image (optional)</label>
        <div className="flex items-center gap-4">
          <div className="h-16 w-28 overflow-hidden rounded-lg border border-gray-200 bg-white">
            {props.item.imageFileId ? (
              <img src={`/api/ev-arrival-files/${props.item.imageFileId}`} alt={props.item.label || 'EV'} className="h-full w-full object-cover" />
            ) : null}
          </div>
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer rounded-lg bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#f4c430]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

