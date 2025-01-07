import { beClientProxy } from '$service-server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ request, platform }) => {
  return beClientProxy(request, { platform });
};
