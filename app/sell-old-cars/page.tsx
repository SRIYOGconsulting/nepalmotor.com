'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import SubmitPortal from '@/components/SubmitPortal';

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
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-200">
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
      className="h-12 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none transition focus:border-[#f4c430]"
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
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-200">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="h-12 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none transition focus:border-[#f4c430]"
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
    <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-200">
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
      className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white outline-none transition focus:border-[#f4c430]"
    />
  </div>
);

interface UploadFieldProps {
  id: string;
  label: string;
  fileName: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadField: FC<UploadFieldProps> = ({ id, label, fileName, onFileChange }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-200">{label}</label>
    <label
      htmlFor={id}
      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 px-3 text-sm text-gray-300 hover:border-[#f4c430]/60"
    >
      <span>Drop files here or </span>
      <span className="ml-1 font-semibold text-[#f4c430] underline">browse</span>
      {fileName && <span className="ml-2 truncate text-gray-200">({fileName})</span>}
    </label>
    <input id={id} type="file" className="hidden" onChange={onFileChange} />
  </div>
);

const SellOldCarsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

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

  const colorOptions: OptionType[] = [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
    { value: 'silver', label: 'Silver' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'grey', label: 'Grey' },
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

    if (['kmDriven', 'expectedValuation'].includes(name)) {
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

  const handleReset = () => {
    setFormData(initialFormState);
    setVehicleDocument(null);
    setVehiclePhoto(null);
    setIsSubmitError(false);
    setIsSubmitSuccess(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleReset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    setIsSubmitError(false);

    try {
      const body = new FormData();
      (Object.keys(formData) as Array<keyof FormDataState>).forEach((k) => body.set(k, formData[k]));
      if (vehicleDocument) body.set('vehicleDocument', vehicleDocument);
      if (vehiclePhoto) body.set('vehiclePhoto', vehiclePhoto);

      const res = await fetch('/api/sell-old-car', { method: 'POST', body });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data?.success) {
        setIsSubmitError(true);
        return;
      }

      setIsSubmitSuccess(true);
    } catch {
      setIsSubmitError(true);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccess) setIsModalOpen(true);
  }, [isSubmitSuccess]);

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black uppercase tracking-wide md:text-4xl">Sell Old Cars</h1>
          <p className="text-sm text-gray-400">Submit your car details. This is selling only and not an exchange.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Seller</div>
              <div className="mt-1 text-lg font-semibold text-white">Contact Details</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleTextInputChange} required />
            <SelectField id="city" label="City" value={formData.city} options={cityOptions} onChange={handleSelectChange} required placeholder="Select city" />
            <InputField id="email" label="Email" value={formData.email} onChange={handleTextInputChange} type="email" required />
            <InputField id="phone" label="Phone" value={formData.phone} onChange={handleTextInputChange} type="tel" required maxLength={10} />
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Vehicle</div>
            <div className="mt-1 text-lg font-semibold text-white">Car Details</div>
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
              <SelectField id="fuelType" label="Fuel Type" value={formData.fuelType} options={fuelTypeOptions} onChange={handleSelectChange} required placeholder="Select fuel type" />
              <SelectField
                id="transmission"
                label="Transmission / Gear"
                value={formData.transmission}
                options={transmissionOptions}
                onChange={handleSelectChange}
                required
                placeholder="Select transmission"
              />
              <SelectField id="condition" label="Condition" value={formData.condition} options={conditionOptions} onChange={handleSelectChange} required placeholder="Select condition" />
              <SelectField id="accidents" label="Accidents" value={formData.accidents} options={yesNoOptions} onChange={handleSelectChange} required placeholder="Select option" />
              <InputField id="expectedValuation" label="Expected Valuation" value={formData.expectedValuation} onChange={handleTextInputChange} type="number" />
            </div>

            {formData.accidents === 'yes' && (
              <div className="mt-4">
                <TextAreaField id="accidentInfo" label="Accident Info" value={formData.accidentInfo} onChange={handleTextAreaChange} />
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextAreaField id="features" label="Features" value={formData.features} onChange={handleTextAreaChange} required placeholder="List key features" />
              <TextAreaField id="additionalInfo" label="Notes" value={formData.additionalInfo} onChange={handleTextAreaChange} />
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Uploads</div>
            <div className="mt-1 text-lg font-semibold text-white">Documents (Optional)</div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <UploadField
                id="vehicleDocument"
                label="Vehicle Document (optional)"
                fileName={vehicleDocument?.name || ''}
                onFileChange={(e) => setVehicleDocument(e.target.files?.[0] || null)}
              />
              <UploadField
                id="vehiclePhoto"
                label="Vehicle Photo (optional)"
                fileName={vehiclePhoto?.name || ''}
                onFileChange={(e) => setVehiclePhoto(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          {isSubmitError && <p className="text-sm text-red-400">Something went wrong while submitting. Please try again.</p>}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={handleReset} className="text-sm font-semibold text-gray-300 underline-offset-2 hover:underline">
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

      <SubmitPortal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#111] p-6 text-center text-white shadow-xl">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c430] text-black">✓</div>
          <h2 className="text-lg font-semibold">Request Submitted</h2>
          <p className="mt-2 text-sm text-gray-300">Thanks! Our team will contact you shortly.</p>
          <button onClick={closeModal} className="mt-5 rounded-md bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffdf70]">
            Close
          </button>
        </div>
      </SubmitPortal>
    </main>
  );
};

export default SellOldCarsPage;
