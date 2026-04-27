'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import SubmitPortal from '@/components/SubmitPortal';
import { useExchangeStore } from '@/store/useExchangeStore';

interface OptionType {
  value: string;
  label: string;
}

interface FormDataState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleModel: string;
  vehicleType: string;
  vehicleBrand: string;
  makeYear: string;
  vehicleColor: string;
  kmDriven: string;
  expectedValuation: string;
  features: string;
  fuelType: string;
  condition: string;
  accidents: string;
  accidentInfo: string;
  transmission: string;
  newVehicleBrand: string;
  newVehicleModel: string;
  newVehiclePriceRange: string;
  downpayment: string;
  finance: string;
  additionalInfo: string;
}

const initialFormState: FormDataState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  vehicleModel: '',
  vehicleType: '',
  vehicleBrand: '',
  makeYear: '',
  vehicleColor: '',
  kmDriven: '',
  expectedValuation: '',
  features: '',
  fuelType: '',
  condition: '',
  accidents: '',
  accidentInfo: '',
  transmission: '',
  newVehicleBrand: '',
  newVehicleModel: '',
  newVehiclePriceRange: '',
  downpayment: '',
  finance: '',
  additionalInfo: '',
};

interface InputFieldProps {
  id: keyof FormDataState;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  required?: boolean;
  maxLength?: number;
}

const InputField: FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, type = 'text', required = false, maxLength }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

