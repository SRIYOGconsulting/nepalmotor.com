'use client';

import { useEffect, useMemo, useState } from 'react';

export default function SellCarGallery(props: { photoFileIds: string[]; alt: string; fallbackSrc?: string }) {
  const ids = useMemo(() => props.photoFileIds.filter(Boolean), [props.photoFileIds]);
  const [active, setActive] = useState(ids[0] || '');
  const fallbackSrc = props.fallbackSrc || '/carTabsImage/Sedan/honda_city.png';

  useEffect(() => {
    setActive(ids[0] || '');
  }, [ids]);

  if (!ids.length) return null;

  const mainSrc = `/api/sellcar-files/${active || ids[0]}`;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
        <img
          src={mainSrc}
          alt={props.alt}
          className="h-full max-h-[520px] w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackSrc;
          }}
        />
      </div>

      {ids.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {ids.map((id) => {
            const src = `/api/sellcar-files/${id}`;
            const selected = id === (active || ids[0]);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`overflow-hidden rounded-xl border ${selected ? 'border-[#f4c430]' : 'border-white/10'} bg-[#111]`}
              >
                <img
                  src={src}
                  alt={props.alt}
                  className="h-20 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = fallbackSrc;
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
