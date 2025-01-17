import { beClientProxy } from '@utils';
import { Env } from '@types';

export const onRequest: PagesFunction<Env> = ({ request, env }) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  return beClientProxy(request, ['POST'], env);
};
