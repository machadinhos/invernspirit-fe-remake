import { Client, type RequestHostContext } from '$lib/service/client';
import type { Order } from '$types';

const ENDPOINT = 'orders';

export function prepareGetOrderById(context: RequestHostContext) {
  const method = 'GET';
  return async function (id: string, countryCode: string): Promise<Order> {
    const client = new Client<Order>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.withPathParams([id]).call();
  };
}
