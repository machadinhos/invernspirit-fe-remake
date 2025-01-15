import { beClient } from '$service-server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  return beClient.getProductById(params.id, params.country);
};
