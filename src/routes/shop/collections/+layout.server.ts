import { beClient } from '$service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  return await beClient.getAllCollections();
};
