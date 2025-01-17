import {
  prepareCheckout,
  prepareConfig,
  prepareGetCart,
  prepareGetOrderById,
  prepareGetProductsBySearch,
} from '$lib/service/endpoints';
import { PUBLIC_BFF_HOST } from '$env/static/public';
import type { RequestHostContext } from '$lib/service/client/client';

const context: RequestHostContext = {
  host: PUBLIC_BFF_HOST,
};

export const bffClient = {
  checkout: prepareCheckout(context),
  config: prepareConfig(context),
  getCart: prepareGetCart(context),
  getOrderById: prepareGetOrderById(context),
  getProductsBySearch: prepareGetProductsBySearch(context),
};
