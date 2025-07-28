import { connectdb } from "@/lib/db";
import { SellCar } from "@/model";



export async function getAllSellCarDetails() {
    try {
        await connectdb();
      const sellCarDetail = await SellCar.find().populate('user', 'phone city').lean();

             const serialized = JSON.parse(JSON.stringify(sellCarDetail,null,2));
            //  console.log(serialized,"serialized")
        return { success: true, sellCarDetail:serialized };
    } catch (error:any) {
        console.error(`Error getting sellcars:`, error);
        return { success: false, message: `Failed to fetch sellcars`, error: error.message };
    }
}
