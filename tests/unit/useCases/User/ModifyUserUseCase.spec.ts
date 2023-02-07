import { ModifyUserDTO, ModifyUserUseCase } from '@/useCases';
import { Api400Error } from '@/utils';
import { UserRepositoryMock } from '../../mocks';

const userRepository = new UserRepositoryMock();
const sut = new ModifyUserUseCase(userRepository);

describe('ModifyUserUseCase', () => {
  it('should modify user in repository', async () => {
    await sut.execute({
      userId: 1,
      name: 'NEW_NAME',
      password: 'NEW_PASSWORD',
    });

    const user = await userRepository.findById(1);

    expect(user?.name).toEqual('NEW_NAME');
    expect(user?.age).toEqual(23);
  });

  it('should not modify user in repository because userId is undefined', async () => {
    await expect(
      sut.execute({
        userId: undefined,
        name: 'NEW_NAME',
        password: 'NEW_PASSWORD',
      } as unknown as ModifyUserDTO),
    ).rejects.toThrow(new Api400Error('Parameters are badly formatted.'));
  });
});
