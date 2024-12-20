import { beClient } from '$service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return await beClient.getProductById(params.id);
};
