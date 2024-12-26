import { beClient } from '$service-server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return beClient.getAllProducts();
};
