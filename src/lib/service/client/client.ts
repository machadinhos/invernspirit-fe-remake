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

export class Client {
  private context: RequestContext;

  constructor(context: RequestBaseContext) {
    this.context = context;
  }

  private buildUrl() {
    return `${this.context.host}${this.context.endpoint}${this.context.pathParams && `/${this.context.pathParams.join('/')}`}${this.context.queryParams && `?${this.context.queryParams}`}`;
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

  async call() {
    return await fetch(this.buildUrl(), {
      headers: this.context.headers,
      method: this.context.method,
      ...(this.context.body && { body: JSON.stringify(this.context.body) }),
    });
  }
}
