import { BFF_HOST } from '$env/static/private';
import { prepareGetProductsBySearch } from './client/endpoints/products';

const context = {
  host: BFF_HOST,
};

export const bffClient = {
  getProductsBySearch: prepareGetProductsBySearch(context),
};
