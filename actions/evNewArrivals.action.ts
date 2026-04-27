import { connectdb } from '@/lib/db';
import EvNewArrival from '@/model/evNewArrival.model';
import mongoose from 'mongoose';

export async function getAdminEvNewArrivals() {
  try {
    await connectdb();
    const items = await EvNewArrival.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(items));
    return { success: true, items: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch EV new arrivals', error: error?.message };
  }
}

export async function getPublicEvNewArrivals(limit = 8) {
  try {
    await connectdb();
    const items = await EvNewArrival.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    const serialized = JSON.parse(JSON.stringify(items));
    return { success: true, items: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch EV new arrivals', error: error?.message };
  }
}

export async function getEvNewArrivalById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, message: 'Invalid id' };
  try {
    await connectdb();
    const item = await EvNewArrival.findById(id).lean();
    if (!item) return { success: false, message: 'Not found' };
    const serialized = JSON.parse(JSON.stringify(item));
    return { success: true, item: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch EV new arrival', error: error?.message };
  }
}
