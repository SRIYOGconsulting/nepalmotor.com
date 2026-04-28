import NewSellCarForm from '@/components/admin/NewSellCarForm';

export default function AdminNewSellCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Old Car</h1>
        <p className="mt-1 text-sm text-gray-400">Creates a SellCar record (source=admin). User is optional.</p>
      </div>
      <NewSellCarForm />
    </div>
  );
}

