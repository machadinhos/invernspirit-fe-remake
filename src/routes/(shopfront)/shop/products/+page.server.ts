import { beClient } from '$service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return await beClient.getAllProducts();
};
