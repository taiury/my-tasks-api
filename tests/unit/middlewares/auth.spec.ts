import { authMiddleware } from '@/middlewares';
import { generateToken } from '@/utils';
import { Request, Response } from 'express';
import { mockNext, MockRequest, MockResponse } from '../mocks';

const token = generateToken(1);
const authValid = `Bearer ${token}`;

describe('authMiddleware', () => {
  beforeEach(() => {
    mockNext.mockClear();
  });

  it('should authenticate user by token', async () => {
    const req = new MockRequest({
      headers: { authentication: authValid },
    }) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should not authenticate user because authentication not is string', async () => {
    const req = new MockRequest({
      headers: { authentication: [authValid] },
    }) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Token malformated.',
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should not authenticate user because not have headers', async () => {
    const req = new MockRequest({}) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Bad request',
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should not authenticate user because "Bearer" and token have no space between them', async () => {
    const req = new MockRequest({
      headers: { authentication: `Bearer${token}` },
    }) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Token malformated.',
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should not authenticate the user because "Bearer" is badly formatted', async () => {
    const req = new MockRequest({
      headers: { authentication: `bearer ${token}` },
    }) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Token malformated.',
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should not authenticate the user because token is invalid', async () => {
    const req = new MockRequest({
      headers: { authentication: `Bearer TOKEN_INVALID` },
    }) as Request;
    const res = new MockResponse() as Response;

    await authMiddleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Token invalid.',
      }),
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});
