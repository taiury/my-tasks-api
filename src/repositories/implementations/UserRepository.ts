import { User } from '@/entities';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryProtocol } from '../UserRepositoryProtocol';

class UserRepository implements UserRepositoryProtocol {
  constructor(private readonly dbClient: PrismaClient) {}
  async findByEmailCode(code: number): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({
      where: { email_code: code },
    });
    return user as User | null;
  }
  async findById(userId: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.dbClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        password: false,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({ where: { email } });
    return user as User | null;
  }

  async add({ email, password, name, age, email_code }: User): Promise<void> {
    await this.dbClient.user.create({
      data: { email, password, name, age, email_code },
    });
  }

  async modify(
    userId: number,
    { password, name, age, email_code, isEnabled }: User,
  ): Promise<void> {
    await this.dbClient.user.update({
      where: { id: userId },
      data: { password, name, age, email_code, isEnabled },
    });
  }
}

export { UserRepository };
