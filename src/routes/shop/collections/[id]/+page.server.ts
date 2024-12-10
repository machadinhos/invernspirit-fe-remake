import { beClient } from '$service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return await beClient.getCollectionById(params.id);
};
