import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { FindUserDTO } from './FindUserDTOS';

class FindUserUseCase
  implements UseCaseProtocol<FindUserDTO, Omit<User, 'password'>>
{
  constructor(private userRepository: UserRepositoryProtocol) {}
  async execute({ userId }: FindUserDTO): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error('User id invalid.');

    return user;
  }
}

export { FindUserUseCase };
