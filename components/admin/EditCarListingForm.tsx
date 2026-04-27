'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Listing = {
  _id: string;
  title?: string;
  carType?: string;
  make?: string;
  model?: string;
  variant?: string;
  year?: number;
  price?: number;
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  location?: string;
  status?: string;
  description?: string;
};

export default function EditCarListingForm(props: { listing: Listing }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      const res = await fetch(`/api/admin/car-listings/${props.listing._id}`, {
        method: 'PATCH',
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to update listing');
        return;
      }
      router.push('/admin/car-listings');
      router.refresh();
    } catch {
      setError('Failed to update listing');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-[#111] p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Title *</label>
          <input
            name="title"
            required
            defaultValue={props.listing.title || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Car Type</label>
          <select
            name="carType"
            defaultValue={props.listing.carType || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          >
            <option value="">(none)</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="MUV">MUV</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Status</label>
          <select
            name="status"
            defaultValue={props.listing.status || 'available'}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          >
            <option value="available">available</option>
            <option value="sold">sold</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Variant</label>
          <input
            name="variant"
            defaultValue={props.listing.variant || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Make *</label>
          <input
            name="make"
            required
            defaultValue={props.listing.make || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Model *</label>
          <input
            name="model"
            required
            defaultValue={props.listing.model || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Year *</label>
          <input
            name="year"
            type="number"
            required
            defaultValue={props.listing.year ?? ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Price (NPR) *</label>
          <input
            name="price"
            type="number"
            required
            defaultValue={props.listing.price ?? ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Mileage</label>
          <input
            name="mileage"
            type="number"
            defaultValue={props.listing.mileage ?? ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Transmission</label>
          <input
            name="transmission"
            defaultValue={props.listing.transmission || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Fuel Type</label>
          <input
            name="fuelType"
            defaultValue={props.listing.fuelType || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Location</label>
          <input
            name="location"
            defaultValue={props.listing.location || ''}
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={props.listing.description || ''}
          className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Add Images</label>
        <input
          name="images"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
        />
        <div className="text-xs text-gray-400">Selected images will be appended to the listing.</div>
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
  );
}
