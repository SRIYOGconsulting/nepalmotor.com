import { getEvNewArrivalById } from '@/actions/evNewArrivals.action';
import EditEvArrivalForm from '@/components/admin/EditEvArrivalForm';

type Item = {
  _id: string;
  label?: string;
  priceText?: string;
  href?: string;
  sortOrder?: number;
  imageFileId?: string;
};

export default async function AdminEditEvArrivalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getEvNewArrivalById(id);
  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Edit EV New Arrival</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load item'}</p>
      </div>
    );
  }

  const item = (result as unknown as { item: Item }).item;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit EV New Arrival</h1>
        <p className="mt-1 text-sm text-gray-400">Update the item shown in the homepage “New Arrivals” section.</p>
      </div>
      <EditEvArrivalForm item={item} />
    </div>
  );
}
