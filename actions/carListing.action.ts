import { connectdb } from '@/lib/db';
import CarListing from '@/model/carListing.model';
import mongoose from 'mongoose';

export async function getAdminCarListings() {
  try {
    await connectdb();
    const listings = await CarListing.find({}).sort({ createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(listings));
    return { success: true, listings: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch car listings', error: error?.message };
  }
}

export async function getPublicCarListings() {
  try {
    await connectdb();
    const listings = await CarListing.find({ status: 'available' }).sort({ createdAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(listings));
    return { success: true, listings: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch car listings', error: error?.message };
  }
}

export async function getCarListingById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, message: 'Invalid id' };
  try {
    await connectdb();
    const listing = await CarListing.findById(id).lean();
    if (!listing) return { success: false, message: 'Not found' };
    const serialized = JSON.parse(JSON.stringify(listing));
    return { success: true, listing: serialized };
  } catch (error: any) {
    return { success: false, message: 'Failed to fetch car listing', error: error?.message };
  }
}

