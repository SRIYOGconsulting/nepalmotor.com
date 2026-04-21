export type CarType =
  | "SUV"
  | "Ute"
  | "Hatch"
  | "Sedan"
  | "Van"
  | "Coupe"
  | "Wagon"
  | "People_Mover";

export type InventoryCar = {
  type: CarType;
  imageUrl: string;
  year: number;
  make: string;
  model: string;
  variant: string;
  mileage: number;
  transmission: "Automatic" | "Manual";
  price: number;
};

export const CAR_INVENTORY: InventoryCar[] = [
  { type: "Hatch", imageUrl: "/carTabsImage/hatchback/maruti_suzuki_swift.png", year: 2020, make: "Suzuki", model: "Swift", variant: "GL", mileage: 68500, transmission: "Manual", price: 2290000 },
  { type: "Hatch", imageUrl: "/carTabsImage/hatchback/maruti_suzuki_baleno.png", year: 2021, make: "Suzuki", model: "Swift", variant: "ZXI+", mileage: 42500, transmission: "Manual", price: 2650000 },
  { type: "Hatch", imageUrl: "/carTabsImage/hatchback/tata_altroz.png", year: 2022, make: "Suzuki", model: "Swift", variant: "VXI AMT", mileage: 31200, transmission: "Automatic", price: 2875000 },
  { type: "Hatch", imageUrl: "/carTabsImage/hatchback/hyundai_i20.png", year: 2023, make: "Suzuki", model: "Swift", variant: "ZXI+ Dual Tone", mileage: 14800, transmission: "Automatic", price: 3190000 },
  { type: "SUV", imageUrl: "/carTypeImage/suzuki-brezza.png", year: 2021, make: "Suzuki", model: "Brezza", variant: "VXi", mileage: 56400, transmission: "Manual", price: 3590000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/hyundai_creta.png", year: 2022, make: "Suzuki", model: "Brezza", variant: "ZXi AT", mileage: 38200, transmission: "Automatic", price: 3990000 },
  { type: "SUV", imageUrl: "/carTypeImage/suzuki-brezza.png", year: 2023, make: "Suzuki", model: "Brezza", variant: "VXi Smart Hybrid", mileage: 14600, transmission: "Automatic", price: 4150000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/mahindra_scorpio_N.png", year: 2024, make: "Suzuki", model: "Brezza", variant: "ZXi+ AT", mileage: 6200, transmission: "Automatic", price: 4590000 },
  { type: "Hatch", imageUrl: "/carTypeImage/hyundai-i22.png", year: 2022, make: "Hyundai", model: "i20", variant: "Asta (O)", mileage: 28150, transmission: "Automatic", price: 3490000 },
  { type: "Hatch", imageUrl: "/carTypeImage/hyundai-i30-hatch.png", year: 2021, make: "Hyundai", model: "i20", variant: "Sportz", mileage: 41900, transmission: "Manual", price: 2990000 },
  { type: "Hatch", imageUrl: "/carTypeImage/mazda-cx30-hatch.png", year: 2020, make: "Hyundai", model: "i20", variant: "Magna", mileage: 61200, transmission: "Manual", price: 2650000 },
  { type: "Hatch", imageUrl: "/carTypeImage/subaru-impreza-hatch.png", year: 2023, make: "Hyundai", model: "i20", variant: "Asta (O) DCT", mileage: 12900, transmission: "Automatic", price: 3790000 },
  { type: "SUV", imageUrl: "/carTypeImage/hyundai-creta.png", year: 2021, make: "Hyundai", model: "Creta", variant: "SX (O)", mileage: 35940, transmission: "Automatic", price: 4590000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/image.png", year: 2020, make: "Hyundai", model: "Creta", variant: "S", mileage: 74100, transmission: "Manual", price: 3790000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/image-1.png", year: 2022, make: "Hyundai", model: "Creta", variant: "SX", mileage: 31200, transmission: "Automatic", price: 4890000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/image-2.png", year: 2023, make: "Hyundai", model: "Creta", variant: "SX (O) Knight", mileage: 11800, transmission: "Automatic", price: 5350000 },
  { type: "SUV", imageUrl: "/carTabsImage/suv/image-3.png", year: 2024, make: "Hyundai", model: "Creta", variant: "SX (O) IVT", mileage: 5400, transmission: "Automatic", price: 5690000 },
  { type: "SUV", imageUrl: "/carTypeImage/tata-nexon-ev.png", year: 2021, make: "Tata", model: "Nexon EV", variant: "XM", mileage: 38400, transmission: "Automatic", price: 3250000 },
  { type: "SUV", imageUrl: "/carTypeImage/tata-nexon-ev.png", year: 2022, make: "Tata", model: "Nexon EV", variant: "XZ+ Lux (Prime)", mileage: 21800, transmission: "Automatic", price: 3875000 },
  { type: "SUV", imageUrl: "/carTypeImage/ford-transit-van.png", year: 2023, make: "Tata", model: "Nexon EV", variant: "Fearless+", mileage: 13200, transmission: "Automatic", price: 4290000 },
  { type: "SUV", imageUrl: "/carTypeImage/ford-endeavour.png", year: 2024, make: "Tata", model: "Nexon EV", variant: "Empowered+ LR", mileage: 5100, transmission: "Automatic", price: 4790000 },
  { type: "SUV", imageUrl: "/carTypeImage/kia-seltos.png", year: 2020, make: "Kia", model: "Seltos", variant: "HTK+", mileage: 79200, transmission: "Manual", price: 3490000 },
  { type: "SUV", imageUrl: "/carTypeImage/kia-seltos.png", year: 2022, make: "Kia", model: "Seltos", variant: "HTX+", mileage: 31200, transmission: "Automatic", price: 4850000 },
  { type: "SUV", imageUrl: "/carTypeImage/ford.png", year: 2023, make: "Kia", model: "Seltos", variant: "GTX+", mileage: 14600, transmission: "Automatic", price: 5590000 },
  { type: "SUV", imageUrl: "/carTypeImage/subaru-outback-wagon.png", year: 2024, make: "Kia", model: "Seltos", variant: "X-Line", mileage: 5800, transmission: "Automatic", price: 6150000 },
  { type: "SUV", imageUrl: "/carTypeImage/byd-atto-3.png", year: 2023, make: "BYD", model: "Atto 3", variant: "Superior", mileage: 11500, transmission: "Automatic", price: 5500000 },
  { type: "SUV", imageUrl: "/carTypeImage/mercedes-vclass-mover.png", year: 2022, make: "BYD", model: "Atto 3", variant: "Dynamic", mileage: 22600, transmission: "Automatic", price: 4990000 },
  { type: "SUV", imageUrl: "/carTypeImage/honda-odyssey-mover.png", year: 2024, make: "BYD", model: "Atto 3", variant: "Superior (Facelift)", mileage: 4200, transmission: "Automatic", price: 5850000 },
  { type: "SUV", imageUrl: "/carTypeImage/mahindra-xuv700.png", year: 2022, make: "Mahindra", model: "XUV700", variant: "AX7 L (AWD)", mileage: 29800, transmission: "Automatic", price: 7900000 },
  { type: "SUV", imageUrl: "/carTypeImage/kia-carnival-mover.png", year: 2021, make: "Mahindra", model: "XUV700", variant: "AX5", mileage: 51400, transmission: "Manual", price: 6590000 },
  { type: "SUV", imageUrl: "/carTypeImage/hyundai-staria-mover.png", year: 2023, make: "Mahindra", model: "XUV700", variant: "AX7", mileage: 15600, transmission: "Automatic", price: 8150000 },
  { type: "SUV", imageUrl: "/carTypeImage/toyota-hiace-van.png", year: 2024, make: "Mahindra", model: "XUV700", variant: "AX7 L (AWD) Ebony", mileage: 6200, transmission: "Automatic", price: 8890000 },
];
