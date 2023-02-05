import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types';
import { Api401Error, Api404Error } from '@/utils';
import { EnableAccountDTO } from './EnableAccountDTO';

class EnableAccountUseCase implements UseCaseProtocol<EnableAccountDTO, void> {
  constructor(private userRepository: UserRepositoryProtocol) {}

  async execute({ code, email }: EnableAccountDTO): Promise<void> {
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
