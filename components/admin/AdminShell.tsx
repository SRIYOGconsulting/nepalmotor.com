'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Exchange EV Requests', href: '/admin/exchange-ev' },
  { label: 'Old Cars', href: '/admin/sellcars' },
  { label: 'Car Listings', href: '/admin/car-listings' },
  { label: 'EV New Arrivals', href: '/admin/ev-new-arrivals' },
];

export default function AdminShell(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b0b0b] p-5 md:block">
          <div className="text-lg font-black uppercase tracking-wider">Admin</div>
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    active ? 'bg-[#f4c430] text-black' : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="mt-8 w-full cursor-pointer rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 transition hover:border-[#f4c430] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-black/70 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-200 md:hidden">Admin</div>
              <div className="hidden md:block" />
              <button
                onClick={logout}
                disabled={loggingOut}
                className="cursor-pointer rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 transition hover:border-[#f4c430] disabled:cursor-not-allowed disabled:opacity-60 md:hidden"
              >
                {loggingOut ? 'Logging out…' : 'Logout'}
              </button>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-8 md:px-8">{props.children}</main>
        </div>
      </div>
    </div>
  );
}
