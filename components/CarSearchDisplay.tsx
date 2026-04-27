import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Heart } from "lucide-react";

type CarSearchFilters = {
  carType?: string;
  make?: string;
  model?: string;
  year?: string;
};

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

const CarSearchDisplay: React.FC<CarSearchFilters> = ({ carType, make, model, year }) => {
  const [cars, setCars] = useState<CarListingCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animDir, setAnimDir] = useState<"next" | "prev" | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [likedKeys, setLikedKeys] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setActiveIndex(0);
    setAnimDir(null);
  }, [carType, make, model, year]);

  useEffect(() => {
    const len = cars.length;
    if (!len) return;
    setActiveIndex((prev) => (prev >= len ? 0 : prev));
  }, [cars.length]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (make) params.set("make", make);
        if (model) params.set("model", model);
        if (year) params.set("year", year);
        if (carType) params.set("carType", carType);
        params.set("limit", "20");

        const res = await fetch(`/api/public/car-listings?${params.toString()}`, {
          signal: controller.signal,
        });
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
  }, [carType, make, model, year]);

  useEffect(() => {
    if (isHovered || animDir) return;
    const id = window.setInterval(() => {
      setAnimDir((prev) => prev ?? "next");
    }, 10000);
    return () => window.clearInterval(id);
  }, [animDir, isHovered]);

  useEffect(() => {
    if (!animDir) return;
    const id = window.setTimeout(() => {
      setActiveIndex((prev) => {
        const len = cars.length;
        if (!len) return prev;
        if (animDir === "next") return (prev + 1) % len;
        return (prev - 1 + len) % len;
      });
      setAnimDir(null);
    }, 440);
    return () => window.clearTimeout(id);
  }, [animDir, cars.length]);

  const toggleLike = (key: string) => {
    setLikedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (isLoading) {
    return (
      <section id="car-search-display" className="w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] px-5 py-10 text-center text-white md:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-neutral-300">
            Loading cars
          </p>
        </div>
      </section>
    );
  }

  if (!isLoading && !cars.length) {
    return (
      <section id="car-search-display" className="w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] px-5 py-10 text-center text-white md:px-8">
          <p className="text-sm font-black uppercase tracking-widest text-neutral-300">
            No cars found
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400">
            Try changing make, model, year, or type.
          </p>
        </div>
      </section>
    );
  }

  const len = cars.length;
  const safeActiveIndex = ((activeIndex % len) + len) % len;
  const activeCar = cars[safeActiveIndex] ?? cars[0];

  return (
    <section id="car-search-display" className="w-full">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] text-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#f4c430]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-baseline gap-3">
              <p className="text-sm font-black uppercase tracking-widest">Results</p>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                {cars.length} car{cars.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {make && make !== "All" && (
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-200">
                  {make}
                </span>
              )}
              {carType && (
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-200">
                  {carType.replace("_", " ")}
                </span>
              )}
              {model && model !== "All" && (
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-200">
                  {model}
                </span>
              )}
              {year && year !== "All years" && (
                <span className="rounded-full border border-[#f4c430]/40 bg-[#f4c430]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#f4c430]">
                  {year}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-1 text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.45em] text-neutral-400">
              {activeCar.make}
            </p>
            <h3 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
              <span className="text-neutral-200">{activeCar.year}</span>{" "}
              <span>{activeCar.model}</span>
            </h3>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              {activeCar.variant}
            </p>
          </div>

          <div className="relative mt-8 h-[380px] md:h-[460px]">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => {
                if (animDir) return;
                setAnimDir("prev");
              }}
              className="absolute left-2 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white/90 shadow-lg shadow-black/40 backdrop-blur-md transition hover:scale-105 hover:border-[#f4c430]/70 hover:text-[#f4c430] hover:shadow-black/60 focus:outline-none focus:ring-2 focus:ring-[#f4c430]/35 active:scale-95 md:left-3 md:h-14 md:w-14"
            >
              <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              aria-label="Next"
              onClick={() => {
                if (animDir) return;
                setAnimDir("next");
              }}
              className="absolute right-2 top-1/2 z-40 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white/90 shadow-lg shadow-black/40 backdrop-blur-md transition hover:scale-105 hover:border-[#f4c430]/70 hover:text-[#f4c430] hover:shadow-black/60 focus:outline-none focus:ring-2 focus:ring-[#f4c430]/35 active:scale-95 md:right-3 md:h-14 md:w-14"
            >
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </button>

            {(() => {
              const prevIndex = (safeActiveIndex - 1 + len) % len;
              const nextIndex = (safeActiveIndex + 1) % len;
              const prev2Index = (safeActiveIndex - 2 + len) % len;
              const next2Index = (safeActiveIndex + 2) % len;

              const sideX = "clamp(220px, 24vw, 420px)";
              const offX = "clamp(420px, 42vw, 720px)";

              const pos = {
                offLeft: { x: `calc(-1 * ${offX})`, scale: 0.72, opacity: 0 },
                left: { x: `calc(-1 * ${sideX})`, scale: 0.62, opacity: 0.42 },
                center: { x: "0px", scale: 1, opacity: 1 },
                right: { x: sideX, scale: 0.62, opacity: 0.42 },
                offRight: { x: offX, scale: 0.72, opacity: 0 },
              } as const;

              type Slot = "prev2" | "prev" | "current" | "next" | "next2";
              type Role = keyof typeof pos;

              const mapping: Record<Slot, { index: number; role: Role; z: number }> =
                animDir === "next"
                  ? {
                      prev2: { index: prev2Index, role: "offLeft", z: 5 },
                      prev: { index: prevIndex, role: "offLeft", z: 10 },
                      current: { index: safeActiveIndex, role: "left", z: 20 },
                      next: { index: nextIndex, role: "center", z: 30 },
                      next2: { index: next2Index, role: "right", z: 20 },
                    }
                  : animDir === "prev"
                    ? {
                        prev2: { index: prev2Index, role: "left", z: 20 },
                        prev: { index: prevIndex, role: "center", z: 30 },
                        current: { index: safeActiveIndex, role: "right", z: 20 },
                        next: { index: nextIndex, role: "offRight", z: 10 },
                        next2: { index: next2Index, role: "offRight", z: 5 },
                      }
                    : {
                        prev2: { index: prev2Index, role: "offLeft", z: 5 },
                        prev: { index: prevIndex, role: "left", z: 20 },
                        current: { index: safeActiveIndex, role: "center", z: 30 },
                        next: { index: nextIndex, role: "right", z: 20 },
                        next2: { index: next2Index, role: "offRight", z: 5 },
                      };

              const centerIndex =
                animDir === "next"
                  ? nextIndex
                  : animDir === "prev"
                    ? prevIndex
                    : safeActiveIndex;

              const renderSlot = (slot: Slot) => {
                const item = mapping[slot];
                const car = cars[item.index];
                if (!car) return null;
                const p = pos[item.role];
                const isCenter = item.index === centerIndex && item.role === "center";
                const key = car._id;

                return (
                  <div
                    key={`${slot}-${item.index}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      zIndex: item.z,
                      opacity: p.opacity,
                      transform: `translate(-50%, -50%) translateX(${p.x}) scale(${p.scale})`,
                      transitionProperty: "transform, opacity",
                      transitionDuration: "440ms",
                      transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                      willChange: "transform, opacity",
                      width: "clamp(320px, 78vw, 900px)",
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                  >
                    <div className="relative h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px]">
                      {isCenter && (
                        <button
                          type="button"
                          aria-label={likedKeys.has(key) ? "Unfavorite" : "Favorite"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLike(key);
                          }}
                          className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 backdrop-blur-sm transition hover:border-[#f4c430] hover:text-[#f4c430] active:scale-95"
                        >
                          <Heart
                            className={`h-5 w-5 transition-transform duration-200 ${
                              likedKeys.has(key) ? "scale-110 text-[#f4c430]" : ""
                            }`}
                            fill={likedKeys.has(key) ? "currentColor" : "none"}
                            strokeWidth={2.5}
                          />
                        </button>
                      )}
                      <Image
                        src={car.primaryImageUrl || "/MainLogo.png"}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        fill
                        quality={100}
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 62vw, 900px"
                        draggable={false}
                        className="object-contain drop-shadow-[0_32px_60px_rgba(0,0,0,0.6)]"
                        priority={item.index === centerIndex}
                      />
                    </div>
                  </div>
                );
              };

              return (
                <>
                  {renderSlot("prev2")}
                  {renderSlot("prev")}
                  {renderSlot("current")}
                  {renderSlot("next")}
                  {renderSlot("next2")}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarSearchDisplay;
