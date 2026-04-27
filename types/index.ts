
export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownFieldProps {
  label: string;
  options: DropdownOption[];
  placeholder: string;
  id: string;
}


export enum CarTabs{
    suv="SUV",
    hatchback="Hatchback",
    sedan="Sedan",
    muv="MUV",
    luxury="Luxury"
}

export type ExchangeEVDataDetail={
 fullName: string;
  email: string;
  phone: number;
  city: string;
  vehicleModel: string;
  vehicleType: string;
  makeYear: number;
  vehicleColor: string;
  kmDriven: number;
  expectedValuation: number;
  features: string;
  fuelType: string;
  condition: string;
  accidents: string;
  accidentInfo?: string;
  transmission: string;
  newVehicleBrand: string;
  newVehicleModel: string;
  newVehiclePriceRange: string;
  downpayment: number;
  finance: string;
  additionalInfo?: string;
}

export type ExchangeEVSubmitForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleModel: string;
  vehicleBrand: string;
  vehicleType: string;
  makeYear: string;
  vehicleColor: string;
  kmDriven: string;
  expectedValuation: string;
  features: string;
  fuelType: string;
  condition: string;
  accidents: string;
  accidentInfo?: string;
  transmission: string;
  newVehicleBrand: string;
  newVehicleModel: string;
  newVehiclePriceRange: string;
  downpayment: string;
  finance: string;
  additionalInfo?: string;
  vehicleDocument?: File | null;
  vehiclePhoto?: File | null;
};
