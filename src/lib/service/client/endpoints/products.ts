import { Client, type RequestHostContext } from '../client';
import type { Product } from '$types';

const ENDPOINT = '/products';

export function prepareGetAllProducts(context: RequestHostContext) {
  const method = 'GET';
  return async (): Promise<{ products: Product[] }> => {
    const client = new Client<Product[]>({ ...context, endpoint: ENDPOINT, method });
    return { products: await client.call() };
  };
}

export function prepareGetProductById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string): Promise<{ product: Product }> => {
    const client = new Client<Product>({ ...context, endpoint: ENDPOINT, method });
    return { product: await client.withPathParams([id]).call() };
  };
}

export function prepareGetProductsBySearch(context: RequestHostContext) {
  const method = 'GET';
  return async (search: string): Promise<{ products: Product[] }> => {
    const client = new Client<Product[]>({ ...context, endpoint: ENDPOINT, method });
    return { products: await client.withQueryParams({ search }).call() };
  };
}
