export type EvNewArrivalSeed = {
  label: string;
  priceText: string;
  href?: string;
  sortOrder: number;
  imagePath: string;
};

export const evNewArrivalSeeds: EvNewArrivalSeed[] = [
  { label: 'BYD Atto 3', priceText: 'Starting from Rs. 55,00,000', href: '/cars', sortOrder: 1, imagePath: 'news/byd-atto-3.jpg' },
  { label: 'Tata Curvv EV', priceText: 'Expected Rs. 60,00,000+', href: '/cars', sortOrder: 2, imagePath: 'compareVehicleImage/Tata-Curvv-EV.png' },
  { label: 'Hyundai Kona Electric', priceText: 'Starting from Rs. 58,00,000', href: '/cars', sortOrder: 3, imagePath: 'compareVehicleImage/Hyundai-Kona-Electric.png' },
  { label: 'Proton eMas 7', priceText: 'Expected Rs. 45,00,000+', href: '/cars', sortOrder: 4, imagePath: 'compareVehicleImage/proton-eMas-7.png' },
  { label: 'Maxus eTerron 9', priceText: 'Expected Rs. 80,00,000+', href: '/cars', sortOrder: 5, imagePath: 'compareVehicleImage/Maxus-eTerron-9.png' },
  { label: 'BYD (News)', priceText: 'Latest updates', href: '/blogs/atto3', sortOrder: 6, imagePath: 'news/byd-atto-4.jpg' },
  { label: 'Tata Nexon (News)', priceText: 'New facelift details', href: '/blogs/tata-nexon', sortOrder: 7, imagePath: 'news/Tata-Nexon-Headlift.jpg' },
  { label: 'Suzuki Fronx (News)', priceText: 'First drive', href: '/blogs/firstDrive', sortOrder: 8, imagePath: 'news/Suzuki-Fronx.jpg' },
  { label: 'Vehicle Tax (News)', priceText: 'Policy updates', href: '/blogs/tax', sortOrder: 9, imagePath: 'news/vehicle-tax-revision.jpg' },
  { label: 'Genesis vs Toyota (News)', priceText: 'Comparison', href: '/blogs/compare', sortOrder: 10, imagePath: 'news/toyotavsgenesis.jpg' },
  { label: 'Corvette (News)', priceText: 'Performance spotlight', href: '/blogs/corvette', sortOrder: 11, imagePath: 'news/corvette.jpg' },
  { label: 'Genesis (News)', priceText: 'Premium update', href: '/blogs/genesis', sortOrder: 12, imagePath: 'news/genesis.jpg' },
];
