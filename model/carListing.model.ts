import mongoose, { models } from 'mongoose';

const carListingSchema = new mongoose.Schema(
  {
    source: { type: String, required: false, default: 'unknown' },
    carType: { type: String, required: false },
    variant: { type: String, required: false },
    title: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: false },
    transmission: { type: String, required: false },
    fuelType: { type: String, required: false },
    location: { type: String, required: false },
    status: { type: String, required: true, default: 'available' },
    description: { type: String, required: false },
    images: [
      {
        fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
        filename: { type: String, required: false },
        contentType: { type: String, required: false },
        size: { type: Number, required: false },
      },
    ],
  },
  { timestamps: true }
);

const CarListing = models?.CarListing || mongoose.model('CarListing', carListingSchema);

export default CarListing;
