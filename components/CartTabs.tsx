'use client'
import { useState } from "react";
import CarGrid from "./CarGrid";
import CarCarousel from "./CarCarousel";
import { CarData, CarTabs } from "@/types";
import { ChevronRight } from "lucide-react";

const CartTabs:React.FC = () => {
    const tabs:CarTabs[]=[CarTabs.suv, CarTabs.hatchback, CarTabs.sedan, CarTabs.muv, CarTabs.luxury]

    // Sample car data
  const carData: CarData = {
    SUV: [
      {
        name: "Mahindra Thar RDX",
        price: "₹12.99 - 20.09 Lakh*",
        image: "carTabsImage/suv/mahindra_thar_RDX.png",
      },
      {
        name: "Mahindra Scorpio N",
        price: "₹13.99 - 24.09 Lakh*",
        image: "carTabsImage/suv/mahindra_scorpio_N.png",
      },
      {
        name: "Mahindra XUV700",
        price: "₹14.09 - 25.74 Lakh*",
        image: "carTabsImage/suv/mahindra_xuv700.png",
      },
      {
        name: "Hyundai Creta",
        price: "₹11.11 - 20.50 Lakh*",
        image: "carTabsImage/suv/hyundai_creta.png",
      },
      {
        name: "Mahindra Thar RDX",
        price: "₹12.99 - 20.09 Lakh*",
        image: "carTabsImage/suv/mahindra_thar_RDX.png",
      },
      {
        name: "Mahindra Scorpio N",
        price: "₹13.99 - 24.09 Lakh*",
        image: "carTabsImage/suv/mahindra_scorpio_N.png",
      },
      {
        name: "Mahindra XUV700",
        price: "₹14.09 - 25.74 Lakh*",
        image: "carTabsImage/suv/mahindra_xuv700.png",
      },
      {
        name: "Hyundai Creta",
        price: "₹11.11 - 20.50 Lakh*",
        image: "carTabsImage/suv/hyundai_creta.png",
      },
    ],
    Hatchback: [
      {
        name: "Maruti Suzuki Swift",
        price: "₹6.24 - 9.14 Lakh*",
        image: "carTabsImage/hatchback/maruti_suzuki_swift.png",
      },
      {
        name: "Hyundai i20",
        price: "₹7.04 - 11.21 Lakh*",
        image: "carTabsImage/hatchback/hyundai_i20.png",
      },
      {
        name: "Tata Altroz",
        price: "₹6.64 - 10.79 Lakh*",
        image: "carTabsImage/hatchback/tata_altroz.png",
      },
      {
        name: "Maruti Suzuki Baleno",
        price: "₹6.66 - 9.83 Lakh*",
        image: "carTabsImage/hatchback/maruti_suzuki_baleno.png",
      },
      {
        name: "Maruti Suzuki Swift",
        price: "₹6.24 - 9.14 Lakh*",
        image: "carTabsImage/hatchback/maruti_suzuki_swift.png",
      },
      {
        name: "Hyundai i20",
        price: "₹7.04 - 11.21 Lakh*",
        image: "carTabsImage/hatchback/hyundai_i20.png",
      },
      {
        name: "Tata Altroz",
        price: "₹6.64 - 10.79 Lakh*",
        image: "carTabsImage/hatchback/tata_altroz.png",
      },
      {
        name: "Maruti Suzuki Baleno",
        price: "₹6.66 - 9.83 Lakh*",
        image: "carTabsImage/hatchback/maruti_suzuki_baleno.png",
      },
    ],
    Sedan: [
      {
        name: "Honda City",
        price: "₹11.82 - 16.30 Lakh*",
        image: "carTabsImage/Sedan/honda_city.png",
      },
      {
        name: "Hyundai Verna",
        price: "₹11.00 - 17.42 Lakh*",
        image: "carTabsImage/Sedan/hyundai_verna.png",
      },
      {
        name: "Skoda Slavia",
        price: "₹11.63 - 19.12 Lakh*",
        image: "carTabsImage/Sedan/skoda_slavia.png",
      },
      {
        name: "Volkswagen Virtus",
        price: "₹11.56 - 19.15 Lakh*",
        image: "carTabsImage/Sedan/volkswagen_virtus.png",
      },
    ],
    MUV: [
      {
        name: "Maruti Ertiga",
        price: "₹8.69 - 13.03 Lakh*",
        image: "carTabsImage/MUV/maruti_ertiga.png",
      },
      {
        name: "Toyota Innova Crysta",
        price: "₹19.99 - 26.05 Lakh*",
        image: "carTabsImage/MUV/toyota_innova_crysta.png",
      },
      {
        name: "Renault Triber",
        price: "₹6.33 - 8.97 Lakh*",
        image: "carTabsImage/MUV/renault_triber.png",
      },
      {
        name: "Kia Carens",
        price: "₹10.52 - 19.67 Lakh*",
        image: "carTabsImage/MUV/kia_carens.png",
      },
    ],
    Luxury: [
      {
        name: "Mercedes-Benz S-Class",
        price: "₹1.71 - 2.17 Crore*",
        image: "carTabsImage/Luxury/mercedes_benz_s_class.png",
      },
      {
        name: "BMW 7 Series",
        price: "₹1.82 - 1.84 Crore*",
        image: "carTabsImage/Luxury/bmw_7_series.png",
      },
      {
        name: "Audi A8 L",
        price: "₹1.34 - 1.63 Crore*",
        image: "carTabsImage/Luxury/audi_a8_l.png",
      },
      {
        name: "Lexus LS",
        price: "₹1.96 - 2.27 Crore*",
        image: "carTabsImage/Luxury/lexus_ls.png",
      },
    ],

  };

const [activeTab,setActiveTab]=useState<CarTabs>(CarTabs.suv)
const [viewAll,setViewAll]=useState<boolean>(false);

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
           { viewAll ? (<CarGrid cars={carData[activeTab]} />):(<CarCarousel cars={carData[activeTab]}/>)}
        </div>
        {!viewAll && <p onClick={()=>setViewAll(true)} className="text-left cursor-pointer text-neutral-300 py-5 uppercase tracking-wider hover:text-[#f4c430] transition">view all cars <ChevronRight className="inline" size={24} /></p>
}
    </div>
    
  )
}

export default CartTabs
