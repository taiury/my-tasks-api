import { MailProviderProtocol } from '@/providers';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { CheckEmail, GenerateEmailConfirmationCodeProtocol } from '@/utils';
import { CreateUserDTO } from './CreateUserDTO';

class CreateUserUseCase implements UseCaseProtocol<CreateUserDTO, void> {
  constructor(
    private userRepository: UserRepositoryProtocol,
    private mailProvider: MailProviderProtocol,
    private generateCode: GenerateEmailConfirmationCodeProtocol,
    private checkEmail: CheckEmail,
  ) {}

  async execute(DTO: CreateUserDTO): Promise<void> {
    const isEmail = this.checkEmail(DTO.email);
    if (!isEmail) throw new Error('Email invalid.');

    const userAlreadyExists = await this.userRepository.findByEmail(DTO.email);
    if (userAlreadyExists) throw new Error('Email already exists.');

    const emailCode = await this.generateCode.generate();

    await this.userRepository.add({
      ...DTO,
      email_code: emailCode,
    });

    await this.mailProvider.sendEmail({
      from: {
        email: process.env.EMAIL as string,
        name: 'My Tasks',
      },
      to: {
        email: DTO.email,
        name: DTO.name,
      },
      subject: 'Confirmação de email',
      body: `<p>Esse é o seu codigo de confirmação de email: [${emailCode}].</p>`,
    });
  }
}

export { CreateUserUseCase };
