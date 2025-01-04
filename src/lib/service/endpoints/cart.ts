import type { Cart, ProductIdAndQuantity } from '$types';
import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = '/cart';

export function prepareGetCart(context: RequestHostContext) {
  const method = 'POST';
  return async (products: ProductIdAndQuantity[]): Promise<{ cart: Cart }> => {
    const client = new Client<Cart, ProductIdAndQuantity[]>({ ...context, endpoint: ENDPOINT, method });
    return { cart: await client.withBody(products).withHeaders({ action: 'get' }).call() };
  };
}
