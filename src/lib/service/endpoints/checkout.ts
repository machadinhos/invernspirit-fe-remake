import type { Checkout, ProductIdAndQuantity } from '$types';
import { Client, type RequestHostContext } from '$lib/service/client';
import type { countries } from '$constants';

const ENDPOINT = '/checkout';

interface CheckoutRequestBody {
  products: ProductIdAndQuantity[];
  countryCode: (typeof countries)[number];
}

export function prepareCheckout(context: RequestHostContext) {
  const method = 'POST';
  return async (body: CheckoutRequestBody): Promise<{ checkout: Checkout }> => {
    const client = new Client<Checkout, CheckoutRequestBody>({ ...context, endpoint: ENDPOINT, method });
    return { checkout: await client.withBody(body).call() };
  };
}
