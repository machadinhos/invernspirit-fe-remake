import type { Image, Product } from '$types';

interface BaseCollection {
  id: string;
  name: string;
  description: string;
}

export interface Collection extends BaseCollection {
  image: Image;
}

export interface CollectionDetails extends BaseCollection {
  products: Product[];
}
