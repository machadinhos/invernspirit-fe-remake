import { browser } from '$app/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestHostContext {
  host: string;
  headers?: Record<string, string>;
}

export interface RequestBaseContext extends RequestHostContext {
  endpoint: string;
  method: HttpMethod;
}

interface RequestContext<T = void> extends RequestBaseContext {
  pathParams?: string[];
  queryParams?: Record<string, string>;
  body?: T;
}

let globalAccessToken = '';

export function setAccessToken(accessToken: string): void {
  globalAccessToken = accessToken;
}

export function getAccessToken(): string {
  return globalAccessToken;
}

export class Client<T, K = void> {
  private readonly context: RequestContext<K>;

  constructor(context: RequestBaseContext) {
    this.context = context;
  }

  private buildUrl() {
    const { host, endpoint, pathParams, queryParams } = this.context;
    const path = pathParams ? `/${pathParams.join('/')}` : '';
    const query = queryParams
      ? `?${Object.entries(queryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')}`
      : '';
    return `${host}${endpoint}${path}${query}`;
  }

  withBody(body: K) {
    this.context.body = body;
    return this;
  }

  withHeaders(headers: RequestContext['headers']) {
    this.context.headers = { ...this.context.headers, ...headers };
    return this;
  }

  withQueryParams(queryParams: RequestContext['queryParams']) {
    this.context.queryParams = queryParams;
    return this;
  }

  withPathParams(pathParams: RequestContext['pathParams']) {
    this.context.pathParams = pathParams;
    return this;
  }

  async call(): Promise<T> {
    const headers = {
      ...this.context.headers,
      ...(globalAccessToken && { authorization: `Bearer ${globalAccessToken}` }),
      ...(this.context.body && { 'Content-Type': 'application/json' }),
    };

    const response = await fetch(this.buildUrl(), {
      headers,
      method: this.context.method,
      ...(this.context.body && { body: JSON.stringify(this.context.body) }),
    });

    if ([200, 201].includes(response.status)) {
      const { data } = await response.json();
      if (browser && data.accessToken) {
        globalAccessToken = data.accessToken;
      }
      return data;
    }

    throw new Error(`Client error: ${await response.text()}`);
  }
}
