import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types';
import { Api400Error, Api401Error, Api404Error } from '@/utils';
import { EnableAccountDTO, enableAccountSchema } from './EnableAccountDTO';

class EnableAccountUseCase implements UseCaseProtocol<EnableAccountDTO, void> {
  constructor(private userRepository: UserRepositoryProtocol) {}

  async execute(DTO: EnableAccountDTO): Promise<void> {
    const { email, code } = enableAccountSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Api404Error('User not found.');

    if (user.email_code !== code) {
      throw new Api401Error('Email code is invalid.');
    }

    await this.userRepository.modify(
      user.id as number,
      {
        email_code: null as unknown,
        isEnabled: true,
      } as User,
    );
  }
}

export { EnableAccountUseCase };
