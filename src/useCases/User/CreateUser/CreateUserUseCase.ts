import { MailProviderProtocol } from '@/providers';
import { UserRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import {
  Api400Error,
  Api401Error,
  CheckEmail,
  GenerateEmailConfirmationCodeProtocol,
} from '@/utils';
import { CreateUserDTO, createUserSchema } from './CreateUserDTO';

class CreateUserUseCase implements UseCaseProtocol<CreateUserDTO, void> {
  constructor(
    private userRepository: UserRepositoryProtocol,
    private mailProvider: MailProviderProtocol,
    private generateCode: GenerateEmailConfirmationCodeProtocol,
    private checkEmail: CheckEmail,
  ) {}

  async execute(DTO: CreateUserDTO): Promise<void> {
    const { email, password, name, age } = createUserSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });
    const isEmail = this.checkEmail(email);
    if (!isEmail) throw new Api401Error('Email invalid.');

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new Api401Error('Email already exists.');

    const emailCode = await this.generateCode.generate();

    await this.userRepository.add({
      email,
      password,
      name,
      age,
      email_code: emailCode,
    });

    await this.mailProvider.sendEmail({
      from: {
        email: process.env.EMAIL as string,
        name: 'My Tasks',
      },
      to: {
        email: email,
        name: name,
      },
      subject: 'Confirmação de email',
      body: `<p>Esse é o seu codigo de confirmação de email: [${emailCode}].</p>`,
    });
  }
}

export { CreateUserUseCase };
