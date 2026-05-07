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
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
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
      className="h-12 w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
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

const SelectField: FC<SelectFieldProps> = ({ id, label, value, options, onChange, placeholder = 'Select', required = false }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="h-12 w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
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
  </div>
);

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
      <label htmlFor={`${id}-search`} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input name={id} value={value} readOnly required={required} className="sr-only" />

      <div className="flex min-h-12 w-full items-center gap-3 rounded-lg border border-line bg-background-soft px-3 py-2 text-left text-sm text-foreground outline-none transition focus-within:border-[#f4c430]">
        <button
          type="button"
          aria-label="Add feature"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-base font-semibold text-foreground transition hover:border-[#f4c430]/60"
        >
          +
        </button>
        <div className="flex-1">
          <span className={selectedLabels.length ? 'text-foreground' : 'text-muted'}>
            {selectedLabels.length ? selectedLabels.join(', ') : placeholder}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-[260px] max-w-full rounded-xl border border-line bg-surface p-3 shadow-xl">
          <input
            id={`${id}-search`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find an option"
            className="h-11 w-full rounded-lg border border-line bg-background-soft px-3 text-sm text-foreground outline-none transition focus:border-[#f4c430]"
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
                        ? 'bg-[#f4c430] text-black'
                        : 'bg-background-soft text-foreground hover:border-[#f4c430]/60',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
              {filteredOptions.length === 0 && (
                <div className="px-1 py-2 text-sm text-muted">No options found</div>
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
  required?: boolean;
}

const TextAreaField: FC<TextAreaProps> = ({ id, label, value, onChange, placeholder, required = false }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      required={required}
      className="w-full rounded-lg border border-line bg-background-soft px-3 py-2 text-foreground outline-none transition focus:border-[#f4c430]"
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
    <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-muted">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <label
      htmlFor={id}
      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-line bg-surface/60 px-3 text-sm text-muted hover:border-[#f4c430]/60"
    >
      <span>Drop files here or </span>
      <span className="ml-1 font-semibold text-[#f4c430] underline">browse</span>
      {fileName && <span className="ml-2 truncate text-foreground">({fileName})</span>}
    </label>
    <input id={id} type="file" className="hidden" onChange={onFileChange} required={required} />
  </div>
);

const VehicleValuationForm: FC = () => {
  const { isSubmitLoading, isSubmitSuccess, isSubmitError, resetSubmitSuccess, exchangeEvSubmit } = useExchangeStore();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

  const submitExchangeRequest = async () => {
    await exchangeEvSubmit({ ...formData, vehicleDocument, vehiclePhoto });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitLoading) return;
    setIsConfirmModalOpen(true);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setVehicleDocument(null);
    setVehiclePhoto(null);
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    handleReset();
  };

  useEffect(() => {
    if (isSubmitSuccess) {
      setIsSuccessModalOpen(true);
    }
    return () => {
      resetSubmitSuccess();
    };
  }, [isSubmitSuccess, resetSubmitSuccess]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black uppercase tracking-wide md:text-4xl">Exchange to EV</h1>
          <p className="text-sm text-muted">Submit your car details and your preferred EV. Our team will contact you with options.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-line bg-surface p-6 md:p-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">Seller</div>
            <div className="mt-1 text-lg font-semibold text-foreground">Contact Details</div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleTextInputChange} required />
            <SelectField id="city" label="City" value={formData.city} options={cityOptions} onChange={handleSelectChange} required placeholder="Select city" />
            <InputField id="email" label="Email" value={formData.email} onChange={handleTextInputChange} type="email" required />
            <InputField id="phone" label="Phone" value={formData.phone} onChange={handleTextInputChange} type="tel" required maxLength={10} />
          </div>

          <div className="border-t border-line pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">Vehicle</div>
            <div className="mt-1 text-lg font-semibold text-foreground">Car Details</div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                id="makeYear"
                label="Year of Manufacture"
                value={formData.makeYear}
                onChange={handleTextInputChange}
                type="tel"
                placeholder="2077"
                required
                maxLength={4}
              />
              <SelectField
                id="vehicleType"
                label="Vehicle Type"
                value={formData.vehicleType}
                options={vehicleTypeOptions}
                onChange={handleSelectChange}
                required
                placeholder="Select vehicle type"
              />
              <InputField id="vehicleModel" label="Vehicle Model" value={formData.vehicleModel} onChange={handleTextInputChange} required />
              <InputField id="vehicleBrand" label="Vehicle Brand" value={formData.vehicleBrand} onChange={handleTextInputChange} />
              <SelectField
                id="vehicleColor"
                label="Vehicle Color"
                value={formData.vehicleColor}
                options={colorOptions}
                onChange={handleSelectChange}
                required
                placeholder="Select color"
              />
              <InputField id="kmDriven" label="KM Driven" value={formData.kmDriven} onChange={handleTextInputChange} type="number" required />
              <InputField id="expectedValuation" label="Expected Valuation" value={formData.expectedValuation} onChange={handleTextInputChange} type="number" required />
              <SelectField id="fuelType" label="Fuel Type" value={formData.fuelType} options={fuelTypeOptions} onChange={handleSelectChange} required placeholder="Select fuel type" />
              <SelectField id="condition" label="Condition" value={formData.condition} options={conditionOptions} onChange={handleSelectChange} required placeholder="Select condition" />
              <SelectField
                id="transmission"
                label="Transmission / Gear"
                value={formData.transmission}
                options={transmissionOptions}
                onChange={handleSelectChange}
                required
                placeholder="Select transmission"
              />
              <SelectField id="accidents" label="Accidents" value={formData.accidents} options={yesNoOptions} onChange={handleSelectChange} required placeholder="Select option" />
            </div>

            {formData.accidents === 'yes' && (
              <div className="mt-4">
                <TextAreaField id="accidentInfo" label="Accident Info" value={formData.accidentInfo} onChange={handleTextAreaChange} />
              </div>
            )}
          </div>

          <div className="border-t border-line pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">Uploads</div>
            <div className="mt-1 text-lg font-semibold text-foreground">Documents</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <UploadField
                id="vehicleDocument"
                label="Upload Vehicle Document"
                fileName={vehicleDocument?.name || ''}
                onFileChange={(e) => setVehicleDocument(e.target.files?.[0] || null)}
                required
              />
              <UploadField
                id="vehiclePhoto"
                label="Upload Vehicle Photo"
                fileName={vehiclePhoto?.name || ''}
                onFileChange={(e) => setVehiclePhoto(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>

          <div className="border-t border-line pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">EV</div>
            <div className="mt-1 text-lg font-semibold text-foreground">Your Preference</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
            <div className="mt-4">
              <TextAreaField id="additionalInfo" label="Notes" value={formData.additionalInfo} onChange={handleTextAreaChange} />
            </div>
          </div>

          {isSubmitError && <p className="text-sm text-red-400">Something went wrong while submitting. Please try again.</p>}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={handleReset} className="text-sm font-semibold text-muted underline-offset-2 hover:underline">
              Clear form
            </button>

            <button
              type="submit"
              disabled={isSubmitLoading}
              className="cursor-pointer rounded-lg bg-[#f4c430] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#ffdf70] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <SubmitPortal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6 text-foreground shadow-xl">
          <h2 className="text-lg font-semibold">Confirm submission</h2>
          <p className="mt-2 text-sm text-muted">
            Are you sure you want to submit this Exchange form? You can still go back and edit before submitting.
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-foreground hover:border-[#f4c430]/60"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitLoading}
              onClick={async () => {
                setIsConfirmModalOpen(false);
                await submitExchangeRequest();
              }}
              className="rounded-md bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffdf70] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitLoading ? 'Submitting...' : 'Confirm'}
            </button>
          </div>
        </div>
      </SubmitPortal>

      <SubmitPortal isOpen={isSuccessModalOpen} onClose={closeModal}>
        <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6 text-center text-foreground shadow-xl">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c430] text-black">✓</div>
          <h2 className="text-lg font-semibold">Request Submitted</h2>
          <p className="mt-2 text-sm text-muted">Thanks! Our team will contact you shortly.</p>
          <button onClick={closeModal} className="mt-5 rounded-md bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffdf70]">
            Close
          </button>
        </div>
      </SubmitPortal>
    </main>
  );
};

export default VehicleValuationForm;
