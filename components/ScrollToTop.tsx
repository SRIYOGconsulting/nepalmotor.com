
'use client'

import { ChevronUp } from "lucide-react";

type HandleScrollTop=()=>void;

const ScrollToTop = () => {
    
  const handleScrollTop:HandleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}
  return (
     <button  onClick={handleScrollTop}  className='px-3 py-2 border cursor-pointer rounded-full border-white/20 flex items-center justify-center gap-2 hover:border-[#f4c430] transition '><span className='text-xs uppercase tracking-widest text-neutral-300'>Back to top</span><ChevronUp className='cursor-pointer text-[#f4c430]' size={20}/> </button>
  )
}

export default ScrollToTop
