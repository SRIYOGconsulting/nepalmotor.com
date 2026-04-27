import React from "react";
import Link from "next/link";
import { connectdb } from "@/lib/db";
import { SellCar } from "@/model";

// interface SellCarDetail {
//   title: string;
//   type: string;
//   color: string;
//   km: number;
//   fuel: string;
//   transmission: string;
//   city: string;
//   price: string;
//   icon: string;
// }

// const cars: SellCarDetail[] = [
//   {
//     title: "2019 Toyota Corolla",
//     type: "Sedan",
//     color: "White",
//     km: 45000,
//     fuel: "Petrol",
//     transmission: "Automatic",
//     city: "Kathmandu",
//     price: "NPR 35,00,000",
//     icon: "/carTypeImage/hyundai-i22.png",
//   },
//   {
//     title: "2020 Honda CR-V",
//     type: "SUV",
//     color: "Silver",
//     km: 32000,
//     fuel: "Petrol",
//     transmission: "Automatic",
//     city: "Pokhara",
//     price: "NPR 55,00,000",
//     icon: "/carTypeImage/tata-nexon-ev.png",
//   },
//   {
//     title: "2021 Hyundai Elantra",
//     type: "Sedan",
//     color: "Black",
//     km: 28000,
//     fuel: "Petrol",
//     transmission: "Manual",
//     city: "Lalitpur",
//     price: "NPR 42,00,000",
//     icon: "/carTypeImage/suzuki-brezza.png",
//   },
//   {
//     title: "2022 Nissan Leaf",
//     type: "Hatch",
//     color: "Blue",
//     km: 15000,
//     fuel: "Electric",
//     transmission: "Automatic",
//     city: "Kathmandu",
//     price: "NPR 48,00,000",
//     icon: "/carTypeImage/hyundai-creta.png",
//   },
// ];

export const dynamic = "force-dynamic"; 

type SellCarListItem = {
  _id: string;
  icon?: string;
  vehicleModel?: string;
  makeYear?: string | number;
  vehicleType?: string;
  vehicleColor?: string;
  kmDriven?: string | number;
  fuelType?: string;
  transmission?: string;
  expectedValuation?: string | number;
  user?: { city?: string };
};

const AvailableCars:React.FC= async () => {

  // const response= await fetch(`/api/sellCarsDetail`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const {sellCarDetail}=await response.json();
  // console.log(sellCarDetail);

    await connectdb();
          const sellCarDetail = await SellCar.find({})
              .sort({ createdAt: -1 })
              .populate('user', 'phone city');

  return (
    <main className="min-h-screen bg-[#080808] text-gray-100">
      <section className="relative overflow-hidden py-20 px-4 sm:px-8 lg:px-16 border-b border-white/10">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: "#008080" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
            style={{ backgroundColor: "#004D40" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-12 flex space-x-2 text-sm font-medium w-full items-center justify-center">
            <Link
              href="/"
              className="transition-colors duration-200 flex items-center hover:opacity-80"
              style={{ color: "#008080" }}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400">Cars-For-Sell</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #004D40 0%, #008080 50%, #00F3FF 100%)",
                }}
              >
                Cars For Sale
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              We&apos;re here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
            <div
              className="w-32 h-1 mx-auto mt-8 rounded-full"
              style={{ backgroundColor: "#00F3FF" }}
            ></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-[#f4c430] border-l-4 border-[#f4c430] pl-4 mb-8">
          Available Cars for Sale
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellCarDetail?.map((car: SellCarListItem) => (
            <div
              key={car._id}
              className="bg-[#111] rounded-xl shadow-md overflow-hidden border border-white/10 hover:-translate-y-1 transition"
            >
              <div className="bg-gradient-to-br from-teal-600 to-cyan-400 text-white flex items-center justify-center text-5xl">
                <img src={car?.icon || '/carTabsImage/Sedan/honda_city.png'} alt={car?.vehicleModel} className="w-full h-auto" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {car?.vehicleModel} ({car?.makeYear})
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-3">
                  <span>
                    <strong>Type:</strong> {car?.vehicleType}
                  </span>
                  <span>
                    <strong>Color:</strong> {car?.vehicleColor}
                  </span>
                  <span>
                    <strong>KM:</strong> {car?.kmDriven} km
                  </span>
                  <span>
                    <strong>Fuel:</strong> {car?.fuelType}
                  </span>
                  <span>
                    <strong>Transmission:</strong> {car?.transmission}
                  </span>
                  <span>
                    <strong>City:</strong> {car?.user?.city}
                  </span>
                </div>
                <div className="text-[#f4c430] text-lg font-semibold mb-4">
                  {car?.expectedValuation}
                </div>
                <Link
                  href={`/cardescription`}
                  className="block w-full bg-[#f4c430] hover:bg-[#ffdf70] text-black font-semibold py-2 rounded-full transition text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};


export default AvailableCars;
