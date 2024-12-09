import type { Image } from '$lib/types/image';
import type { Product } from '$lib/types/product';

interface BaseCollection {
  collectionId: string;
  collectionName: string;
  description: string;
}

export interface Collection extends BaseCollection {
  images: Image;
}

export interface CollectionDetails extends BaseCollection {
  products: Product[];
}
