type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestHostContext {
  host: string;
  headers?: Record<string, string>;
}
export interface RequestBaseContext extends RequestHostContext {
  endpoint: string;
  method: HttpMethod;
}

interface RequestContext extends RequestBaseContext {
  pathParams?: string[];
  queryParams?: Record<string, string>;
  body?: Record<string, unknown>;
}

export class Client<T> {
  private readonly context: RequestContext;

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
    const response = await fetch(this.buildUrl(), {
      headers: this.context.headers,
      method: this.context.method,
      ...(this.context.body && { body: JSON.stringify(this.context.body) }),
    });

    if (response.status === 200 || response.status === 201) {
      return (await response.json()).data;
    }
    throw new Error(`Client error: ${await response.text()}`);
  }
}
