// components/TestDrivePage.tsx

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { InputField, SelectField, RadioGroup, CheckboxField, PhoneField, FormSection } from './FormElements'; // Adjust path if needed

// --- Mock Data for Select Fields ---
const locations = [
  { value: 'ktm', label: 'Kathmandu' },
  { value: 'pkr', label: 'Pokhara' },
  { value: 'btn', label: 'Butwal' },
  { value: 'dhr', label: 'Dharan' },
];

const timeSlots = [
  { value: '10:00', label: '10:00 AM - 11:00 AM' },
  { value: '11:00', label: '11:00 AM - 12:00 PM' },
  { value: '14:00', label: '02:00 PM - 03:00 PM' },
  { value: '15:00', label: '03:00 PM - 04:00 PM' },
];

const models = [
  { value: 'model-x', label: 'Gogoro Model X' },
  { value: 'model-y', label: 'Gogoro Model Y' },
  { value: 'model-z', label: 'Gogoro Model Z' },
];

const salaryRanges = [
    { value: '0-50k', label: 'Below Rs. 50,000' },
    { value: '50k-100k', label: 'Rs. 50,000 - Rs. 1,00,000' },
    { value: '100k+', label: 'Above Rs. 1,00,000' },
];

const carOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

const TestDrivePage = () => {
  return (
    <main className="relative -mt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111] rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-12 border border-white/10">

          {/* Left Column: Form */}
          <div className="p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-3xl font-black text-white uppercase">Schedule a Test Drive</h2>
            <p className="mt-2 text-sm text-gray-400">Fill out the form below and we'll get in touch with you shortly.</p>
            
            <form action="#" method="POST" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* --- Section 1: Test Drive Details --- */}
              <FormSection number={1} title="Test Drive Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <SelectField id="location" label="Test drive location" options={locations} placeholder="Select a location" required />
                  <SelectField id="model" label="Preferred model" options={models} placeholder="Select one model" required />
                  
                  {/* Date and Time Selection */}
                  <div>
                    <label htmlFor="test-drive-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred date *</label>
                    <input type="date" id="test-drive-date" name="test-drive-date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
                  </div>
                  <SelectField id="time" label="Preferred time" options={timeSlots} placeholder="Select a time slot" required />
                </div>
              </FormSection>

              {/* --- Section 2: Personal Information --- */}
              <FormSection number={2} title="Personal Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <InputField id="first-name" label="First name" required />
                    <InputField id="last-name" label="Last name" required />
                    <PhoneField id="phone" label="Phone number" placeholder="98XXXXXXXX" required/>
                    <InputField id="email" label="Email address" type="email" required />
                    <InputField id="licence" label="Licence number" placeholder="Enter your licence number" />
                    <SelectField id="salary" label="Owner's monthly salary" options={salaryRanges} placeholder="Select a range" />
                    <RadioGroup label="Do you own an existing car?" name="existing-car" options={carOptions} className="sm:col-span-2" />
                </div>
              </FormSection>

              {/* --- Section 3: Consent --- */}
              <FormSection number={3} title="Consent and Submission">
                <div className="space-y-5">
                    <CheckboxField 
                        id="privacy-consent" 
                        label={<>By submitting, I confirm that all information is true and I have read and understood the <a href="#" className="font-medium text-indigo-600 hover:underline">Privacy Policy</a>.</>}
                        required
                    />
                    <CheckboxField 
                        id="marketing-consent" 
                        label="I would like to receive marketing information about goods and services."
                    />
                </div>
              </FormSection>

              {/* --- Submit Button --- */}
              <div className="sm:col-span-2 pt-6">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  SUBMIT
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Contact Info & Map */}
            <div className="p-6 sm:p-10 lg:col-span-5 bg-[#0d0d0d] lg:rounded-r-2xl">
            <h2 className="text-3xl font-bold text-white">Why Test Drive With Us?</h2>
            <p className="mt-4 text-base text-gray-300">
                Experience the future of urban mobility firsthand. Our team is ready to guide you through the features and answer all your questions.
            </p>
            <dl className="mt-10 space-y-8">
              {/* Info Points */}
              <div className="flex items-start">
                  <dt><Phone className="h-6 w-6 text-indigo-600"/></dt>
                  <dd className="ml-3 text-base text-gray-300"><strong className="block font-semibold text-white">Expert Guidance</strong>Our specialists will be on hand to assist you.</dd>
              </div>
              <div className="flex items-start">
                  <dt><Mail className="h-6 w-6 text-indigo-600"/></dt>
                  <dd className="ml-3 text-base text-gray-300"><strong className="block font-semibold text-white">Easy Scheduling</strong>Book your preferred slot online with ease.</dd>
              </div>
              <div className="flex items-start">
                  <dt><MapPin className="h-6 w-6 text-indigo-600"/></dt>
                  <dd className="ml-3 text-base text-gray-300"><strong className="block font-semibold text-white">Convenient Locations</strong>Find a test drive center near you.</dd>
              </div>
            </dl>
            <div className="mt-10">
                <img src="https://images.unsplash.com/photo-1722661653975-81098e921544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5lcGFsJTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D" alt="car" className="rounded-lg shadow-md object-cover w-full h-64 border border-white/10" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default TestDrivePage;
