import { Client, type RequestHostContext } from '$lib/service/client';
import type { Collection, CollectionDetails } from '$types';

const ENDPOINT = 'collections';

export function prepareGetAllCollections(context: RequestHostContext) {
  const method = 'GET';
  return async function (countryCode: string): Promise<Collection[]> {
    const client = new Client<Collection[]>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.call();
  };
}

export function prepareGetCollectionById(context: RequestHostContext) {
  const method = 'GET';
  return async function (id: string, countryCode: string): Promise<CollectionDetails> {
    const client = new Client<CollectionDetails>({ ...context, endpoint: `/${countryCode}/${ENDPOINT}`, method });
    return await client.withPathParams([id]).call();
  };
}
