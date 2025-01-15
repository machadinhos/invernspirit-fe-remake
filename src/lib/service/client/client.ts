import { getAccessToken, setAccessToken } from './access-token';
import { browser } from '$app/environment';

export interface RequestHostContext {
  host: string;
  headers?: Record<string, string>;
}

export interface RequestBaseContext extends RequestHostContext {
  endpoint: string;
  method: RequestInit['method'];
}

interface RequestContext<T = void> extends RequestBaseContext {
  pathParams?: string[];
  queryParams?: Record<string, string>;
  body?: T;
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
      ...(getAccessToken() && { authorization: `Bearer ${getAccessToken()}` }),
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
        setAccessToken(data.accessToken);
      }
      return data;
    }

    if (response.headers.get('content-type') === 'application/json') {
      const responseBody = await response.json();
      const issues = responseBody?.error?.issues;
      if (issues) {
        throw new Error(`Client error: ${JSON.stringify({ issues }, null, 2)}`);
      }
      throw new Error(`Client error: ${JSON.stringify(responseBody, null, 2)}`);
    }
    throw new Error(`Client error: ${await response.text()}`);
  }
}
