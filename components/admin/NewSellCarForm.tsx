'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewSellCarForm() {
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
      const res = await fetch('/api/admin/sellcars', {
        method: 'POST',
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to create old car');
        return;
      }
      router.push('/admin/sellcars');
      router.refresh();
    } catch {
      setError('Failed to create old car');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-[#111] p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Model *</label>
          <input
            name="vehicleModel"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Brand</label>
          <input name="vehicleBrand" className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Type *</label>
          <input
            name="vehicleType"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Make Year *</label>
          <input
            name="makeYear"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Color *</label>
          <input
            name="vehicleColor"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">KM Driven *</label>
          <input
            name="kmDriven"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Fuel Type *</label>
          <input
            name="fuelType"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Transmission *</label>
          <input
            name="transmission"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Condition *</label>
          <input
            name="condition"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Accidents *</label>
          <input
            name="accidents"
            required
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Expected Valuation</label>
          <input
            name="expectedValuation"
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Status</label>
          <select
            name="status"
            defaultValue="approved"
            className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
          >
            <option value="approved">approved</option>
            <option value="pending">pending</option>
            <option value="rejected">rejected</option>
            <option value="sold">sold</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Features *</label>
        <textarea
          name="features"
          required
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Accident Info</label>
        <textarea
          name="accidentInfo"
          rows={2}
          className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Additional Info</label>
        <textarea
          name="additionalInfo"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Photos</label>
          <input
            name="vehiclePhotos"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Vehicle Document</label>
          <input
            name="vehicleDocument"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />
        </div>
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
