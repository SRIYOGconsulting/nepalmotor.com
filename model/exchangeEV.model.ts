import mongoose, { models, Mongoose, Schema } from 'mongoose';

const ExchangeFormSchema = new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   sellCar:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"SellCar",
      required:true,
   },
   newVehicleBrand:{
        type: String,
        required: true,
   },
    newVehicleModel: {
            type: String,
            required: true,
     },
     newVehiclePriceRange:{
        type: String,
        required: true,
     },
     downPayment:{
        type: String,
        required: true,
     },
     finance:{
        type: String,
        required: true,
     },
     additionalInfo:{
        type: String,
        required: false,
     },
     status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true,
     },
     rejectionReason: {
        type: String,
        required: false,
     }
}, { timestamps: true });

const ExchangeEV = models?.ExchangeEV || mongoose.model('ExchangeEV', ExchangeFormSchema);

export default ExchangeEV;

