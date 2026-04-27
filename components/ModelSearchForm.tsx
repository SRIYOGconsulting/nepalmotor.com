import React, { useState, useEffect, useMemo, useRef } from 'react';


const ChevronDownIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="h-5 w-5 text-neutral-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative h-full" ref={selectRef}>
      <label className="block text-xs font-semibold uppercase tracking-[0.2em] leading-none text-neutral-400">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative mt-2 w-full cursor-pointer rounded-xl border px-4 py-3 text-left text-base font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-[#f4c430]/25 min-h-[48px] ${
          isOpen
            ? "border-[#f4c430]/60 bg-[#0f0f0f]"
            : "border-white/12 bg-[#0f0f0f] hover:border-white/25"
        }`}
      >
        <span className="block truncate">{value}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[#131313] p-1 text-base shadow-2xl shadow-black/40 ring-1 ring-white/5 focus:outline-none">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer select-none w-full rounded-lg py-2 px-3 text-neutral-100 hover:bg-white/10"
            >
              <span
                className={`block truncate ${
                  value === option ? 'font-semibold' : 'font-normal'
                }`}
              >
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

type CarResearchFormProps = {
  selectedMake?: string;
  selectedModel?: string;
  selectedYear?: string;
  onMakeChange?: (make: string) => void;
  onModelChange?: (model: string) => void;
  onYearChange?: (year: string) => void;
};

const CarResearchForm: React.FC<CarResearchFormProps> = ({
  selectedMake: controlledMake,
  selectedModel: controlledModel,
  selectedYear: controlledYear,
  onMakeChange,
  onModelChange,
  onYearChange,
}) => {
  const [internalMake, setInternalMake] = useState<string>('All');
  const [internalModel, setInternalModel] = useState<string>('All');
  const [internalYear, setInternalYear] = useState<string>('All years');

  const [makesFromDb, setMakesFromDb] = useState<string[]>([]);
  const [modelsFromDb, setModelsFromDb] = useState<string[]>([]);
  const [yearsFromDb, setYearsFromDb] = useState<number[]>([]);

  const makes = useMemo(() => ['All', ...makesFromDb], [makesFromDb]);
  const selectedMake = controlledMake ?? internalMake;
  const models = useMemo(() => (selectedMake && selectedMake !== 'All' ? ['All', ...modelsFromDb] : ['All']), [selectedMake, modelsFromDb]);
  const selectedModel = controlledModel ?? internalModel;
  const years = useMemo(
    () => (selectedMake && selectedMake !== 'All' && selectedModel && selectedModel !== 'All' ? ['All years', ...yearsFromDb.map(String)] : ['All years']),
    [selectedMake, selectedModel, yearsFromDb]
  );
  const selectedYear = controlledYear ?? internalYear;

  const resetToDefaults = () => {
    const defaultMake = 'All';
    const defaultModel = 'All';
    const defaultYear = "All years";

    onMakeChange?.(defaultMake);
    onModelChange?.(defaultModel);
    onYearChange?.(defaultYear);

    if (controlledMake === undefined) setInternalMake(defaultMake);
    if (controlledModel === undefined) setInternalModel(defaultModel);
    if (controlledYear === undefined) setInternalYear(defaultYear);
  };

  useEffect(() => {
    if (!selectedMake && makes.length > 0) {
      const nextMake = makes[0];
      onMakeChange?.(nextMake);
      if (controlledMake === undefined) setInternalMake(nextMake);
    }
  }, [selectedMake, makes, onMakeChange, controlledMake]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/public/car-filters', { signal: controller.signal });
        const json = (await res.json()) as { success?: boolean; makes?: string[] };
        if (!json?.success) return;
        const next = Array.isArray(json.makes) ? json.makes : [];
        setMakesFromDb(next);
      } catch {}
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedMake || selectedMake === 'All') {
      setModelsFromDb([]);
      setYearsFromDb([]);
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const url = `/api/public/car-filters?make=${encodeURIComponent(selectedMake)}`;
        const res = await fetch(url, { signal: controller.signal });
        const json = (await res.json()) as { success?: boolean; models?: string[] };
        if (!json?.success) return;
        const next = Array.isArray(json.models) ? json.models : [];
        setModelsFromDb(next);
      } catch {}
    })();

    return () => controller.abort();
  }, [selectedMake]);

  useEffect(() => {
    if (!selectedMake || selectedMake === 'All' || !selectedModel || selectedModel === 'All') {
      setYearsFromDb([]);
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const url = `/api/public/car-filters?make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(selectedModel)}`;
        const res = await fetch(url, { signal: controller.signal });
        const json = (await res.json()) as { success?: boolean; years?: number[] };
        if (!json?.success) return;
        const next = Array.isArray(json.years) ? json.years : [];
        setYearsFromDb(next);
      } catch {}
    })();

    return () => controller.abort();
  }, [selectedMake, selectedModel]);

  useEffect(() => {
    if (!selectedMake) return;
    if (selectedModel && models.includes(selectedModel)) return;
    const nextModel = models[0] ?? '';
    onModelChange?.(nextModel);
    if (controlledModel === undefined) setInternalModel(nextModel);
  }, [selectedMake, selectedModel, models, onModelChange, controlledModel]);

  useEffect(() => {
    if (selectedYear === 'All years') return;
    if (years.includes(selectedYear)) return;
    onYearChange?.('All years');
    if (controlledYear === undefined) setInternalYear('All years');
  }, [selectedYear, years, onYearChange, controlledYear]);

  return (
    <div className="mx-auto w-full max-w-6xl overflow-visible rounded-3xl border border-white/10 bg-[#0B0B0B] p-4 shadow-2xl shadow-black/40">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
        <CustomSelect
          label="Make"
          options={makes}
          value={selectedMake}
          onChange={(make) => {
            const nextModel = 'All';
            onMakeChange?.(make);
            onModelChange?.(nextModel);
            onYearChange?.('All years');
            if (controlledMake === undefined) setInternalMake(make);
            if (controlledModel === undefined) setInternalModel(nextModel);
            if (controlledYear === undefined) setInternalYear('All years');
          }}
        />

        <CustomSelect
          label="Model"
          options={models}
          value={selectedModel}
          onChange={(model) => {
            onModelChange?.(model);
            onYearChange?.('All years');
            if (controlledModel === undefined) setInternalModel(model);
            if (controlledYear === undefined) setInternalYear('All years');
          }}
        />

        <CustomSelect
          label="Year"
          options={years}
          value={selectedYear}
          onChange={(year) => {
            onYearChange?.(year);
            if (controlledYear === undefined) setInternalYear(year);
          }}
        />

        <div className="flex items-center gap-3 md:justify-end">
          <button
            type="button"
            onClick={resetToDefaults}
            className="h-[48px] w-full rounded-xl border border-white/15 bg-white/5 px-4 text-xs font-black uppercase tracking-[0.2em] text-neutral-200 transition hover:border-white/25 hover:bg-white/10 active:scale-[0.99]"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-500">
        Filters apply instantly to show only matching cars.
      </p>
    </div>
  );
};

export default CarResearchForm;
