import { CAR_TYPE_DATA } from "./carTypeData";
import type { CarType, InventoryCar } from "./carInventory";

export const CAR_MODEL_INVENTORY: InventoryCar[] = Object.entries(CAR_TYPE_DATA).flatMap(
  ([type, cars]) =>
    cars.map((car) => ({
      type: type as CarType,
      ...car,
      transmission: car.transmission as InventoryCar["transmission"],
    }))
);

export const CAR_MODEL_MAKES: string[] = Array.from(
  new Set(CAR_MODEL_INVENTORY.map((car) => car.make))
).sort((a, b) => a.localeCompare(b));

export const getCarModelsByMake = (make: string): string[] =>
  Array.from(
    new Set(
      CAR_MODEL_INVENTORY.filter((car) => car.make === make).map((car) => car.model)
    )
  ).sort((a, b) => a.localeCompare(b));

export const getCarYearsByMakeModel = (make: string, model: string): string[] => [
  "All years",
  ...Array.from(
    new Set(
      CAR_MODEL_INVENTORY.filter((car) => car.make === make && car.model === model).map(
        (car) => String(car.year)
      )
    )
  ).sort((a, b) => Number(b) - Number(a)),
];

export const DEFAULT_CAR_MAKE: string = CAR_MODEL_MAKES[0] ?? "";
export const DEFAULT_CAR_MODEL: string = DEFAULT_CAR_MAKE
  ? getCarModelsByMake(DEFAULT_CAR_MAKE)[0] ?? ""
  : "";
