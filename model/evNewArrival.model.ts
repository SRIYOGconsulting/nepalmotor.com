import mongoose, { models } from 'mongoose';

const evNewArrivalSchema = new mongoose.Schema(
  {
    source: { type: String, required: false, default: 'unknown' },
    label: { type: String, required: true },
    priceText: { type: String, required: true },
    href: { type: String, required: false },
    sortOrder: { type: Number, required: false, default: 0 },
    imageFileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    imageFileName: { type: String, required: false },
    imageContentType: { type: String, required: false },
    imageSize: { type: Number, required: false },
  },
  { timestamps: true }
);

const EvNewArrival = models?.EvNewArrival || mongoose.model('EvNewArrival', evNewArrivalSchema);

export default EvNewArrival;
