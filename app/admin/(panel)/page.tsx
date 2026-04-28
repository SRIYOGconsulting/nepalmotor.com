import Link from 'next/link';

export default function AdminDashboardPage() {
  const cards = [
    {
      title: 'Exchange EV Requests',
      desc: 'View customer exchange-to-EV requests and downloaded files.',
      href: '/admin/exchange-ev',
    },
    {
      title: 'Old Cars',
      desc: 'Create and manage old cars shown on /sellcars.',
      href: '/admin/sellcars',
    },
    {
      title: 'Car Listings',
      desc: 'Create and manage cars for sale shown on /cars.',
      href: '/admin/car-listings',
    },
    {
      title: 'EV New Arrivals',
      desc: 'Manage the homepage “New Arrivals” section.',
      href: '/admin/ev-new-arrivals',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">Choose a module to manage content.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-2xl border border-white/10 bg-[#111] p-5 transition hover:border-[#f4c430]/60 hover:shadow-xl"
          >
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="mt-2 text-sm text-gray-400">{c.desc}</div>
            <div className="mt-4 text-sm font-semibold text-[#f4c430]">Open</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
