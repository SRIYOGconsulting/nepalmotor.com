'use client';
import React, { useState } from 'react'
import ModelSearchFrom from './ModelSearchForm';
import TypeFilter from './TypeFilter';
import CarSearchDisplay from './CarSearchDisplay';

const SearchSection = () => {
    const [tab,setTab]=useState<"model"| "type">("model");
    const [selectedMake, setSelectedMake] = useState<string>("All");
    const [selectedModel, setSelectedModel] = useState<string>("All");
    const [selectedYear, setSelectedYear] = useState<string>("All years");
  return (
    <div className='w-full max-w-screen-2xl mx-auto px-2  md:px-6 lg:px-8 py-10'>
        <h1 className='text-3xl text-center md:text-4xl font-black mb-4 uppercase'>Find Cars</h1>

        {/* tabs  */}
        <div className='mx-auto mb-6 flex w-fit gap-2 rounded-lg border border-white/10 bg-white/5 p-1'>
            <button onClick={()=>setTab("model")} className={`rounded-md px-4 py-1.5 cursor-pointer text-xs uppercase tracking-widest transition ${tab==="model"?"bg-[#f4c430] text-black":"text-neutral-300 hover:text-white"}`}>By Model</button>
            <button onClick={()=>setTab("type")} className={`rounded-md px-4 py-1.5 cursor-pointer text-xs uppercase tracking-widest transition ${tab==="type"?"bg-[#f4c430] text-black":"text-neutral-300 hover:text-white"}`}>By Type</button>
        </div>
        <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-neutral-400">
        Learn more about the car you're interested in before you buy.
      </p>
        {/* search input */}
        {tab==="model" && (
          <div className="mt-8 space-y-8">
            <ModelSearchFrom
              selectedMake={selectedMake}
              selectedModel={selectedModel}
              selectedYear={selectedYear}
              onMakeChange={setSelectedMake}
              onModelChange={setSelectedModel}
              onYearChange={setSelectedYear}
            />
            <CarSearchDisplay
              make={selectedMake}
              model={selectedModel}
              year={selectedYear}
            />
          </div>
        )}
        {tab==="type" && <TypeFilter />}

    </div>
  )
}

export default SearchSection
