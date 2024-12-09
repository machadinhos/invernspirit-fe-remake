import type { Image } from '$lib/types/image';

export interface Product {
  productId: string;
  productName: string;
  description: string;
  stock: number;
  collectionId: string;
  priceInCents: number;
  images: Image[];
}
