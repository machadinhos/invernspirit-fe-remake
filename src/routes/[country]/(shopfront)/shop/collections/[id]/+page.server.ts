import { beClient } from '$service-server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return { collection: await beClient.getCollectionById(params.id, params.country) };
};
