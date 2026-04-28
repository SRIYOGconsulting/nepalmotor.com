export const exchangeEvSeeds: Array<{
  user: { fullName: string; email: string; phone: string; city: string };
  sellCar: {
    vehicleBrand?: string;
    vehicleModel: string;
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
    additionalInfo?: string;
    photoPath: string;
    documentPath: string;
  };
  exchange: {
    newVehicleBrand: string;
    newVehicleModel: string;
    newVehiclePriceRange: string;
    downPayment: string;
    finance: string;
    additionalInfo?: string;
  };
}> = [
  {
    user: { fullName: '__seed__ User One', email: 'seed.user1@example.com', phone: '5550000001', city: 'Kathmandu' },
    sellCar: {
      vehicleBrand: 'Honda',
      vehicleModel: 'City',
      vehicleType: 'Sedan',
      makeYear: '2017',
      vehicleColor: 'Red',
      kmDriven: '60000',
      expectedValuation: 'NPR 28,00,000',
      features: 'ABS, Airbags',
      fuelType: 'Petrol',
      condition: 'Good',
      accidents: 'No',
      transmission: 'Manual',
      photoPath: 'carTypeImage/honda-accord-sedan.png',
      documentPath: 'hero-car-image.jpg',
    },
    exchange: {
      newVehicleBrand: 'BYD',
      newVehicleModel: 'Atto 3',
      newVehiclePriceRange: 'NPR 55L - 65L',
      downPayment: 'NPR 10L',
      finance: 'Yes',
    },
  },
  {
    user: { fullName: '__seed__ User Two', email: 'seed.user2@example.com', phone: '5550000002', city: 'Pokhara' },
    sellCar: {
      vehicleBrand: 'Suzuki',
      vehicleModel: 'Swift',
      vehicleType: 'Hatchback',
      makeYear: '2016',
      vehicleColor: 'Blue',
      kmDriven: '72000',
      expectedValuation: 'NPR 18,50,000',
      features: 'AC, Power Steering',
      fuelType: 'Petrol',
      condition: 'Fair',
      accidents: 'Yes',
      accidentInfo: 'Minor rear bumper repaired.',
      transmission: 'Manual',
      photoPath: 'carTypeImage/vw-golf-hatch.png',
      documentPath: 'hero-car-image1.jpg',
    },
    exchange: {
      newVehicleBrand: 'Tata',
      newVehicleModel: 'Nexon EV',
      newVehiclePriceRange: 'NPR 40L - 50L',
      downPayment: 'NPR 8L',
      finance: 'Yes',
      additionalInfo: 'Looking for quick approval.',
    },
  },
];

