import { connectdb } from '@/lib/db';
import ExchangeEV from '@/model/exchangeEV.model';
import SellCar from '@/model/sellCar.model';

export async function getAdminSellCars() {
  try {
    await connectdb();
    const cars = await SellCar.find({}).sort({ createdAt: -1 }).populate('user').lean();
    const carIds = cars.map((c) => c._id);

    const exchangeRefs = await ExchangeEV.find({ sellCar: { $in: carIds } }).select('sellCar').lean();
    const exchangeSellCarIds = new Set(exchangeRefs.map((r) => String(r.sellCar)));

    const enriched = cars.map((c) => {
      const source = (c as unknown as { source?: string }).source;
      const id = String((c as unknown as { _id: unknown })._id);
      const flow =
        source === 'admin' ? 'inventory' : exchangeSellCarIds.has(id) ? 'exchange' : 'sell-only';
      return { ...c, flow };
    });

    const serialized = JSON.parse(JSON.stringify(enriched));
    return { success: true, cars: serialized };
  } catch {
    return { success: false, message: 'Failed to load old cars' };
  }
}

export async function getAdminSellCarById(id: string) {
  try {
    await connectdb();
    const car = await SellCar.findById(id).populate('user').lean();
    if (!car) return { success: false, message: 'Not found' };
    const serialized = JSON.parse(JSON.stringify(car));
    return { success: true, car: serialized };
  } catch {
    return { success: false, message: 'Failed to load old car' };
  }
}
