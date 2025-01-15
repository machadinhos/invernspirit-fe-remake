import { Client, type RequestHostContext } from '$lib/service/client';
import type { Country } from '$types';

const ENDPOINT = '';

export function prepareGetCountries(context: RequestHostContext) {
  const method = 'GET';
  return async (): Promise<{ countries: Country[] }> => {
    const client = new Client<Country[]>({ ...context, endpoint: `/${ENDPOINT}`, method });
    return { countries: await client.call() };
  };
}
