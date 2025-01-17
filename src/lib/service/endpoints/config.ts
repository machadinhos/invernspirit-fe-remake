import { Client, type RequestHostContext } from '$lib/service/client';

const ENDPOINT = 'config';

interface ConfigRequestBody {
  country?: string;
  userVersion?: number;
}

export function prepareConfig(context: RequestHostContext) {
  const method = 'POST';
  return async function (body: ConfigRequestBody, countryCode: string): Promise<never> {
    const client = new Client<never, ConfigRequestBody>({
      ...context,
      endpoint: `/${countryCode}/${ENDPOINT}`,
      method,
    });
    return await client.withBody(body).call();
  };
}
