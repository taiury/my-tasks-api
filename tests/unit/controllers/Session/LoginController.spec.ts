import { LoginController } from '@/controllers';
import { LoginUseCase } from '@/useCases';
import { Request, Response } from 'express';
import {
  mockGenerateToken,
  MockRequest,
  MockResponse,
  UserRepositoryMock,
} from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const loginUseCase = new LoginUseCase(userRepositoryMock, mockGenerateToken);
const sut = new LoginController(loginUseCase);

describe('LoginController', () => {
  beforeEach(() => {
    mockGenerateToken.mockClear();
  });

  it('should init session', async () => {
    const req = new MockRequest({
      body: { email: 'test@gmail.com', password: 'PASSWORD' },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'TOKEN',
      }),
    );
  });

  it('should init session', async () => {
    const req = new MockRequest({
      body: { email: 'test@gmail.com', password: 'INVALID' },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });
});
