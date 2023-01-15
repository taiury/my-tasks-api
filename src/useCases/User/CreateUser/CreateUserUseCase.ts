import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { CheckEmail } from '@/utils';
import { CreateUserDTO } from './CreateUserDTO';

class CreateUserUseCase implements UseCaseProtocol<CreateUserDTO, void> {
  constructor(
    private userRepository: UserRepositoryProtocol,
    private checkEmail: CheckEmail,
  ) {}

  async execute(DTO: CreateUserDTO): Promise<void> {
    const isEmail = this.checkEmail(DTO.email);
    if (!isEmail) throw new Error('Email invalid.');

    const userAlreadyExists = await this.userRepository.findByEmail(DTO.email);
    if (userAlreadyExists) throw new Error('Email already exists.');

    await this.userRepository.add({ ...DTO });
  }
}

export { CreateUserUseCase };
