import { prepareConfig, prepareGetCart, prepareGetProductsBySearch } from '$lib/service/endpoints';
import { PUBLIC_BFF_HOST } from '$env/static/public';
import type { RequestHostContext } from '$lib/service/client/client';

const context: RequestHostContext = {
  host: PUBLIC_BFF_HOST,
};

export const bffClient = {
  config: prepareConfig(context),
  getCart: prepareGetCart(context),
  getProductsBySearch: prepareGetProductsBySearch(context),
};
