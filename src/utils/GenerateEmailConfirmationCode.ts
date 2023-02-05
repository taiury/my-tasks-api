import { UserRepositoryProtocol } from '@/repositories';

interface GenerateEmailConfirmationCodeProtocol {
  generate(): Promise<number>;
}

class GenerateEmailConfirmationCode
  implements GenerateEmailConfirmationCodeProtocol
{
  constructor(private readonly userRepository: UserRepositoryProtocol) {}

  async generate() {
    const emailCode = this.generateArrayOfRandomNumbers();

    const codeAlreadyExists = await this.userRepository.findByEmailCode(
      emailCode,
    );

    if (codeAlreadyExists) await this.generate();

    return emailCode;
  }

  private generateArrayOfRandomNumbers() {
    const elements = Array(6)
      .fill(0)
      .map((_, index) => {
        if (index === 0) return Math.floor(Math.max(Math.random() * 9, 1));
        return Math.floor(Math.random() * 9);
      });

    const numbers = Number(
      elements.map(String).reduce((acc, current) => acc + current),
    );

    return numbers;
  }
}

export { GenerateEmailConfirmationCodeProtocol, GenerateEmailConfirmationCode };
