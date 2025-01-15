import { Client, type RequestHostContext } from '$lib/service/client';
import type { Product } from '$types';

const ENDPOINT = 'products';

export function prepareGetAllProducts(context: RequestHostContext) {
  const method = 'GET';
  return async (countryCode: string): Promise<{ products: Product[] }> => {
    const client = new Client<Product[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return { products: await client.call() };
  };
}

export function prepareGetProductById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string, countryCode: string): Promise<{ product: Product }> => {
    const client = new Client<Product>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return { product: await client.withPathParams([id]).call() };
  };
}

export function prepareGetProductsBySearch(context: RequestHostContext) {
  const method = 'GET';
  return async (search: string, countryCode: string): Promise<{ products: Product[] }> => {
    const client = new Client<Product[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return { products: await client.withQueryParams({ search }).call() };
  };
}
