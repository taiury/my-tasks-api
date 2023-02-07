import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types';
import { Api400Error, Api401Error, IGenerateToken } from '@/utils';
import { LoginDTO, loginSchema } from './LoginDTO';

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
  async execute(DTO: LoginDTO): Promise<LoginResponse> {
    const { email, password } = loginSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    const user = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new Api401Error('Email or password invalid.');
    }

    if (!user.isEnabled) throw new Api401Error('Account is not enabled.');

    return {
      id: user.id as number,
      name: user.name,
      age: user.age,
      token: this.generateToken(user.id as number),
    };
  }
}

export { LoginUseCase, LoginResponse };
