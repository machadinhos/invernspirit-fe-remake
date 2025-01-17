import type { Address } from '$lib/types/address';
import type { Product } from '$lib/types/product';

export interface Order {
  createdAt: string;
  snapshot: null;
  products: Product[];
  payment: {
    createdAt: string;
    type: string;
    state: string;
    netAmount: number;
    grossAmount: number;
  };
  address: Address;
}
