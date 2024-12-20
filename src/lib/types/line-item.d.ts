import type { Product } from '$types';

export interface LineItem extends Product {
  quantity: number;
}
