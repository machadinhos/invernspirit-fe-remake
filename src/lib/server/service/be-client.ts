import { BE_HOST, BE_ID_KEY, BE_ID_VALUE, BE_SECRET_KEY, BE_SECRET_VALUE } from '$env/static/private';
import {
  prepareConfig,
  prepareGetAllCollections,
  prepareGetAllProducts,
  prepareGetCart,
  prepareGetCollectionById,
  prepareGetCountries,
  prepareGetOrderById,
  prepareGetProductById,
} from '$lib/service/endpoints';
import type { RequestHostContext } from '$lib/service/client/client';

const headers = {
  [BE_ID_KEY]: BE_ID_VALUE,
  [BE_SECRET_KEY]: BE_SECRET_VALUE,
};

const context: RequestHostContext = {
  headers,
  host: BE_HOST,
};

export const beClient = {
  config: prepareConfig(context),
  getAllCollections: prepareGetAllCollections(context),
  getAllProducts: prepareGetAllProducts(context),
  getCart: prepareGetCart(context),
  getCollectionById: prepareGetCollectionById(context),
  getCountries: prepareGetCountries(context),
  getOrderById: prepareGetOrderById(context),
  getProductById: prepareGetProductById(context),
};
