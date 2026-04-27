import { getCarListingById } from '@/actions/carListing.action';
import EditCarListingForm from '@/components/admin/EditCarListingForm';

type Listing = {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  location?: string;
  status?: string;
  description?: string;
};

export default async function AdminEditCarListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getCarListingById(id);
  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Edit Car Listing</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load listing'}</p>
      </div>
    );
  }

  const listing = (result as unknown as { listing: Listing }).listing;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Car Listing</h1>
        <p className="mt-1 text-sm text-gray-400">Update listing details and optionally add more images.</p>
      </div>
      <EditCarListingForm listing={listing} />
    </div>
  );
}
