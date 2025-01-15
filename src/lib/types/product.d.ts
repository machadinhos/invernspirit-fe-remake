import type { Image } from '$types';

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  collectionId: string;
  netPrice: number;
  grossPrice: number;
  images: Image[];
}

export interface StockBucket {
  data: number;
}
