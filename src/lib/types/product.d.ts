import type { Image, Taxes } from '$types';

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  collection: { id: string; name: string };
  grossPrice: number;
  netPrice: number;
  images: Image[];
  taxes: Taxes[];
}

export interface StockBucket {
  data: number;
}
