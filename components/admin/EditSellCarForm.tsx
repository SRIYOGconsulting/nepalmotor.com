'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Car = {
  _id: string;
  vehicleModel?: string;
  vehicleBrand?: string;
  vehicleType?: string;
  makeYear?: string;
  vehicleColor?: string;
  kmDriven?: string;
  expectedValuation?: string;
  features?: string;
  fuelType?: string;
  condition?: string;
  accidents?: string;
  accidentInfo?: string;
  transmission?: string;
  additionalInfo?: string;
  status?: string;
  rejectionReason?: string;
  vehiclePhotoFileId?: string;
  vehiclePhotoFileName?: string;
  vehiclePhotoContentType?: string;
  vehicleDocumentFileId?: string;
  vehicleDocumentFileName?: string;
  vehicleDocumentContentType?: string;
  vehiclePhotos?: Array<{ fileId?: string; filename?: string; contentType?: string; size?: number }>;
};

export default function EditSellCarForm(props: { car: Car }) {
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
      const res = await fetch(`/api/admin/sellcars/${props.car._id}`, {
        method: 'PATCH',
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to update old car');
        return;
      }
      router.push('/admin/sellcars');
      router.refresh();
    } catch {
      setError('Failed to update old car');
    } finally {
      setSubmitting(false);
    }
  }

  const photoItemsFromArray = Array.isArray(props.car.vehiclePhotos)
    ? props.car.vehiclePhotos
        .map((p) => (p?.fileId ? { ...p, fileId: String(p.fileId) } : null))
        .filter(Boolean)
    : [];
  const photoItems =
    photoItemsFromArray.length > 0
      ? (photoItemsFromArray as Array<{ fileId: string; filename?: string; contentType?: string; size?: number }>)
      : props.car.vehiclePhotoFileId
        ? [
            {
              fileId: String(props.car.vehiclePhotoFileId),
              filename: props.car.vehiclePhotoFileName,
              contentType: props.car.vehiclePhotoContentType,
            },
          ]
        : [];

  const docId = props.car.vehicleDocumentFileId ? String(props.car.vehicleDocumentFileId) : '';
  const docUrl = docId ? `/api/sellcar-files/${docId}` : '';
  const docContentType = props.car.vehicleDocumentContentType ? String(props.car.vehicleDocumentContentType) : '';
  const docIsImage = docContentType.startsWith('image/');

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-sm font-semibold text-gray-900">Uploads</div>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Photos</div>
            {photoItems.length ? (
              <div className="grid grid-cols-3 gap-2">
                {photoItems.slice(0, 6).map((p) => (
                  <a
                    key={p.fileId}
                    href={`/api/sellcar-files/${p.fileId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block overflow-hidden rounded-lg border border-gray-200 bg-white"
                    title={p.filename || 'Photo'}
                  >
                    <img src={`/api/sellcar-files/${p.fileId}`} alt={p.filename || 'Photo'} className="h-20 w-full object-cover" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500">No photos</div>
            )}
            {photoItems.length > 6 && <div className="text-xs text-gray-500">Showing 6 of {photoItems.length}</div>}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Document</div>
            {docUrl ? (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a className="text-[#f4c430] hover:underline" href={docUrl} target="_blank" rel="noreferrer">
                    Open
                  </a>
                  <a className="text-[#f4c430] hover:underline" href={docUrl} download>
                    Download
                  </a>
                  <span className="text-xs text-gray-500">{props.car.vehicleDocumentFileName || ''}</span>
                </div>
                {docIsImage && (
                  <a href={docUrl} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <img src={docUrl} alt={props.car.vehicleDocumentFileName || 'Document'} className="h-44 w-full object-cover" />
                  </a>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-500">No document</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vehicle Model *</label>
          <input
            name="vehicleModel"
            required
            defaultValue={props.car.vehicleModel || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vehicle Brand</label>
          <input
            name="vehicleBrand"
            defaultValue={props.car.vehicleBrand || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vehicle Type *</label>
          <input
            name="vehicleType"
            required
            defaultValue={props.car.vehicleType || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Make Year *</label>
          <input
            name="makeYear"
            required
            defaultValue={props.car.makeYear || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vehicle Color *</label>
          <input
            name="vehicleColor"
            required
            defaultValue={props.car.vehicleColor || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">KM Driven *</label>
          <input
            name="kmDriven"
            required
            defaultValue={props.car.kmDriven || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fuel Type *</label>
          <input
            name="fuelType"
            required
            defaultValue={props.car.fuelType || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Transmission *</label>
          <input
            name="transmission"
            required
            defaultValue={props.car.transmission || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Condition *</label>
          <input
            name="condition"
            required
            defaultValue={props.car.condition || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Accidents *</label>
          <input
            name="accidents"
            required
            defaultValue={props.car.accidents || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Expected Valuation</label>
          <input
            name="expectedValuation"
            defaultValue={props.car.expectedValuation || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            defaultValue={props.car.status || 'approved'}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
          >
            <option value="approved">approved</option>
            <option value="pending">pending</option>
            <option value="rejected">rejected</option>
            <option value="sold">sold</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Features *</label>
        <textarea
          name="features"
          required
          rows={3}
          defaultValue={props.car.features || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Rejection Reason</label>
        <input
          name="rejectionReason"
          defaultValue={props.car.rejectionReason || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Accident Info</label>
        <textarea
          name="accidentInfo"
          rows={2}
          defaultValue={props.car.accidentInfo || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Additional Info</label>
        <textarea
          name="additionalInfo"
          rows={3}
          defaultValue={props.car.additionalInfo || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-[#f4c430]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Replace Photos</label>
          <input
            name="vehiclePhotos"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#f4c430] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Replace Document</label>
          <input
            name="vehicleDocument"
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
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
