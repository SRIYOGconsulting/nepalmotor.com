import { ExchangeEVSubmitForm } from '@/types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

type ExchangeStoreState = {
  singleCarExchangeData: any | null;
  isSubmitLoading: boolean;
  isSubmitSuccess: boolean;
  isSubmitError: boolean;
  exchangeEvSubmit: (data: ExchangeEVSubmitForm) => void;
  resetSubmitSuccess: () => void;
};

export const useExchangeStore = create<ExchangeStoreState>((set) => ({
  singleCarExchangeData: null,
  isSubmitLoading: false,
  isSubmitSuccess: false,
  isSubmitError: false,
  resetSubmitSuccess: () => set({ isSubmitSuccess: false, isSubmitError: false }),
  exchangeEvSubmit: async (data) => {
    set({ isSubmitLoading: true, isSubmitSuccess: false, isSubmitError: false });
       try{
        const body = new FormData();

        body.append('fullName', data.fullName);
        body.append('email', data.email);
        body.append('phone', data.phone);
        body.append('city', data.city);
        body.append('vehicleModel', data.vehicleModel);
        body.append('vehicleBrand', data.vehicleBrand);
        body.append('vehicleType', data.vehicleType);
        body.append('makeYear', data.makeYear);
        body.append('vehicleColor', data.vehicleColor);
        body.append('kmDriven', data.kmDriven);
        body.append('expectedValuation', data.expectedValuation);
        body.append('features', data.features);
        body.append('fuelType', data.fuelType);
        body.append('condition', data.condition);
        body.append('accidents', data.accidents);
        if (data.accidentInfo) body.append('accidentInfo', data.accidentInfo);
        body.append('transmission', data.transmission);
        body.append('newVehicleBrand', data.newVehicleBrand);
        body.append('newVehicleModel', data.newVehicleModel);
        body.append('newVehiclePriceRange', data.newVehiclePriceRange);
        body.append('downpayment', data.downpayment);
        body.append('finance', data.finance);
        if (data.additionalInfo) body.append('additionalInfo', data.additionalInfo);

        if (data.vehicleDocument) body.append('vehicleDocument', data.vehicleDocument);
        if (data.vehiclePhoto) body.append('vehiclePhoto', data.vehiclePhoto);

        const response = await fetch('/api/exchange-ev', {
          method: 'POST',
          body,
        });

        const responseData = await response.json();
         if (!responseData.success) {
      toast.error(responseData.message || 'Failed to submit exchange');
      set({ isSubmitLoading: false, isSubmitError: true });
      return;
    }
        set({
        isSubmitLoading: false,
        isSubmitSuccess: true,
        singleCarExchangeData: responseData.data ,
      });
          
       } catch (error:any) {
        toast.error(error.message || 'Something went wrong');
    set({ isSubmitLoading: false, isSubmitError: true });
       }
  }
  
}));


