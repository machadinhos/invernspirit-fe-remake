import { beClientProxy } from '$service-server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ request, platform }) => {
  return beClientProxy(request, { platform });
};
