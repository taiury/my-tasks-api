interface MockRequestProtocol {
  userId?: number;
  body?: unknown;
  params?: unknown;
  query?: unknown;
  headers?: unknown;
}

class MockRequest implements MockRequestProtocol {
  public readonly userId?: number;
  public readonly body?: unknown;
  public readonly params?: unknown;
  public readonly query?: unknown;
  public readonly headers?: unknown;

  constructor({ userId, body, params, query, headers }: MockRequestProtocol) {
    this.userId = userId;
    this.body = body;
    this.params = params;
    this.query = query;
    this.headers = headers;
  }
}

export { MockRequest, MockRequestProtocol };
