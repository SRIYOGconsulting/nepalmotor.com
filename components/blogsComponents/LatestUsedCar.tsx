import Image from 'next/image';
import React from 'react'


type latestCarsDetail={
    name:string;
    location:string;
    price:string;
    imageUrl:string
}

const latestCars:latestCarsDetail[] = [
  {
    name: '2023 Hyundai Creta S',
    location: 'Kathmandu',
    price: 'Rs. 53,50,000',
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: '2009 Maruti Suzuki Wagon R',
    location: 'Mahalaxmisthan',
    price: 'Rs. 8,65,000',
    imageUrl: 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: '2016 Renault Duster RXZ+',
    location: 'Pokhara',
    price: 'Rs. 20,99,999',
    imageUrl: 'https://images.unsplash.com/photo-1441148345475-03a2e82f9719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGNhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: '2019 Suzuki Celerio VXI',
    location: 'Butwal',
    price: 'Rs. 19,75,000',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop',
  },
];

const LatestUsedCar = () => {
  return (
    <aside className="mt-12 lg:mt-0 lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Latest Used Cars Section */}
              <div>
                <h2 className="text-2xl font-bold text-white">Latest Used Cars</h2>
                <p className="mt-1 text-sm text-gray-400">Here are the featured listings for you.</p>
                <div className="mt-6 space-y-4">
                  {latestCars.map((car) => (
                    <div key={car.name} className="flex bg-[#111] border border-white/10 p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex-shrink-0">
                        <Image 
                          src={car.imageUrl} 
                          alt={`Image of ${car.name}`} 
                          width={96}
                          height={96}
                          className="h-24 w-24 rounded-lg object-cover" 
                        />
                      </div>
                      <div className="ml-4 flex flex-col justify-center">
                        <h3 className="text-base font-semibold text-white">{car.name}</h3>
                        <p className="text-sm text-gray-400">{car.location}</p>
                        <p className="mt-1 text-lg font-bold text-[#f4c430]">{car.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

  )
}

export default LatestUsedCar
