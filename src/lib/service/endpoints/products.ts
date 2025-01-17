import { Client, type RequestHostContext } from '$lib/service/client';
import type { Product } from '$types';

const ENDPOINT = 'products';

export function prepareGetAllProducts(context: RequestHostContext) {
  const method = 'GET';
  return async function (countryCode: string): Promise<Product[]> {
    const client = new Client<Product[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.call();
  };
}

export function prepareGetProductById(context: RequestHostContext) {
  const method = 'GET';
  return async function (id: string, countryCode: string): Promise<Product> {
    const client = new Client<Product>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.withPathParams([id]).call();
  };
}

export function prepareGetProductsBySearch(context: RequestHostContext) {
  const method = 'GET';
  return async function (search: string, countryCode: string): Promise<Product[]> {
    const client = new Client<Product[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.withQueryParams({ search }).call();
  };
}
