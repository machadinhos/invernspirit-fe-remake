import { Client, type RequestHostContext } from '$lib/service/client';
import type { Collection, CollectionDetails } from '$types';

const ENDPOINT = '/collections';

export function prepareGetAllCollections(context: RequestHostContext) {
  const method = 'GET';
  return async (): Promise<{ collections: Collection[] }> => {
    const client = new Client<Collection[]>({ ...context, endpoint: ENDPOINT, method });
    return { collections: await client.call() };
  };
}

export function prepareGetCollectionById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string): Promise<{ collection: CollectionDetails }> => {
    const client = new Client<CollectionDetails>({ ...context, endpoint: ENDPOINT, method });
    return { collection: await client.withPathParams([id]).call() };
  };
}
