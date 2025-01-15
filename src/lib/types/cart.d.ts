import type { LineItem } from '$lib/types/line-item';

export interface Cart {
  products: LineItem[];
  grossPrice: number;
  netPrice: number;
}

export interface ProductIdAndQuantity {
  id: string;
  quantity: number;
}
