'use client'

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ZoomIn, ChevronUp, CarFront, ArrowRightLeft, Phone } from "lucide-react";
import CarSpecificationsLayout from "@/components/CarSpecifcationsDetails/CarSpecificationsLayout";


const images = [
  {
      src: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRveW90YSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Main Product Image",
    },
    {
        src: "https://images.unsplash.com/photo-1605053309672-b9cdb881c7ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRveW90YSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Thumbnail 2",
    },
    {
    src: "https://images.unsplash.com/photo-1657872737697-737a2d123ef2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRveW90YSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Thumbnail 3",
  },
];


const Page:React.FC = () => {
  const [mainIndex, setMainIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleThumbnailClick = (index:number) => {
    setMainIndex(index);
  };

  
  
  return (
    <div className='bg-[#080808] text-white min-h-screen  max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10'>
        {/* product detail section */}
      <div className='w-full'>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4 md:w-1/2 w-full md:sticky top-8">
            <div
              className="relative cursor-pointer w-full group"
              onClick={() => setIsLightboxOpen(true)}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={images[mainIndex].src}
                alt={images[mainIndex].alt}
                className="w-full h-auto aspect-square rounded-lg shadow-md object-cover border border-white/10"
              />
              {/* <span className="absolute top-3 left-3 bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">
                200+ watching
              </span> */}
              {isHovering && (
                <div className="absolute pointer-events-none transition-all duration-75"  style={{
                  top: mousePos.y - 5,
                  left: mousePos.x,
                  transform: "translate(-50%, -50%)",
                }}>
                  <ZoomIn className="text-white mix-blend-difference" size={24} />
                </div>
              )}
            </div>
            
            <div className="flex flex-row gap-2.5 items-center justify-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => handleThumbnailClick(idx)}
                  className={`w-16 h-16 rounded-lg border-2 cursor-pointer object-cover transition-all duration-200 ${
                    mainIndex === idx
                      ? 'border-[#f4c430] scale-105'
                      : 'border-white/20 hover:border-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ---  DETAILS SECTION --- */}
          <div className="md:w-1/2 w-full mt-4 md:mt-0 font-sans">
            <div className=" rounded-xl p-6 ">
              <div className="space-y-6">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                  Toyota Prado TX-L (2023 Model)
                </h1>

                {/* Details List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500 font-medium">Price</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#93A17A]-600">NPR 37,50,000</p>
                      <p className="text-xs text-slate-400">(Inclusive of VAT & Registration)</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Configuration</span>
                    <span className="font-semibold text-slate-800">Diesel - 4WD - Automatic</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">EMI starts at</span>
                    <span className="font-semibold text-slate-800">NPR 1,20,000/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-semibold text-slate-800">In Stock – Kathmandu</span>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <button className="flex-1  cursor-pointer bg-[#f4c430] text-black font-bold py-3 px-5 rounded-lg text-base hover:bg-[#ffdf70] transition-colors">
                      Buy Now
                    </button>
                    <button className="flex-1 cursor-pointer bg-transparent text-[#f4c430] font-bold py-3 px-5 rounded-lg text-base border-2 border-[#f4c430] hover:bg-[#f4c430]/10 transition-colors flex items-center justify-center gap-x-2">
                      Book Test Drive <CarFront className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <button className="flex-1 cursor-pointer bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-lg hover:bg-slate-300 transition-colors flex items-center justify-center gap-x-2">
                      Compare <ArrowRightLeft className="w-5 h-5" />
                    </button>
                    <button className="flex-1 cursor-pointer bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-lg hover:bg-slate-300 transition-colors flex items-center justify-center gap-x-2">
                      Request Callback <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={images}
        index={mainIndex}
        plugins={[Zoom, Thumbnails]}
        thumbnails={{ position: "start", width: 60, height: 60, border: 1, borderRadius: 8, }}
        zoom={{ maxZoomPixelRatio: 4, zoomInMultiplier: 2, doubleTapDelay: 300, }}
      />
   {/* specification section */}
      <CarSpecificationsLayout />
    </div>
  )
}

export default Page;
