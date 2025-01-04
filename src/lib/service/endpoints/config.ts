import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = '/config';

interface ConfigRequestBody {
  country?: string;
  userVersion?: number;
}

export function prepareConfig(context: RequestHostContext) {
  const method = 'POST';
  return async (body: ConfigRequestBody): Promise<{ config: never }> => {
    const client = new Client<never, ConfigRequestBody>({ ...context, endpoint: ENDPOINT, method });
    return { config: await client.withBody(body).call() };
  };
}
