import { EnableAccountController } from '@/controllers';
import { User } from '@/entities';
import { EnableAccountUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const enableAccountUseCase = new EnableAccountUseCase(userRepositoryMock);

const newUser = {
  email: 'EnableAccount@gmail.com',
  password: 'PASSWORD',
  age: 23,
  email_code: 109805,
  name: 'Enable Account',
} as User;

describe('EnableAccountController', () => {
  beforeAll(async () => {
    userRepositoryMock.add(newUser);
  });

  it('should enable account', async () => {
    const sut = new EnableAccountController(enableAccountUseCase);
    const req = new MockRequest({
      body: { email: newUser.email, code: newUser.email_code },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);
    const user = await userRepositoryMock.findByEmail(newUser.email);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    expect(user?.email_code).toEqual(null);
    expect(user?.isEnabled).toEqual(true);
  });

  it('should not enable account because email code is invalid', async () => {
    const sut = new EnableAccountController(enableAccountUseCase);
    const req = new MockRequest({
      body: { email: newUser.email, code: 999999 },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Email code is invalid.',
    });
  });

  it('should not enable account because email not exists', async () => {
    const sut = new EnableAccountController(enableAccountUseCase);
    const req = new MockRequest({
      body: { email: 'INVALID_EMAIL@gmail.com', code: newUser.email_code },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User not found.',
    });
  });

  it('should not enable account because email is undefined', async () => {
    const sut = new EnableAccountController(enableAccountUseCase);
    const req = new MockRequest({
      body: { email: undefined, code: newUser.email_code },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Parameters are badly formatted.',
    });
  });
});
