import { beClient } from '$service-server';
import { building } from '$app/environment';
import type { Collection } from '$types';
import type { LayoutServerLoad } from './$types';

let cachedData: { collections: Collection[] };

export const load: LayoutServerLoad = async () => {
  if (building) {
    if (!cachedData) {
      cachedData = await beClient.getAllCollections();
    }
    return cachedData;
  }
  return beClient.getAllCollections();
};
