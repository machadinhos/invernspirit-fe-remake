import { BE_HOST, BE_ID_KEY, BE_ID_VALUE, BE_SECRET_KEY, BE_SECRET_VALUE } from '$env/static/private';
import {
  prepareConfig,
  prepareGetAllCollections,
  prepareGetAllProducts,
  prepareGetCart,
  prepareGetCollectionById,
  prepareGetCountries,
  prepareGetProductById,
} from '$lib/service/endpoints';
import type { RequestHostContext } from '$lib/service/client/client';

const headers = {
  [BE_ID_KEY]: BE_ID_VALUE,
  [BE_SECRET_KEY]: BE_SECRET_VALUE,
};

const context: RequestHostContext = {
  headers,
  host: BE_HOST,
};

export const beClient = {
  config: prepareConfig(context),
  getAllCollections: prepareGetAllCollections(context),
  getAllProducts: prepareGetAllProducts(context),
  getCart: prepareGetCart(context),
  getCollectionById: prepareGetCollectionById(context),
  getCountries: prepareGetCountries(context),
  getProductById: prepareGetProductById(context),
};

export async function beClientProxy(
  request: Request,
  requiredHeaderData: { platform: App.Platform | undefined },
  additionalHeaders: Record<string, string> = {},
  filterFunction?: (request: Request) => Response | undefined,
): Promise<Response> {
  const errorResponse = filterFunction?.(request);
  if (errorResponse) return errorResponse;
  if (!requiredHeaderData.platform) throw new Error('platform is not defined');

  const url = new URL(request.url);
  const bePathname = url.pathname.replace(/^\/api/, '');
  const backendUrl = BE_HOST + bePathname + url.search;

  const requestHeaders = new Headers(request.headers);
  const requiredHeaders = { country: requiredHeaderData.platform.cf.country, ...headers };
  Object.entries({ ...requiredHeaders, ...additionalHeaders }).forEach(([key, value]) => {
    requestHeaders.set(key, value);
  });
  deleteUnwantedHeaders(requestHeaders, ['content-length']);

  const hasBody = request.method !== 'GET' && request.method !== 'DELETE';

  const beRequest: RequestInit = {
    ...(hasBody && { body: JSON.stringify(await request.json()) }),
    headers: requestHeaders,
    method: request.method,
  };

  const beResponse = await fetch(backendUrl, beRequest);

  const responseHeaders = new Headers(beResponse.headers);
  deleteUnwantedHeaders(responseHeaders, ['content-encoding', 'transfer-encoding', 'content-length']);

  return new Response(JSON.stringify(await beResponse.json()), {
    status: beResponse.status,
    headers: responseHeaders,
  });
}

function deleteUnwantedHeaders(headers: Headers, headersToDelete: string[]) {
  headersToDelete.forEach((header) => headers.delete(header));
}
