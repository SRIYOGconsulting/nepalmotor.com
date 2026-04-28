import mongoose, { models } from 'mongoose';

const sellCarSchema = new mongoose.Schema({
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:false,
      },
   vehicleModel:{
        type: String,
        required: true,
   },
  vehicleBrand:{
       type: String,
       required: false,
  },
    vehicleType: {
            type: String,
            required: true,
     },
     makeYear:{
        type: String,
        required: true,
     },
     vehicleColor:{
        type: String,
        required: true,
     },
     kmDriven:{
        type: String,
        required: true,
     },
     expectedValuation:{
        type: String,
        required: false,
     },
     features:{
        type: String,
        required: true,
     },
     fuelType:{
        type:String,
        required:true,
     },
     condition:{
        type: String,
        required: true,
     },
     accidents:{
        type: String,
        required: true,
     },
     accidentInfo:{
        type: String,
        required: false,
     },
     transmission:{
        type: String,
        required: true,
     },
     additionalInfo:{
        type: String,
        required: false,
     },
     vehicleDocumentFileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
     },
     vehicleDocumentFileName: {
        type: String,
        required: false,
     },
     vehicleDocumentContentType: {
        type: String,
        required: false,
     },
     vehicleDocumentSize: {
        type: Number,
        required: false,
     },
     vehiclePhotoFileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
     },
     vehiclePhotoFileName: {
        type: String,
        required: false,
     },
     vehiclePhotoContentType: {
        type: String,
        required: false,
     },
     vehiclePhotoSize: {
        type: Number,
        required: false,
     },
     vehiclePhotos: [
        {
          fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
          filename: { type: String, required: false },
          contentType: { type: String, required: false },
          size: { type: Number, required: false },
        },
     ],
     status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'sold'],
        default: 'pending',
        required: true,
     },
     source: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
     },
     rejectionReason: {
        type: String,
        required: false,
     }
}, { timestamps: true });

const SellCar = models?.SellCar || mongoose.model('SellCar', sellCarSchema);

export default SellCar;
