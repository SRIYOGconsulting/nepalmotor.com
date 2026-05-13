'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useCompareStore, type CompareInventoryKind } from '@/store/useCompareStore';

export type CompareListingPayload = {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: number | null;
  price: number | null;
  mileage: number | null;
  transmission: string | null;
  fuelType: string | null;
  location: string | null;
  carType: string | null;
  variant: string | null;
  primaryImageUrl: string | null;
};

export type CompareSellCarPayload = {
  _id: string;
  title: string;
  priceDisplay: string;
  year: string | null;
  make: string;
  model: string;
  mileage: string | null;
  transmission: string | null;
  fuelType: string | null;
  location: string | null;
  carType: string | null;
  variant: string | null;
  primaryImageUrl: string | null;
};

function formatListingPrice(price: number | null): string {
  if (typeof price === 'number' && Number.isFinite(price)) {
    return `NPR ${price.toLocaleString('en-US')}`;
  }
  return 'Price on request';
}

function cellText(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'string' && !v.trim()) return '—';
  return String(v);
}

function BrowseLinks() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/#car-search-display"
        className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#f4c430]/50"
      >
        Showroom cars
      </Link>
      <Link
        href="/buy"
        className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#f4c430]/50"
      >
        Used cars
      </Link>
    </div>
  );
}

function browseMoreHref(kind: CompareInventoryKind | null): string {
  if (kind === 'sell_car') return '/buy';
  return '/#car-search-display';
}

function browseMoreLabel(kind: CompareInventoryKind | null): string {
  if (kind === 'sell_car') return 'Browse more used cars';
  return 'Browse showroom listings';
}

