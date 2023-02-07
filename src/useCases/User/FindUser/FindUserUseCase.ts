import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error, Api404Error } from '@/utils';
import { FindUserDTO, findUserSchema } from './FindUserDTOS';

class FindUserUseCase
  implements UseCaseProtocol<FindUserDTO, Omit<User, 'password'>>
{
  constructor(private userRepository: UserRepositoryProtocol) {}
  async execute(DTO: FindUserDTO): Promise<Omit<User, 'password'>> {
    const { userId } = findUserSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Api404Error('User id invalid.');

    return user;
  }
}

export { FindUserUseCase };
