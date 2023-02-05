import { CreateUserUseCase } from '@/useCases';
import { checkEmail, GenerateEmailConfirmationCode } from '@/utils';
import { MailProviderMock, UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const mailProviderMock = new MailProviderMock();
const generateCode = new GenerateEmailConfirmationCode(userRepositoryMock);

const sut = new CreateUserUseCase(
  userRepositoryMock,
  mailProviderMock,
  generateCode,
  checkEmail,
);

describe('CreateUserUseCase', () => {
  it('should create a new user in repository.', async () => {
    const newUser = {
      email: 'NEW_USER@gmail.com',
      password: 'PASSWORD',
      name: 'NEW_USER',
      age: 27,
    };

    await expect(sut.execute(newUser)).resolves.not.toThrow();

    const user = await userRepositoryMock.findByEmail('NEW_USER@gmail.com');
    expect(user).not.toEqual(null);
  });

  it('should not create a new user in repository because Email is invalid.', async () => {
    const newUser = {
      email: 'INVALID_EMAIL.com',
      password: 'ERROR',
      name: 'INVALID_USER',
      age: 31,
    };

    await expect(sut.execute(newUser)).rejects.toThrow(Error('Email invalid.'));
  });

  it('should not create a new user in repository because Email already exists.', async () => {
    const newUser = {
      email: 'NEW_USER@gmail.com',
      password: 'PASSWORD',
      name: 'EMAIL ALREADY EXISTS',
      age: 31,
    };

    await expect(sut.execute(newUser)).rejects.toThrow(
      Error('Email already exists.'),
    );
  });
});
