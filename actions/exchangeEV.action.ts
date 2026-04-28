import { connectdb} from "@/lib/db";
import ExchangeEV from "@/model/exchangeEV.model";
import SellCar from "@/model/sellCar.model";
import User from "@/model/user.model";
import { ExchangeEVDataDetail } from "@/types";

export async function getAllNewEVVehicleDetails() {
    try {
        await connectdb();
        const evDetails=await ExchangeEV.find({}).sort({ createdAt: -1 });
        return { success: true, evDetails };
    } catch (error) {
        console.error(`Error getting categories:`, error);
        return { success: false, message: `Failed to fetch categories` };
    }
}

export async function getAdminExchangeRequests() {
    try {
        await connectdb();
        const requests = await ExchangeEV.find({})
            .sort({ createdAt: -1 })
            .populate('user')
            .populate('sellCar')
            .lean();
        return { success: true, requests };
    } catch (error) {
        console.error(`Error getting exchange requests:`, error);
        return { success: false, message: `Failed to fetch exchange requests` };
    }
}

export async function registerEvExchangeDetails(data:ExchangeEVDataDetail){
    try{
        await connectdb();
        const {fullName, email, phone,city,vehicleModel, accidents,accidentInfo, additionalInfo, condition,downpayment:downPayment,expectedValuation,features,finance, fuelType,kmDriven, makeYear, newVehicleBrand, newVehicleModel,newVehiclePriceRange,transmission,vehicleColor,vehicleType}=data;
        
        // console.log({fullName, email, phone,city,vehicleModel, accidents,accidentInfo, additionalInfo, condition,downPayment,expectedValuation,features,finance, fuelType,kmDriven, makeYear, newVehicleBrand, newVehicleModel,newVehiclePriceRange,transmission,vehicleColor,vehicleType})
        if(!fullName || !email || !phone || !city){
          return { success: false, message: `All fields are required` };
        }
        
        if(!vehicleModel || !condition || !fuelType || !kmDriven || !makeYear || !vehicleColor || !vehicleType || !expectedValuation || !features || !accidents || !transmission){
          return { success: false, message: `Old Vehicle full details are required` };
        }

        if(!newVehicleBrand || !newVehicleModel || !newVehiclePriceRange || !downPayment || !finance ){
          return { success: false, message: `New vehicle all details are required` };
        }
        const newUser=new User({
            fullName,
            email,
            phone,
            city
        })
        await newUser.save();
        const newSellCar= new SellCar({
            user: newUser._id,
            vehicleModel,
            vehicleType,
            makeYear,
            vehicleColor,
            kmDriven,
            expectedValuation,
            features,
            fuelType,
            condition,
            accidents,
            accidentInfo,
            additionalInfo,
            transmission,
            status: 'pending',
            source: 'user',
            // downpayment,
            // finance,
        })
        await newSellCar.save();

        const newExchangeEV= new ExchangeEV({
            user: newUser._id,
            sellCar: newSellCar._id,
            downPayment,
            finance,
            newVehicleBrand,
            newVehicleModel,
            newVehiclePriceRange,
            status: 'pending',
        })
        await newExchangeEV.save();
        return { success: true, data:newExchangeEV};
    }catch(error:any){
        if (error.name === 'ValidationError') {
  return {
    success: false,
    message: Object.values(error.errors).map((err:any) => err.message).join(', ')
  };
}
        console.error(`Error registering EV exchange details:`, error);
        return { success: false, message: `Failed to register EV exchange details` };
    }
}
