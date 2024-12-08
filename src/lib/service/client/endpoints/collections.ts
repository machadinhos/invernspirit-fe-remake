import { Client, type RequestHostContext } from '../client';

const ENDPOINT = '/collections';

export function prepareGetAllCollections(context: RequestHostContext) {
  const method = 'GET';
  return async () => {
    const client = new Client({ ...context, endpoint: ENDPOINT, method });
    return await client.call();
  };
}

export function prepareGetCollectionById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string) => {
    const client = new Client({ ...context, endpoint: ENDPOINT, method });
    return await client.withPathParams([id]).call();
  };
}
