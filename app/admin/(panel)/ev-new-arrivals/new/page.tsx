'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminNewEvArrivalPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/admin/ev-new-arrivals', { method: 'POST', body: formData });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to create item');
        return;
      }
      router.push('/admin/ev-new-arrivals');
      router.refresh();
    } catch {
      setError('Failed to create item');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add EV New Arrival</h1>
        <p className="mt-1 text-sm text-gray-400">Create an item for the homepage “New Arrivals” section.</p>
      </div>

      <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-[#111] p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Label *</label>
            <input name="label" required className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Price *</label>
            <input name="priceText" required className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Link (optional)</label>
            <input name="href" className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]" placeholder="/compare/suvs" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Sort Order</label>
            <input name="sortOrder" type="number" defaultValue={0} className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Image *</label>
          <input
            name="image"
            type="file"
            required
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />
          <div className="text-xs text-gray-400">JPG/PNG/WEBP, up to 5MB.</div>
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

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
            className="cursor-pointer rounded-lg border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-gray-200 hover:border-[#f4c430]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

