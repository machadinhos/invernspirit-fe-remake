import type { Address } from '$lib/types/address';
import type { Product } from '$lib/types/product';

export interface Order {
  id: string;
  createdAt: string;
  snapshot: null;
  products: Product[];
  payment: {
    createdAt: string;
    type: 'draft' | 'card' | 'paypal';
    state: 'draft' | 'succeeded' | 'canceled' | 'created' | 'processing' | 'failed';
    netAmount: number;
    grossAmount: number;
  };
  address: Address;
}
