import type { Checkout, ProductIdAndQuantity } from '$types';
import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = 'checkout';

interface CheckoutRequestBody {
  products: ProductIdAndQuantity[];
  countryCode: string;
}

export function prepareCheckout(context: RequestHostContext) {
  const method = 'POST';
  return async (body: CheckoutRequestBody, countryCode: string): Promise<{ checkout: Checkout }> => {
    const client = new Client<Checkout, CheckoutRequestBody>({
      ...context,
      endpoint: `/${countryCode}/${ENDPOINT}`,
      method,
    });
    return { checkout: await client.withBody(body).call() };
  };
}
