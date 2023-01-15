import { FindUserUseCase } from '@/useCases';
import { UserRepositoryMock } from '../../mocks';

const userRepository = new UserRepositoryMock();
const sut = new FindUserUseCase(userRepository);

describe('FindUserUseCase', () => {
  it('should find user in repository', async () => {
    const user = await sut.execute({ userId: 1 });

    expect(user.name).toEqual('TEST');
  });

  it('should not find user in repository because user id is invalid', async () => {
    await expect(sut.execute({ userId: 999999 })).rejects.toThrow(
      Error('User id invalid.'),
    );
  });
});
