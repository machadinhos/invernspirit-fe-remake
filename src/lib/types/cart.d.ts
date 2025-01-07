import type { LineItem } from '$lib/types/line-item';

export interface Cart {
  products: LineItem[];
}

export interface ProductIdAndQuantity {
  id: string;
  quantity: number;
}
