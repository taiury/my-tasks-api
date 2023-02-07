import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error } from '@/utils';
import { ModifyUserDTO, modifyUserSchema } from './ModifyUserDTO';

class ModifyUserUseCase implements UseCaseProtocol<ModifyUserDTO, void> {
  constructor(private readonly userRepository: UserRepositoryProtocol) {}
  async execute(DTO: ModifyUserDTO): Promise<void> {
    const { userId, password, name, age } = modifyUserSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    await this.userRepository.modify(userId, { name, age, password } as User);
  }
}

export { ModifyUserUseCase };
