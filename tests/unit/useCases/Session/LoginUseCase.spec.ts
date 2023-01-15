import { LoginUseCase } from '@/useCases';
import { mockGenerateToken, UserRepositoryMock } from '../../mocks';

const userRepositoryMock = new UserRepositoryMock();
const sut = new LoginUseCase(userRepositoryMock, mockGenerateToken);

describe('LoginUseCase', () => {
  beforeEach(() => {
    mockGenerateToken.mockClear();
  });

  it('should init session', async () => {
    const login = await sut.execute({
      email: 'test@gmail.com',
      password: 'PASSWORD',
    });

    expect(login.token).toEqual('TOKEN');
    expect(mockGenerateToken).toHaveBeenCalledWith(1);
  });

  it('should not init session because password is invalid', async () => {
    await expect(
      sut.execute({
        email: 'test@gmail.com',
        password: 'INVALID',
      }),
    ).rejects.toThrow(Error('Email or password invalid.'));
  });

  it('should not init session because Email is invalid', async () => {
    await expect(
      sut.execute({
        email: 'INVALID@gmail.com',
        password: 'PASSWORD',
      }),
    ).rejects.toThrow(Error('Email or password invalid.'));
  });
});
