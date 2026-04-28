'use client'

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import { usePathname } from 'next/navigation'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); 
  const hide = pathname.startsWith('/admin');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (hide) return null;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-black/85 backdrop-blur-xl'
          : 'border-transparent bg-black/55 backdrop-blur-md'
      }`}
    >
      <div className="lux-shell flex w-full items-center justify-between py-4">
        {/* Hamburger Menu (Mobile) */}
        <button
          className="mr-2 flex items-center rounded-md border border-white/15 p-2 text-white transition hover:border-[#f4c430] md:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        {/* Logo Section */}
        <Link href="/" className="group flex items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary ring-1 ring-white/10 shadow-sm shadow-black/30">
            <Image
              src={'/MainLogo.png'}
              alt="Nepal Motor Logo"
              width={30}
              height={30}
              className="h-7 w-7 object-contain"
              priority
            />
          </span>
          <span className="ml-2 text-lg font-black uppercase tracking-wider text-white transition group-hover:text-[#f4c430] sm:ml-3 sm:text-xl md:text-2xl">
            Nepal Motor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-7 md:flex">
          <nav className="flex items-center space-x-5">
            <Link
              href="/"
              className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                pathname === '/' ? 'text-[#f4c430]' : 'text-white hover:text-[#f4c430]'
              }`}
            >
              Home
            </Link>
              <Link
              href="/sell-old-cars"
              className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                pathname === '/sell-old-cars' ? 'text-[#f4c430]' : 'text-white hover:text-[#f4c430]'
              }`}
            >
              Sell Old Cars
            </Link>
            <Link
              href="/sellcars"
              className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                pathname.startsWith('/sellcars') ? 'text-[#f4c430]' : 'text-white hover:text-[#f4c430]'
              }`}
            >
              Buy Old Cars
            </Link>
          
            {/* <Link
              href="/rent"
              className={`text-sm md:text-base font-semibold transition-colors ${
                pathname === '/rent' ? 'text-[#008080]' : 'text-white hover:text-[#008080]'
              }`}
            >
              Rent
            </Link> */}
            <Link
              href="/about"
              className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                pathname === '/about' ? 'text-[#f4c430]' : 'text-white hover:text-[#f4c430]'
              }`}
            >
              About Us
            </Link>
          </nav>
          <Link
            href="/exchange"
            className="lux-button whitespace-nowrap px-4 py-2 text-sm font-bold uppercase tracking-wider"
          >
            Exchange to EV
          </Link>
        </div>
        {/* this is only for test purpose */}

        {/* Mobile Menu */}
        <SideMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
