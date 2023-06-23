export enum FilterType {
  brand = 'brand',
  amount = 'amount',
  price = 'price'
}

export interface FilterBrand {
  type: FilterType.brand;
  data: { name: string; value: string }[];
}

export interface FilterAmount {
  type: FilterType.amount;
  data: { from: number; to: number };
}

export interface FilterPrice {
  type: FilterType.price;
  data: { from: number; to: number; currency: string };
}

export interface FilterGeneral {
  name: string;
}

export type FiltersSet = FilterGeneral &
  (FilterBrand | FilterAmount | FilterPrice);

export type FiltersDataTypes =
  | FilterBrand['data']
  | FilterAmount['data']
  | FilterPrice['data'];
