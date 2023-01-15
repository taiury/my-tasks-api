import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { ModifyUserDTO } from './ModifyUserDTO';

class ModifyUserUseCase implements UseCaseProtocol<ModifyUserDTO, void> {
  constructor(private readonly userRepository: UserRepositoryProtocol) {}
  async execute({ userId, name, age, password }: ModifyUserDTO): Promise<void> {
    await this.userRepository.modify(userId, { name, age, password } as User);
  }
}

export { ModifyUserUseCase };
