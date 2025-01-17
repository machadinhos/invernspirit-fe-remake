import type { Checkout, ProductIdAndQuantity } from '$types';
import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = 'checkout';

interface CheckoutRequestBody {
  products: ProductIdAndQuantity[];
}

export function prepareCheckout(context: RequestHostContext) {
  const method = 'POST';
  return async function (body: CheckoutRequestBody, countryCode: string): Promise<Checkout> {
    const client = new Client<Checkout, CheckoutRequestBody>({
      ...context,
      endpoint: `/${countryCode}/${ENDPOINT}`,
      method,
    });
    return await client.withBody(body).call();
  };
}