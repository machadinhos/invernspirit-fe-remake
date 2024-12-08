import { BE_HOST, BE_ID_KEY, BE_ID_VALUE, BE_SECRET_KEY, BE_SECRET_VALUE } from '$env/static/private';
import { prepareGetAllCollections, prepareGetCollectionById } from './client/endpoints/collections';
import { prepareGetAllProducts, prepareGetProductById } from './client/endpoints/products';

const headers = {
  [BE_ID_KEY]: BE_ID_VALUE,
  [BE_SECRET_KEY]: BE_SECRET_VALUE,
};

const context = {
  host: BE_HOST,
  headers,
};

export const beClient = {
  getAllProducts: prepareGetAllProducts(context),
  getProductById: prepareGetProductById(context),
  getAllCollections: prepareGetAllCollections(context),
  getCollectionById: prepareGetCollectionById(context),
};
