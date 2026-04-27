import React, { useEffect, useMemo, useState } from 'react'
import TypeCarCarousel from './TypeCarCarousel';

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

const TypeFilter = () => {
    const [carTypes, setCarTypes] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>('');
    const [cars, setCars] = useState<CarListingCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const tabs = useMemo(() => carTypes, [carTypes]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
      const controller = new AbortController();
      (async () => {
        try {
          const res = await fetch('/api/public/car-filters', { signal: controller.signal });
          const json = (await res.json()) as { success?: boolean; carTypes?: string[] };
          if (!json?.success) return;
          const next = Array.isArray(json.carTypes) ? json.carTypes : [];
          setCarTypes(next);
          if (!activeTab && next.length) setActiveTab(next[0]);
        } catch {}
      })();
      return () => controller.abort();
    }, [activeTab]);

    useEffect(() => {
      if (!activeTab) return;
      const controller = new AbortController();
      (async () => {
        setIsLoading(true);
        try {
          const url = `/api/public/car-listings?carType=${encodeURIComponent(activeTab)}&limit=12`;
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
    }, [activeTab]);
  return (
      <div className="w-full py-5  ">
        <div className=" w-full gap-6 hidden md:flex items-center justify-between border-b border-white/10">
            {/* tab buttons */}
            {tabs.map((tab)=>(
                <button key={tab} className={`pb-2 cursor-pointer text-sm uppercase tracking-widest ${tab==activeTab?"border-b-2 border-[#f4c430] text-[#f4c430] font-semibold":"text-gray-500 hover:text-white"}`} onClick={() => handleTabClick(tab)}>
                    {tab.split('_').map((word)=>` ${word}`)}
                </button>
            ))}
        </div>
        <div className=" w-full flex  md:hidden items-center justify-center">
            {/* tab buttons */}
              <select
  id="tab-select"
  value={activeTab}
  onChange={(e) => handleTabClick(e.target.value)}
  className="border border-white/20 p-2 rounded-md text-sm text-neutral-200 bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
>
  {tabs.map((tab) => (
    <option key={tab} value={tab}>
      {tab
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}
    </option>
  ))}
</select>
        </div>
        {/* corousal part now */}
        <div className="mt-4 p-4 ">
                {isLoading ? (
                  <div className="rounded-xl border border-white/10 bg-[#0B0B0B] p-6 text-center text-neutral-300">
                    Loading cars
                  </div>
                ) : (
                  <TypeCarCarousel cars={cars}/>
                )}
            </div>
        </div>
  )
}

export default TypeFilter
