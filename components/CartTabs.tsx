'use client'
import { useEffect, useMemo, useState } from "react";
import { CarTabs } from "@/types";
import { ChevronRight } from "lucide-react";
import TypeCarCarousel from "./TypeCarCarousel";
import SingleCarCard from "./SingleCarCard";

const CartTabs:React.FC = () => {
    const tabs:CarTabs[]=[CarTabs.suv, CarTabs.hatchback, CarTabs.sedan, CarTabs.muv, CarTabs.luxury]

type CarListingCard = {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  transmission: string | null;
  variant: string | null;
  carType: string | null;
  primaryImageUrl: string | null;
};

const [activeTab,setActiveTab]=useState<CarTabs>(CarTabs.suv)
const [viewAll,setViewAll]=useState<boolean>(false);
const [cars, setCars] = useState<CarListingCard[]>([]);
const [isLoading, setIsLoading] = useState(false);

const limit = useMemo(() => (viewAll ? 20 : 8), [viewAll]);

useEffect(() => {
  const controller = new AbortController();
  (async () => {
    setIsLoading(true);
    try {
      const url = `/api/public/car-listings?carType=${encodeURIComponent(String(activeTab))}&limit=${limit}`;
      const res = await fetch(url, { signal: controller.signal });
      const json = (await res.json()) as { success?: boolean; listings?: CarListingCard[] };
      if (!json?.success) {
        setCars([]);
        return;
      }
      setCars(Array.isArray(json.listings) ? json.listings : []);
    } catch {
      setCars([]);
    } finally {
      setIsLoading(false);
    }
  })();
  return () => controller.abort();
}, [activeTab, limit]);

const handleTabClick=(tab:CarTabs)=>{
    setActiveTab(tab)
    setViewAll(false);

}
// text-[#535353]
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 md:px-6 lg:px-8 py-8 ">
      <h4 className="text-3xl text-center md:text-4xl mb-5 font-black py-5 uppercase">Best Seller Cars</h4>
        <div className="flex w-full justify-center md:justify-around gap-6 border-b border-white/10">
            {/* tab buttons */}
            {tabs.map((tab)=>(
                <button key={tab} className={`pb-3 cursor-pointer text-sm uppercase tracking-widest ${tab==activeTab?"border-b-2 border-[#f4c430] text-[#f4c430] font-semibold":"text-gray-500 hover:text-white"}`} onClick={() => handleTabClick(tab)}>
                    {tab}
                </button>
            ))}
        </div>
        {/* carshow section */} 
        <div className=" p-4 ">
           {isLoading ? (
            <div className="rounded-xl border border-white/10 bg-[#0B0B0B] p-6 text-center text-neutral-300">
              Loading cars
            </div>
           ) : viewAll ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cars.map((car) => (
                <SingleCarCard key={car._id} car={car} />
              ))}
            </div>
           ) : (
            <TypeCarCarousel cars={cars} />
           )}
        </div>
        {!viewAll && <p onClick={()=>setViewAll(true)} className="text-left cursor-pointer text-neutral-300 py-5 uppercase tracking-wider hover:text-[#f4c430] transition">view all cars <ChevronRight className="inline" size={24} /></p>
}
    </div>
    
  )
}

export default CartTabs
