import { Client, type RequestHostContext } from '$lib/service/client';
import type { Collection, CollectionDetails } from '$types';

const ENDPOINT = 'collections';

export function prepareGetAllCollections(context: RequestHostContext) {
  const method = 'GET';
  return async (countryCode: string): Promise<{ collections: Collection[] }> => {
    const client = new Client<Collection[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return { collections: await client.call() };
  };
}

export function prepareGetCollectionById(context: RequestHostContext) {
  const method = 'GET';
  return async (id: string, countryCode: string): Promise<{ collection: CollectionDetails }> => {
    const client = new Client<CollectionDetails>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return { collection: await client.withPathParams([id]).call() };
  };
}
