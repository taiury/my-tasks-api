import { FindUserController } from '@/controllers';
import { FindUserUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const findUserUseCase = new FindUserUseCase(userRepositoryMock);
const sut = new FindUserController(findUserUseCase);

describe('FindUserController', () => {
  it('should find user in repository', async () => {
    const req = new MockRequest({ userId: 1 }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@gmail.com',
      }),
    );
  });

  it('should not find user in repository because user ID is invalid', async () => {
    const req = new MockRequest({ userId: 9999 }) as Request;
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
