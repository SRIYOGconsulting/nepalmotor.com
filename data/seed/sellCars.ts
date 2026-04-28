export const sellCarSeeds: Array<{
  vehicleBrand?: string;
  vehicleModel: string;
  vehicleType: string;
  makeYear: string;
  vehicleColor: string;
  kmDriven: string;
  expectedValuation?: string;
  features: string;
  fuelType: string;
  condition: string;
  accidents: string;
  accidentInfo?: string;
  transmission: string;
  additionalInfo?: string;
  photoPaths: string[];
  documentPath?: string;
}> = [
  {
    vehicleBrand: 'Toyota',
    vehicleModel: 'Corolla',
    vehicleType: 'Sedan',
    makeYear: '2019',
    vehicleColor: 'White',
    kmDriven: '45000',
    expectedValuation: 'NPR 35,00,000',
    features: 'Airbags, ABS, Reverse Camera',
    fuelType: 'Petrol',
    condition: 'Good',
    accidents: 'No',
    transmission: 'Automatic',
    photoPaths: ['carTypeImage/honda-accord-sedan.png', 'carTypeImage/hyundai-i20.jpg', 'carTypeImage/mercedes-c300-sedan.png'],
    documentPath: 'hero-car-image.jpg',
  },
  {
    vehicleBrand: 'Hyundai',
    vehicleModel: 'Creta',
    vehicleType: 'SUV',
    makeYear: '2020',
    vehicleColor: 'Silver',
    kmDriven: '32000',
    expectedValuation: 'NPR 55,00,000',
    features: 'Sunroof, Cruise Control, LED Headlights',
    fuelType: 'Diesel',
    condition: 'Very Good',
    accidents: 'No',
    transmission: 'Automatic',
    photoPaths: ['carTypeImage/hyundai-creta.png', 'carTypeImage/mahindra-xuv700.png'],
    documentPath: 'hero-car-image1.jpg',
  },
  {
    vehicleBrand: 'BMW',
    vehicleModel: 'M2 Coupe',
    vehicleType: 'Coupe',
    makeYear: '2018',
    vehicleColor: 'Black',
    kmDriven: '28000',
    expectedValuation: 'NPR 95,00,000',
    features: 'Sport Mode, Leather Seats',
    fuelType: 'Petrol',
    condition: 'Excellent',
    accidents: 'No',
    transmission: 'Automatic',
    photoPaths: ['carTypeImage/bmw-m2-coupe.png'],
    documentPath: 'hero-car-image2.jpg',
  },
];

