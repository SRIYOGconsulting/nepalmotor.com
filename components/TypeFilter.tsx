import React, { useState } from 'react'
import TypeCarCarousel from './TypeCarCarousel';
import { CAR_TYPE_DATA, CarTypes, TYPE_FILTER_TABS } from '../model/carTypeData';

const TypeFilter = () => {
    const [activeTab,setActiveTab]=useState<CarTypes>(CarTypes.suv)

    const handleTabClick=(tab:CarTypes)=>{
        setActiveTab(tab)
    }
  return (
      <div className="w-full py-5  ">
        <div className=" w-full gap-6 hidden md:flex items-center justify-between border-b border-white/10">
            {/* tab buttons */}
            {TYPE_FILTER_TABS.map((tab)=>(
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
  onChange={(e) => handleTabClick(e.target.value as CarTypes)}
  className="border border-white/20 p-2 rounded-md text-sm text-neutral-200 bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#f4c430]"
>
  {TYPE_FILTER_TABS.map((tab) => (
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
                <TypeCarCarousel cars={CAR_TYPE_DATA[activeTab]}/>
            </div>
        </div>
  )
}

export default TypeFilter
