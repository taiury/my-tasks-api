import { ModifyUserController } from '@/controllers';
import { ModifyUserDTO, ModifyUserUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const modifyUserUseCase = new ModifyUserUseCase(userRepositoryMock);
const sut = new ModifyUserController(modifyUserUseCase);

describe('ModifyUserController', () => {
  it('should modify user in repository', async () => {
    const req = new MockRequest({
      userId: 1,
      body: { name: 'NEW_NAME' } as ModifyUserDTO,
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should not modify user in repository because user id is invalid', async () => {
    const req = new MockRequest({
      userId: 9999,
      body: { name: 'NEW_NAME' } as ModifyUserDTO,
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
