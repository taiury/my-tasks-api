import { ModifyUserUseCase } from '@/useCases';
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
});
