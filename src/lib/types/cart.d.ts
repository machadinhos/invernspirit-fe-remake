import type { LineItem } from '$lib/types/line-item';

export interface Cart {
  cart: { products: LineItem[] };
}

export interface ProductIdAndQuantity {
  id: string;
  quantity: number;
}
