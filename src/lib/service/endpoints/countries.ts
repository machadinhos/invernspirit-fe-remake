import { Client, type RequestHostContext } from '$lib/service/client';
import type { Country } from '$types';

const ENDPOINT = '';

let cachedCountries: Country[];

export function prepareGetCountries(context: RequestHostContext) {
  const method = 'GET';
  return async function (): Promise<Country[]> {
    if (!cachedCountries) {
      const client = new Client<Country[]>({ ...context, endpoint: `/${ENDPOINT}`, method });
      cachedCountries = await client.call();
    }
    return cachedCountries;
  };
}
