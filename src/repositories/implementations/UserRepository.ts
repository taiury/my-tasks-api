import { User } from '@/entities';
import { PrismaClient } from '@prisma/client';
import { UserRepositoryProtocol } from '../UserRepositoryProtocol';

class UserRepository implements UserRepositoryProtocol {
  constructor(private readonly dbClient: PrismaClient) {}
  async findById(userId: number): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({ where: { id: userId } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({ where: { email } });
    return user;
  }

  async add({ email, password, name, age }: User): Promise<void> {
    await this.dbClient.user.create({ data: { email, password, name, age } });
  }

  async modify(userId: number, { password, name, age }: User): Promise<void> {
    await this.dbClient.user.update({
      where: { id: userId },
      data: { password, name, age },
    });
  }
}

export { UserRepository };
