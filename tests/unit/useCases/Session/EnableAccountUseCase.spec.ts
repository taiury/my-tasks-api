import { EnableAccountUseCase } from '@/useCases';
import { Api401Error, Api404Error } from '@/utils';
import { UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();

const newUser = {
  email: 'EMAIL_CODE@gmail.com',
  password: 'PASSWORD',
  name: 'NEW_USER',
  email_code: 999999,
  age: 27,
};

describe('EnableAccountUseCase', () => {
  beforeAll(async () => {
    await userRepositoryMock.add(newUser);
  });

  it('should enable account', async () => {
    const sut = new EnableAccountUseCase(userRepositoryMock);
    await expect(
      sut.execute({ code: newUser.email_code, email: newUser.email }),
    ).resolves.not.toThrow();
  });

  it('should not enable account because user not exists', async () => {
    const sut = new EnableAccountUseCase(userRepositoryMock);
    await expect(
      sut.execute({
        code: newUser.email_code,
        email: 'USER_NOT_EXISTS@gmail.com',
      }),
    ).rejects.toThrow(new Api404Error('User not found.'));
  });

  it('should not enable account because email code is invalid', async () => {
    const sut = new EnableAccountUseCase(userRepositoryMock);
    await expect(
      sut.execute({
        code: 111111,
        email: newUser.email,
      }),
    ).rejects.toThrow(new Api401Error('Email code is invalid.'));
  });
});
