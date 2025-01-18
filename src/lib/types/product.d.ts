import type { Image } from '$types';

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  collection: { id: string; name: string };
  grossPrice: number;
  netPrice: number;
  images: Image[];
}

export interface StockBucket {
  data: number;
}
