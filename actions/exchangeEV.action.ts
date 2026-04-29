import { connectdb} from "@/lib/db";
import ExchangeEV from "@/model/exchangeEV.model";
import SellCar from "@/model/sellCar.model";
import User from "@/model/user.model";
import { ExchangeEVDataDetail } from "@/types";

function asId(value: unknown) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return String(value);
}

function asIso(value: unknown) {
    if (!value) return undefined;
    const d = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(d.getTime())) return undefined;
    return d.toISOString();
}

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
        const serialized = requests.map((r) => {
            const user = (r as unknown as { user?: unknown }).user as
                | { fullName?: string; phone?: string; email?: string; city?: string }
                | undefined;
            const sellCar = (r as unknown as { sellCar?: any }).sellCar as any;

            return {
                _id: asId((r as unknown as { _id?: unknown })._id),
                createdAt: asIso((r as unknown as { createdAt?: unknown }).createdAt),
                newVehicleBrand: (r as unknown as { newVehicleBrand?: string }).newVehicleBrand,
                newVehicleModel: (r as unknown as { newVehicleModel?: string }).newVehicleModel,
                newVehiclePriceRange: (r as unknown as { newVehiclePriceRange?: string }).newVehiclePriceRange,
                downPayment: (r as unknown as { downPayment?: string }).downPayment,
                finance: (r as unknown as { finance?: string }).finance,
                status: (r as unknown as { status?: string }).status,
                rejectionReason: (r as unknown as { rejectionReason?: string }).rejectionReason,
                user: user
                    ? { fullName: user.fullName, phone: user.phone, email: user.email, city: user.city }
                    : undefined,
                sellCar: sellCar
                    ? {
                          _id: asId(sellCar._id),
                          vehicleBrand: sellCar.vehicleBrand,
                          vehicleModel: sellCar.vehicleModel,
                          vehicleType: sellCar.vehicleType,
                          makeYear: sellCar.makeYear,
                          kmDriven: sellCar.kmDriven,
                          vehicleColor: sellCar.vehicleColor,
                          condition: sellCar.condition,
                          transmission: sellCar.transmission,
                          vehicleDocumentFileId: sellCar.vehicleDocumentFileId ? asId(sellCar.vehicleDocumentFileId) : undefined,
                          vehiclePhotoFileId: sellCar.vehiclePhotoFileId ? asId(sellCar.vehiclePhotoFileId) : undefined,
                          status: sellCar.status,
                          rejectionReason: sellCar.rejectionReason,
                      }
                    : undefined,
            };
        });

        return { success: true, requests: serialized };
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
