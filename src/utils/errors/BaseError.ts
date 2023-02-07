class BaseError extends Error {
  constructor(
    public readonly name: string,
    public readonly statusCode: number,
    public readonly isOperational: boolean,
    public readonly description: string,
  ) {
    super(description);
    Error.captureStackTrace(this);
  }
}

export { BaseError };
