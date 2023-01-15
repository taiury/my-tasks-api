import { CreateUserController } from '@/controllers';
import { CreateUserDTO, CreateUserUseCase } from '@/useCases';
import { checkEmail } from '@/utils';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, UserRepositoryMock } from '../../mocks';

const users: CreateUserDTO[] = [
  { email: 'NEW_EMAIL@gmail.com', password: 'PASS', name: 'TEST', age: 57 },
  {
    email: 'NEW_EMAIL_TWO@gmail.com',
    password: 'PASS',
    name: 'TEST_TWO',
    age: 18,
  },
];

const userRrepositoryMock = new UserRepositoryMock();
const createUserUseCase = new CreateUserUseCase(
  userRrepositoryMock,
  checkEmail,
);
const sut = new CreateUserController(createUserUseCase);

describe('CreateUserController', () => {
  it('should create new user in repository', async () => {
    const req = new MockRequest({
      body: users[0],
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should not create new user in repository because email is invalid', async () => {
    const req = new MockRequest({
      body: { ...users[0], email: 'INVALID' },
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
