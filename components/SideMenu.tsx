    'use client'
    import React, { useEffect, useRef, useState } from 'react';
    import Link  from 'next/link';
    import { ChevronRight, X } from 'lucide-react';
    import { createPortal } from 'react-dom';
    import { usePathname } from 'next/navigation';
    import ThemeToggle from './ThemeToggle';



    type Category={ 
        name:string;
        link:string;
    }

    type Categories=Category[];

    const categories: Categories = [
    {name:'Home',link:'/'},
    {name:'Buy Old Cars',link:'/sellcars'},
    {name:'Sell Old Cars',link:'/sell-old-cars'},
    ];

    interface SideMenuProps{
        menuOpen:boolean;
        setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }


    const SideMenu = ({ menuOpen, setMenuOpen }:SideMenuProps) => {
      const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    portalRef.current = document.getElementById('portal');
    setMounted(true);
  }, []);

  if (!mounted || !portalRef.current) return null;


        return createPortal(
            <div
                className={`fixed inset-0 z-[9999] md:relative md:inset-auto md:z-auto transition-all duration-500 ${
                    menuOpen ? '' : 'pointer-events-none'
                }`}
            >
                {/* Overlay for mobile */}
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-500 ${
                        menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setMenuOpen(false)}
                ></div>

                {/* Menu Panel */}
                <div 
                    className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-surface text-foreground p-5 shadow-xl transform transition-transform duration-500 ease-in-out ${
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    style={{
                        overflowY: 'auto',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE 10+
                    }}
                >
                    {/* Hide scrollbar for Chrome, Safari and Opera */}
                    <style>
                        {`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        `}
                    </style>
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-foreground hover:text-muted transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={30} strokeWidth={2.5} />
                        </button>
                    </div>

                    <nav className='flex flex-col gap-5 '>
                        <ul className="space-y-2.5 hide-scrollbar">
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link href={cat.link} onClick={()=>setMenuOpen(false)}
                                        className={`group flex cursor-pointer items-center justify-between rounded-md border py-3 px-3 transition-all duration-150 ease-in-out hover:border-[#f4c430] hover:bg-foreground/5 ${
                                            pathname === cat.link ? 'border-[#f4c430]/60 bg-foreground/5' : 'border-line'
                                        }`}
                                    >
                                        <span
                                            className={`text-base font-semibold uppercase tracking-wider group-hover:text-[#f4c430] ${
                                                pathname === cat.link ? 'text-[#f4c430]' : 'text-muted'
                                            }`}
                                        >
                                            {cat.name}
                                        </span>
                                    
                                            <ChevronRight
                                                size={22}
                                                className={`opacity-80 group-hover:opacity-100 group-hover:text-[#f4c430] ${
                                                    pathname === cat.link ? 'text-[#f4c430]' : ''
                                                }`}
                                            />
                                    </Link>
                                    
                                </li>
                            ))}
                        </ul>
                        <Link
            href="/exchange"
            className="lux-button whitespace-nowrap rounded-md px-3 py-2 text-center text-sm font-bold uppercase tracking-wide md:text-base"
            onClick={()=> setMenuOpen(false)}
            >
            Exchange to EV
            </Link>
            <div className="flex items-center justify-between rounded-md border border-line bg-surface/40 px-3 py-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted">Theme</span>
              <ThemeToggle />
            </div>
                    </nav>
                </div>
            </div>,
           portalRef.current
        );
    };

    export default SideMenu;
