import { beClient } from '$service-server';
import { building } from '$app/environment';
import type { Collection } from '$types';
import type { LayoutServerLoad } from './$types';

const cachedData: { [key: string]: { collections: Collection[] } } = {};

export const load: LayoutServerLoad = async ({ params }) => {
  if (building) {
    if (!cachedData[params.country]) {
      cachedData[params.country] = await beClient.getAllCollections(params.country);
    }
    return cachedData[params.country];
  }
  return beClient.getAllCollections(params.country);
};