export default function ComparePage() {
  const kind = useCompareStore((s) => s.kind);
  const ids = useCompareStore((s) => s.ids);
  const remove = useCompareStore((s) => s.remove);

  const [listingRows, setListingRows] = useState<CompareListingPayload[]>([]);
  const [sellRows, setSellRows] = useState<CompareSellCarPayload[]>([]);
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [hadStale, setHadStale] = useState(false);

  const idsKey = useMemo(() => `${kind ?? ''}:${ids.join(',')}`, [kind, ids]);

  useEffect(() => {
    if (!ids.length || !kind) {
      setListingRows([]);
      setSellRows([]);
      setLoadState('idle');
      setHadStale(false);
      return;
    }

    const controller = new AbortController();
    (async () => {
      setLoadState('loading');
      setHadStale(false);
      try {
        const q = encodeURIComponent(ids.join(','));
        const url =
          kind === 'car_listing'
            ? `/api/public/car-listings/compare?ids=${q}`
            : `/api/public/sell-cars/compare?ids=${q}`;
        const res = await fetch(url, { signal: controller.signal });
        const json = (await res.json()) as {
          success?: boolean;
          listings?: CompareListingPayload[] | CompareSellCarPayload[];
        };
        if (controller.signal.aborted) return;
        if (!json?.success || !Array.isArray(json.listings)) {
          setLoadState('error');
          return;
        }
        const rows = json.listings as CompareListingPayload[] & CompareSellCarPayload[];
        const returned = new Set(rows.map((r) => r._id));
        const missing = ids.filter((id) => !returned.has(id));
        if (missing.length) {
          setHadStale(true);
          missing.forEach((id) => remove(id));
        }
        if (kind === 'car_listing') {
          setListingRows(rows as CompareListingPayload[]);
          setSellRows([]);
        } else {
          setSellRows(rows as CompareSellCarPayload[]);
          setListingRows([]);
        }
        setLoadState('idle');
      } catch {
        if (!controller.signal.aborted) setLoadState('error');
      }
    })();

    return () => controller.abort();
  }, [idsKey, kind, ids, remove]);

  if (!ids.length || !kind) {
    return (
      <main className="min-h-[50vh] bg-background px-4 py-16 text-foreground">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Compare cars</h1>
          <p className="mt-4 text-muted">
            No cars in your compare list yet. Add up to two showroom listings or two used cars from a
            detail page.
          </p>
          <BrowseLinks />
        </div>
      </main>
    );
  }

  const hasRows =
    kind === 'car_listing' ? listingRows.length > 0 : sellRows.length > 0;
  const rowCount = kind === 'car_listing' ? listingRows.length : sellRows.length;

  if (ids.length === 1) {
    return (
      <main className="min-h-[50vh] bg-background px-4 py-10 text-foreground md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Compare cars</h1>
            <p className="mt-3 text-muted">
              Add one more {kind === 'sell_car' ? 'used car' : 'showroom car'} to see a side-by-side
              comparison.
            </p>
            <BrowseLinks />
          </div>
          {hadStale && (
            <p className="mb-4 text-center text-sm text-amber-600 dark:text-amber-400">
              Some cars are no longer available and were removed from this comparison.
            </p>
          )}
          {loadState === 'loading' && (
            <p className="text-center text-sm text-muted">Loading…</p>
          )}
          {loadState === 'error' && (
            <p className="text-center text-sm text-red-600">Could not load compare data. Try again.</p>
          )}
          {loadState !== 'loading' && rowCount === 1 && kind === 'car_listing' && (
            <CompareListingTable listings={listingRows} onRemove={remove} />
          )}
          {loadState !== 'loading' && rowCount === 1 && kind === 'sell_car' && (
            <CompareSellCarTable listings={sellRows} onRemove={remove} />
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Compare cars</h1>
            <p className="mt-1 text-sm text-muted">
              {kind === 'sell_car' ? 'Used listings (seller marketplace).' : 'Showroom inventory.'}
            </p>
          </div>
          <Link
            href={browseMoreHref(kind)}
            className="text-sm font-semibold text-[#f4c430] hover:underline"
          >
            {browseMoreLabel(kind)}
          </Link>
        </div>
        {hadStale && (
          <p className="mb-4 text-sm text-amber-600 dark:text-amber-400">
            Some cars are no longer available and were removed from this comparison.
          </p>
        )}
        {loadState === 'loading' && <p className="text-sm text-muted">Loading…</p>}
        {loadState === 'error' && (
          <p className="text-sm text-red-600">Could not load compare data. Try again.</p>
        )}
        {loadState !== 'loading' && hasRows && kind === 'car_listing' && (
          <CompareListingTable listings={listingRows} onRemove={remove} />
        )}
        {loadState !== 'loading' && hasRows && kind === 'sell_car' && (
          <CompareSellCarTable listings={sellRows} onRemove={remove} />
        )}
      </div>
    </main>
  );
}

function CompareListingTable({
  listings,
  onRemove,
}: {
  listings: CompareListingPayload[];
  onRemove: (id: string) => void;
}) {
  const rows: { label: string; cells: (car: CompareListingPayload) => ReactNode }[] = [
    {
      label: 'Photo',
      cells: (car) => (
        <div className="relative flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(car._id)}
            className="text-xs font-semibold uppercase tracking-wider text-red-600 hover:underline dark:text-red-400"
          >
            Remove
          </button>
          <Link href={`/cars/${car._id}`} className="relative block h-28 w-full max-w-[200px]">
            <Image
              src={car.primaryImageUrl || '/MainLogo.png'}
              alt={cellText(car.title)}
              fill
              className="object-contain"
            />
          </Link>
        </div>
      ),
    },
    { label: 'Title', cells: (car) => cellText(car.title) },
    { label: 'Price', cells: (car) => formatListingPrice(car.price) },
    { label: 'Year', cells: (car) => cellText(car.year) },
    { label: 'Make', cells: (car) => cellText(car.make) },
    { label: 'Model', cells: (car) => cellText(car.model) },
    {
      label: 'Mileage',
      cells: (car) =>
        typeof car.mileage === 'number' && Number.isFinite(car.mileage)
          ? `${car.mileage.toLocaleString('en-US')} km`
          : '—',
    },
    { label: 'Transmission', cells: (car) => cellText(car.transmission) },
    { label: 'Fuel type', cells: (car) => cellText(car.fuelType) },
    { label: 'Location', cells: (car) => cellText(car.location) },
    { label: 'Car type', cells: (car) => cellText(car.carType) },
    { label: 'Variant', cells: (car) => cellText(car.variant) },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-36 border-b border-line bg-surface-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted" />
            {listings.map((car) => (
              <th
                key={car._id}
                className="border-b border-line px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#f4c430]"
              >
                <Link href={`/cars/${car._id}`} className="hover:underline">
                  View listing
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-b-0">
              <td className="bg-surface-2 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                {row.label}
              </td>
              {listings.map((car) => (
                <td key={`${row.label}-${car._id}`} className="px-3 py-3 text-center font-medium text-foreground">
                  {row.cells(car)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareSellCarTable({
  listings,
  onRemove,
}: {
  listings: CompareSellCarPayload[];
  onRemove: (id: string) => void;
}) {
  const rows: { label: string; cells: (car: CompareSellCarPayload) => ReactNode }[] = [
    {
      label: 'Photo',
      cells: (car) => (
        <div className="relative flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(car._id)}
            className="text-xs font-semibold uppercase tracking-wider text-red-600 hover:underline dark:text-red-400"
          >
            Remove
          </button>
          <Link href={`/buy/${car._id}`} className="relative block h-28 w-full max-w-[200px]">
            <Image
              src={car.primaryImageUrl || '/carTabsImage/Sedan/honda_city.png'}
              alt={cellText(car.title)}
              fill
              className="object-cover"
            />
          </Link>
        </div>
      ),
    },
    { label: 'Title', cells: (car) => cellText(car.title) },
    { label: 'Price', cells: (car) => cellText(car.priceDisplay) },
    { label: 'Year', cells: (car) => cellText(car.year) },
    { label: 'Make', cells: (car) => cellText(car.make) },
    { label: 'Model', cells: (car) => cellText(car.model) },
    {
      label: 'Mileage',
      cells: (car) => (car.mileage ? `${cellText(car.mileage)} km` : '—'),
    },
    { label: 'Transmission', cells: (car) => cellText(car.transmission) },
    { label: 'Fuel type', cells: (car) => cellText(car.fuelType) },
    { label: 'Location', cells: (car) => cellText(car.location) },
    { label: 'Car type', cells: (car) => cellText(car.carType) },
    { label: 'Color', cells: (car) => cellText(car.variant) },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-36 border-b border-line bg-surface-2 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted" />
            {listings.map((car) => (
              <th
                key={car._id}
                className="border-b border-line px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#f4c430]"
              >
                <Link href={`/buy/${car._id}`} className="hover:underline">
                  View listing
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-b-0">
              <td className="bg-surface-2 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
                {row.label}
              </td>
              {listings.map((car) => (
                <td key={`${row.label}-${car._id}`} className="px-3 py-3 text-center font-medium text-foreground">
                  {row.cells(car)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
