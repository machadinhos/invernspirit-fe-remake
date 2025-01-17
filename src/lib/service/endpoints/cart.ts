import type { Cart, ProductIdAndQuantity } from '$types';
import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = 'cart';

export function prepareGetCart(context: RequestHostContext) {
  const method = 'POST';
  return async function (products: ProductIdAndQuantity[], countryCode: string): Promise<Cart> {
    const client = new Client<Cart, ProductIdAndQuantity[]>({
      ...context,
      endpoint: `/${countryCode}/${ENDPOINT}`,
      method,
    });
    return await client.withBody(products).withHeaders({ action: 'get' }).call();
  };
}
