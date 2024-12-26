import { beClient } from '$service-server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
  return beClient.getAllCollections();
};