interface SelectFieldProps {
  id: keyof FormDataState;
  label: string;
  value: string;
  options: OptionType[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({ id, label, value, options, onChange, placeholder = 'Select', required = false }) => {
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : '';
  const chipTones = [
    'bg-cyan-100 text-cyan-900',
    'bg-blue-100 text-blue-900',
    'bg-emerald-100 text-emerald-900',
    'bg-indigo-100 text-indigo-900',
  ];
  const selectedChipClass = selectedIndex >= 0 ? chipTones[selectedIndex % chipTones.length] : '';

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedLabel && (
        <div className="mt-2">
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${selectedChipClass}`}>
            {selectedLabel}
          </span>
        </div>
      )}
    </div>
  );
};

interface MultiSelectFieldProps {
  id: keyof FormDataState;
  label: string;
  value: string;
  options: OptionType[];
  onChange: (nextValue: string) => void;
  placeholder?: string;
  required?: boolean;
}

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const selected = value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const selectedSet = new Set(selected);
  const filteredOptions = options.filter((opt) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [isOpen]);

  const toggleOption = (opt: OptionType) => {
    const next = new Set(selected);
    if (next.has(opt.value)) next.delete(opt.value);
    else next.add(opt.value);
    onChange(Array.from(next).join(', '));
  };

  const selectedLabels = selected.map((s) => options.find((o) => o.value === s)?.label ?? s);

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={`${id}-search`} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input name={id} value={value} readOnly required={required} className="sr-only" />

      <div className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-base text-gray-900 outline-none transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <button
          type="button"
          aria-label="Add feature"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          +
        </button>
        <div className="flex-1">
          <span className={selectedLabels.length ? 'text-gray-900' : 'text-gray-400'}>
            {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-[260px] max-w-full rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
          <input
            id={`${id}-search`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find an option"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-3 max-h-56 overflow-auto pr-1">
            <div className="flex flex-col gap-2">
              {filteredOptions.map((opt) => {
                const isSelected = selectedSet.has(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    className={[
                      'w-fit rounded-full px-3 py-1 text-sm font-medium transition',
                      isSelected
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
              {filteredOptions.length === 0 && (
                <div className="px-1 py-2 text-sm text-gray-500">No options found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TextAreaProps {
  id: keyof FormDataState;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextAreaField: FC<TextAreaProps> = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

interface UploadFieldProps {
  id: string;
  label: string;
  fileName: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const UploadField: FC<UploadFieldProps> = ({ id, label, fileName, onFileChange, required = false }) => (
  <div>
    <label className="mb-1.5 block text-sm font-semibold text-gray-800">{label}</label>
    <label
      htmlFor={id}
      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-blue-300 bg-blue-50/40 px-3 text-sm text-gray-600 hover:border-blue-400"
    >
      <span>Drop files here or </span>
      <span className="ml-1 font-medium text-blue-700 underline">browse</span>
      {fileName && <span className="ml-2 truncate text-gray-700">({fileName})</span>}
    </label>
    <input id={id} type="file" className="hidden" onChange={onFileChange} required={required} />
  </div>
);

const VehicleValuationForm: FC = () => {
  const { isSubmitLoading, isSubmitSuccess, isSubmitError, resetSubmitSuccess, exchangeEvSubmit } = useExchangeStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [vehicleDocument, setVehicleDocument] = useState<File | null>(null);
  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);

  const cityOptions: OptionType[] = [
    { value: 'Kathmandu', label: 'Kathmandu' },
    { value: 'Pokhara', label: 'Pokhara' },
    { value: 'Lalitpur', label: 'Lalitpur' },
    { value: 'Bhaktapur', label: 'Bhaktapur' },
    { value: 'Biratnagar', label: 'Biratnagar' },
  ];

  const vehicleTypeOptions: OptionType[] = [
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'van', label: 'Van' },
  ];

  const fuelTypeOptions: OptionType[] = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const yesNoOptions: OptionType[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const transmissionOptions: OptionType[] = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automatic' },
  ];

  const conditionOptions: OptionType[] = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'average', label: 'Average' },
    { value: 'poor', label: 'Poor' },
  ];

  const priceRangeOptions: OptionType[] = [
    { value: 'Below 10 Lakhs', label: 'Below 10 Lakhs' },
    { value: '10-20 Lakhs', label: '10-20 Lakhs' },
    { value: '20-30 Lakhs', label: '20-30 Lakhs' },
    { value: '30-40 Lakhs', label: '30-40 Lakhs' },
    { value: '40+ Lakhs', label: '40+ Lakhs' },
  ];

  const colorOptions: OptionType[] = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'silver', label: 'Silver' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'grey', label: 'Grey' },
  ];

  const featureOptions: OptionType[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'a/c', label: 'A/C' },
    { value: 'full', label: 'Full' },
    { value: 'premium', label: 'Premium' },
    { value: '4wd', label: '4WD' },
    { value: 'abs', label: 'ABS' },
    { value: 'airbags', label: 'Airbags' },
    { value: 'reverse-camera', label: 'Reverse Camera' },
    { value: 'parking-sensors', label: 'Parking Sensors' },
    { value: 'bluetooth', label: 'Bluetooth' },
    { value: 'cruise-control', label: 'Cruise Control' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'sunroof', label: 'Sunroof' },
    { value: 'alloy-wheels', label: 'Alloy Wheels' },
  ];

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: cleaned }));
      return;
    }

    if (name === 'makeYear') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData((prev) => ({ ...prev, makeYear: cleaned }));
      return;
    }

    if (['kmDriven', 'expectedValuation', 'downpayment'].includes(name)) {
      const cleaned = value.replace(/[^\d]/g, '');
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await exchangeEvSubmit({ ...formData, vehicleDocument, vehiclePhoto });
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setVehicleDocument(null);
    setVehiclePhoto(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  useEffect(() => {
    if (isSubmitSuccess) {
      setIsModalOpen(true);
    }
    return () => {
      resetSubmitSuccess();
    };
  }, [isSubmitSuccess, resetSubmitSuccess]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 px-4 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
          Exchange to EV
        </h1>
        <hr className="mt-4 mb-8 border-blue-100" />

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg md:p-10">
          <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleTextInputChange} required />
          <InputField id="email" label="Email" value={formData.email} onChange={handleTextInputChange} type="email" required />
          <InputField id="phone" label="Phone" value={formData.phone} onChange={handleTextInputChange} type="tel" required maxLength={10} />
          <SelectField id="city" label="City" value={formData.city} options={cityOptions} onChange={handleSelectChange} required placeholder="Select city" />
          <InputField id="makeYear" label="year of Manufacture" value={formData.makeYear} onChange={handleTextInputChange} type="tel" placeholder="2077" required maxLength={4} />
          <SelectField id="vehicleType" label="vehicle Type" value={formData.vehicleType} options={vehicleTypeOptions} onChange={handleSelectChange} required placeholder="Select vehicle type" />
          <InputField id="vehicleModel" label="vehicle Model" value={formData.vehicleModel} onChange={handleTextInputChange} required />
          <InputField id="vehicleBrand" label="vehicle Brand" value={formData.vehicleBrand} onChange={handleTextInputChange} />
          <SelectField id="vehicleColor" label="vehicle Color" value={formData.vehicleColor} options={colorOptions} onChange={handleSelectChange} required placeholder="Select color" />
          <InputField id="kmDriven" label="KM Driven" value={formData.kmDriven} onChange={handleTextInputChange} type="number" required />
          <InputField id="expectedValuation" label="Expected Valuation" value={formData.expectedValuation} onChange={handleTextInputChange} type="number" required />

          <UploadField
            id="vehicleDocument"
            label="Upload vehicle Document"
            fileName={vehicleDocument?.name || ''}
            onFileChange={(e) => setVehicleDocument(e.target.files?.[0] || null)}
            required
          />
          <UploadField
            id="vehiclePhoto"
            label="Upload vehicle Photo"
            fileName={vehiclePhoto?.name || ''}
            onFileChange={(e) => setVehiclePhoto(e.target.files?.[0] || null)}
            required
          />

          <SelectField id="fuelType" label="Fuel Type" value={formData.fuelType} options={fuelTypeOptions} onChange={handleSelectChange} required placeholder="Select fuel type" />
          <SelectField id="condition" label="Condition" value={formData.condition} options={conditionOptions} onChange={handleSelectChange} required placeholder="Select condition" />
          <SelectField id="transmission" label="Transmission / Gear" value={formData.transmission} options={transmissionOptions} onChange={handleSelectChange} required placeholder="Select transmission" />
          <SelectField id="accidents" label="Accidents" value={formData.accidents} options={yesNoOptions} onChange={handleSelectChange} required placeholder="Select option" />
          {formData.accidents === 'yes' && (
            <TextAreaField id="accidentInfo" label="Accident info" value={formData.accidentInfo} onChange={handleTextAreaChange} />
          )}

          <InputField id="newVehicleBrand" label="Interested EV Brand" value={formData.newVehicleBrand} onChange={handleTextInputChange} required />
          <InputField id="newVehicleModel" label="Interested EV Model" value={formData.newVehicleModel} onChange={handleTextInputChange} required />
          <SelectField
            id="newVehiclePriceRange"
            label="Interested EV Price Range"
            value={formData.newVehiclePriceRange}
            options={priceRangeOptions}
            onChange={handleSelectChange}
            required
            placeholder="Select price range"
          />
          <InputField id="downpayment" label="Down Payment" value={formData.downpayment} onChange={handleTextInputChange} type="number" required />
          <SelectField id="finance" label="Are you looking for Finance ?" value={formData.finance} options={yesNoOptions} onChange={handleSelectChange} required placeholder="Select option" />

          <MultiSelectField
            id="features"
            label="Features"
            value={formData.features}
            options={featureOptions}
            onChange={(nextValue) => setFormData((prev) => ({ ...prev, features: nextValue }))}
            placeholder="Select features"
            required
          />
          <TextAreaField id="additionalInfo" label="Notes" value={formData.additionalInfo} onChange={handleTextAreaChange} />

          {isSubmitError && <p className="text-sm text-red-600">Something went wrong while submitting. Please try again.</p>}

          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
            >
              Clear form
            </button>

            <button
              type="submit"
              disabled={isSubmitLoading}
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Do not submit passwords through this form. Report malicious form.
          </p>
        </form>
      </div>

      <SubmitPortal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">✓</div>
          <h2 className="text-lg font-semibold text-gray-900">Request Submitted</h2>
          <p className="mt-2 text-sm text-gray-600">Thanks! Our team will contact you shortly.</p>
          <button
            onClick={closeModal}
            className="mt-5 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Close
          </button>
        </div>
      </SubmitPortal>
    </main>
  );
};

export default VehicleValuationForm;
