'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect, FC, RefObject, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubmitPortal from '@/components/SubmitPortal';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { useExchangeStore } from '@/store/useExchangeStore';

interface OptionType {
  value: string;
  label: string;
}

const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};


interface InputFieldProps {
  id: string; // Should be the same as name
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'tel';
  required?: boolean;
  maxLength?: number;
}

const InputField: FC<InputFieldProps> = ({ id, name, label, value, onChange, placeholder, type = 'text', required = false, maxLength }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      required={required}
      maxLength={maxLength}
      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
  </div>
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: OptionType[];
  selectedValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({ label, name, options, selectedValue, onChange }) => (
  <div className="md:col-span-2 flex flex-col md:flex-row md:items-center">
    <label className="text-base font-semibold text-gray-200 md:w-1/3">{label}</label>
    <div className="flex flex-col md:flex-row md:flex-wrap md:w-2/3 mt-2 md:mt-0">
      {options.map((option) => (
        <div key={option.value} className="flex items-center mr-6 mb-2 md:mb-0">
          <input
            id={`${name}-${option.value}`}
            type="radio"
            value={option.value}
            name={name}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="h-4 w-4 text-teal-500 bg-white/10 border-white/30 focus:ring-teal-400 focus:ring-offset-gray-800"
          />
          <label htmlFor={`${name}-${option.value}`} className="ml-2 text-gray-300">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

interface CustomSelectProps {
  id: string;
  label: string;
  options: OptionType[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ id, label, options, selectedValue, onSelect, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    useOnClickOutside(selectRef, () => setIsOpen(false));

    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || placeholder;

    return (
        <div ref={selectRef} className="relative">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
              {label}
            </label>
            <button
                type="button"
                id={id}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
                <span className={selectedValue ? 'text-white' : 'text-gray-400'}>{selectedLabel}</span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 w-full mt-1 bg-gray-800/80 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl"
                    >
                        <ul className="max-h-60 overflow-auto p-1">
                            {options.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => { onSelect(option.value); setIsOpen(false); }}
                                    className="px-4 py-2 text-gray-200 cursor-pointer rounded-md hover:bg-teal-500/20"
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Form Component ---

// Define the shape of our form data
interface FormDataState {
  fullName: string;
  email: string;
  phone: number ;
  city: string;
  vehicleModel: string;
  vehicleType: string;
  makeYear: number ;
  vehicleColor: string;
  kmDriven: number ;
  expectedValuation: number;
  features: string;
  fuelType: string;
  condition: string;
  accidents: string;
  accidentInfo: string;
  transmission: string;
  newVehicleBrand: string;
  newVehicleModel: string;
  newVehiclePriceRange: string;
  downpayment: number;
  finance: string;
  additionalInfo: string;
  //  fullName:string
  // email:string
  // phone:string
  // city:string
  // vehicleModel:string
  // accidents:string
  // accidentInfo?:string
  // additionalInfo?:string
  // condition:string
  // downpayment:Number
  // expectedValuation:Number
  // features:string
  // finance:string
  // fuelType:string
  // kmDriven:Number
  // makeYear:string
  // newVehicleBrand:string
  // newVehicleModel:string
  // newVehiclePriceRange:string
  // transmission:string
  // vehicleColor:string
  // vehicleType:string
}

// Define the initial state for the form
  const initialFormState: FormDataState = {
    fullName: '',
    email: '',
    phone: 0,
    city: '',
    vehicleModel: '',
    vehicleType: '',
    makeYear: 0,
    vehicleColor: '',
    kmDriven: 0,
    expectedValuation: 0,
    features: '',
    fuelType: '',
    condition: '',
    accidents: '',
    accidentInfo: '',
    transmission: '',
    newVehicleBrand: '',
    newVehicleModel: '',
    newVehiclePriceRange: '',
    downpayment: 0,
    finance: '',
    additionalInfo: '',
  };

const VehicleValuationForm: FC = () => {
  const {isSubmitLoading, isSubmitSuccess, isSubmitError,resetSubmitSuccess ,singleCarExchangeData,exchangeEvSubmit}=useExchangeStore()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormDataState>(initialFormState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      // Restrict phone to 10 digits and makeYear to 4 digits
      if (name === "phone") {
        // Remove non-digits, limit to 10
        let cleaned = value.replace(/\D/g, "").slice(0, 10);
        setFormData(prev => ({ ...prev, phone: cleaned === '' ? 0 : Number(cleaned) }));
      } else if (name === "makeYear") {
        let cleaned = value.replace(/\D/g, "").slice(0, 4);
        setFormData(prev => ({ ...prev, makeYear: cleaned === '' ? 0 : Number(cleaned) }));
      } else if (["kmDriven", "expectedValuation"].includes(name)) {
        // Only allow non-negative numbers
        const num = value === '' ? '' : Math.max(0, Number(value));
        setFormData(prev => ({ ...prev, [name]: num }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    // Handler factory for custom select components
    const handleSelectChange = (field: keyof FormDataState) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    
     console.log(process.env.NEXT_PUBLIC_CLIENT_URL)
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log('Submitting Form Data:', formData);
         await exchangeEvSubmit(formData);

        // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
    };

    useEffect(()=>{
       if(isSubmitSuccess){
        setIsModalOpen(true);
       } 

       return ()=>{
         resetSubmitSuccess();
       }
    },[isSubmitSuccess])
    
    const handleReset = () => {
        setFormData(initialFormState);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        handleReset(); // Reset form when closing modal
    };
    
    // Options for select dropdowns
    const cityOptions: OptionType[] = [
        { value: 'Kathmandu', label: 'Kathmandu' }, { value: 'Pokhara', label: 'Pokhara' }, { value: 'Lalitpur', label: 'Lalitpur (Patan)' }, { value: 'Biratnagar', label: 'Biratnagar' }, { value: 'Bhaktapur', label: 'Bhaktapur' },
    ];
    const carTypesOptions: OptionType[] = [
        { value: 'sedan', label: 'Sedan' }, { value: 'suv', label: 'SUV' }, { value: 'hatch', label: 'Hatch' }, { value: 'coupe', label: 'Coupe' }, { value: 'wagon', label: 'Wagon' }, { value: 'van', label: 'Van' }, { value: 'peoplemover', label: 'People Mover' },
    ];
    const priceRangeOptions: OptionType[] = [
        { value: 'above 30 lakhs', label: 'Above 30 lakhs' }, { value: 'above 50 lakhs', label: 'Above 50 lakhs' }, { value: 'above 75 lakhs', label: 'Above 75 lakhs' }, { value: 'above 1 crore', label: 'Above 1 crore' },
    ];
    const carColorOptions: OptionType[] = [ "White", "Black", "Silver", "Grey", "Red", "Blue", "Maroon", "Brown", "Green", "Yellow", "Orange", "Gold", "Beige", "Sky Blue", "Pearl White", "Metallic Silver", "Gunmetal Grey", "Navy Blue"
    ].map(color => ({ value: color.toLowerCase(), label: color }));

    console.log(singleCarExchangeData)
    console.log(isSubmitSuccess)

    return (
        <main style={{ backgroundColor: '#E8EDEE' }} className="py-16 w-full">
            <div className="w-full mx-auto">
                <div className="text-center mb-12">
                    {/* Breadcrumbs Navigation */}
                    <nav className="mb-8 flex space-x-2 text-sm font-medium w-full items-center justify-center">
                        <Link href="/" className="text-teal-600 hover:text-teal-800 transition-colors duration-200 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        <span className="text-gray-600">Exchange to EV</span>
                    </nav>
                    {/* Header */}
                    <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight text-gray-800">
                        Exchange To <span className="bg-gradient-to-r from-[#004D40] via-[#008080] to-[#00BCD4] bg-clip-text text-transparent">EV</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
                        Your one-stop destination for electric vehicle exchange
                    </p>
                </div>
                
                {/* Form Container */}
                <div className="relative shadow-2xl overflow-hidden p-2 sm:p-4 md:p-8 lg:p-16 bg-cover bg-center" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1751800932672-2c3743e77062?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D)"}}>
                    <div className="absolute inset-0 bg-black/60"/>
                    <form className="relative z-10 w-full p-8 bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <h2 className="text-xl font-semibold text-white md:col-span-2">1. Owner Details</h2>
                            <InputField id="fullName" name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} placeholder="Prajwol Shrestha" required />
                            <InputField id="email" name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} placeholder="prajwolstha@example.com" required />
                            <InputField id="phone" name="phone" label="Phone Number" type="tel" value={formData.phone === 0 ? '' : String(formData.phone)} onChange={handleChange} placeholder="98XXXXXXXX" required maxLength={10} />
                            <CustomSelect id="city" label="City" options={cityOptions} placeholder="Select your city" selectedValue={formData.city} onSelect={handleSelectChange('city')} />
                            
                            <h2 className="text-xl font-semibold text-white md:col-span-2 mt-4">2. Vehicle Details</h2>
                            <InputField id="vehicleModel" name="vehicleModel" label="Vehicle Model" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g., Maruti Suzuki Alto 800" required />
                            <CustomSelect id="vehicleType" label="Vehicle Type" options={carTypesOptions} placeholder="Select your vehicle type" selectedValue={formData.vehicleType} onSelect={handleSelectChange('vehicleType')} />
                            <InputField id="makeYear" name="makeYear" label="Make year" type="tel" value={formData.makeYear === 0 ? '' : String(formData.makeYear)} onChange={handleChange} placeholder="e.g., 2078 (2021)" required maxLength={4} />
                            <CustomSelect id="vehicleColor" label="Vehicle Color" options={carColorOptions} placeholder="Select vehicle color" selectedValue={formData.vehicleColor} onSelect={handleSelectChange('vehicleColor')} />
                            <InputField id="kmDriven" name="kmDriven" label="KM driven" type="number" value={formData.kmDriven === 0 ? '' : String(formData.kmDriven)} onChange={handleChange} placeholder="e.g., 35,000" required />
                            <InputField id="expectedValuation" name="expectedValuation" label="Expected Valuation amount (in NPR)" type="number" value={formData.expectedValuation === 0 ? '' : String(formData.expectedValuation)} onChange={handleChange} placeholder="e.g., NPR 12,50,000" required />

                            <RadioGroup label="Features:" name="features" options={[{ value: 'full', label: 'Full Option' }, { value: 'mid', label: 'Mid Option' }, { value: 'unknown', label: "I don't know" }]} selectedValue={formData.features} onChange={handleChange} />
                            <RadioGroup label="Fuel Type:" name="fuelType" options={[{ value: 'petrol', label: 'Petrol' }, { value: 'diesel', label: 'Diesel' }, { value: 'electric', label: 'Electric' }, { value: 'hybrid', label: 'Hybrid' }]} selectedValue={formData.fuelType} onChange={handleChange} />
                            
                            <hr className="my-2 md:col-span-2 border-white/10" />
                            <RadioGroup label="Vehicle Condition:" name="condition" options={[{ value: 'new', label: 'Like New' }, { value: 'minimal', label: 'Minimal damage' }, { value: 'mechanical', label: 'Mechanical Issues' }]} selectedValue={formData.condition} onChange={handleChange} />
                            <hr className="my-2 md:col-span-2 border-white/10" />
                            <RadioGroup label="Accidents:" name="accidents" options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} selectedValue={formData.accidents} onChange={handleChange} />
                            <div className="md:col-span-2">
                                <label htmlFor="accidentInfo" className="block text-sm font-medium text-gray-300 mb-1">Additional Information (accidents/damages)</label>
                                <textarea id="accidentInfo" name="accidentInfo" value={formData.accidentInfo} onChange={handleChange} placeholder="Describe any past accidents or current damages..." className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400" rows={3}></textarea>
                            </div>
                            <hr className="my-2 md:col-span-2 border-white/10" />
                            <RadioGroup label="Transmission:" name="transmission" options={[{ value: 'manual', label: 'Manual' }, { value: 'automatic', label: 'Automatic' }]} selectedValue={formData.transmission} onChange={handleChange} />

                            <h2 className="text-xl font-semibold text-white md:col-span-2 mt-4">3. New Vehicle Details</h2>
                            <InputField id="newVehicleBrand" name="newVehicleBrand" label="Vehicle Brand" value={formData.newVehicleBrand} onChange={handleChange} placeholder="Leave empty if not applicable" />
                            <InputField id="newVehicleModel" name="newVehicleModel" label="Vehicle Model" value={formData.newVehicleModel} onChange={handleChange} placeholder="Leave empty if not applicable" />
                            <CustomSelect id="newVehiclePriceRange" label="Price Range" options={priceRangeOptions} placeholder="Select price range" selectedValue={formData.newVehiclePriceRange} onSelect={handleSelectChange('newVehiclePriceRange')} />
                            <InputField id="downpayment" name="downpayment" label="Downpayment amount" type="number" value={formData.downpayment === 0 ? '' : String(formData.downpayment)} onChange={handleChange} placeholder="NPR" />

                            <RadioGroup label="Looking to Finance?:" name="finance" options={[{ value: 'yes', label: 'Yes' }, { value: 'no', 'label': 'No' }]} selectedValue={formData.finance} onChange={handleChange}/>
                            <div className="md:col-span-2">
                                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-1">Additional Information</label>
                                <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Any other requirements or details..." className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400" rows={3}></textarea>
                            </div>

                            <div className="flex items-center mt-6 md:col-span-2">
                                <button onClick={handleSubmit} disabled={isSubmitLoading} className="cursor-pointer text-white bg-teal-600 font-medium py-2.5 px-8 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 hover:bg-teal-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                <button type="button" onClick={handleReset} className="cursor-pointer text-gray-200 font-medium ml-4 border-2 border-white/20 py-2.5 px-8 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-400 hover:bg-white/10">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Success Modal */}
                <SubmitPortal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      <div className="relative h-56 w-full">
                        <Image
                          src="https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80"
                          alt="Electric car charging"
                          layout="fill"
                          objectFit="cover"
                          priority
                        />
                      </div>
                      <div className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                          <FaCheckCircle className="text-green-500 text-5xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Request Submitted!
                        </h2>
                        <p className="text-gray-600 mb-6">
                          Thank you for your interest! We've received your details and are on our way to helping you switch to electric. Our team will contact you shortly.
                        </p>
                        <button
                          onClick={closeModal}
                          className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-200"
                        >
                          Sounds Good!
                        </button>
                      </div>
                    </div>
                </SubmitPortal>
            </div>
        </main>
    );
};

export default VehicleValuationForm;