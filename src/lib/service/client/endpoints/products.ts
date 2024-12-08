import { Client, type RequestHostContext } from '../client';

const ENDPOINT = '/products';

export function prepareGetAllProducts(context: RequestHostContext) {
  const method = 'GET';
  return async () => {
    const client = new Client({ ...context, endpoint: ENDPOINT, method });
    return await client.call();
  };
}

export function prepareGetProductById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string) => {
    const client = new Client({ ...context, endpoint: ENDPOINT, method });
    return await client.withPathParams([id]).call();
  };
}

export function prepareGetProductsBySearch(context: RequestHostContext) {
  const method = 'GET';
  return async (search: string) => {
    const client = new Client({ ...context, endpoint: ENDPOINT, method });
    return await client.withQueryParams({ search }).call();
  };
}
