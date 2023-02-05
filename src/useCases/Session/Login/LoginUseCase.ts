import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types';
import { IGenerateToken } from '@/utils';
import { LoginDTO } from './LoginDTO';

interface LoginResponse {
  id: number;
  name: string;
  age: number;
  token: string;
}

class LoginUseCase implements UseCaseProtocol<LoginDTO, LoginResponse> {
  constructor(
    private readonly userRepository: UserRepositoryProtocol,
    private readonly generateToken: IGenerateToken,
  ) {}
  async execute({ email, password }: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('Email or password invalid.');
    }

    if (!user.isEnabled) throw new Error('Account is not enabled.');

    return {
      id: user.id as number,
      name: user.name,
      age: user.age,
      token: this.generateToken(user.id as number),
    };
  }
}

export { LoginUseCase, LoginResponse };
