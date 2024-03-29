import { User } from '@/entities';
import { UserRepositoryProtocol } from '@/repositories';

const userTest: User = {
  id: 1,
  email: 'test@gmail.com',
  password: 'PASSWORD',
  name: 'TEST',
  isEnabled: true,
  age: 23,
  createdAt: new Date(),
};

class UserRepositoryMock implements UserRepositoryProtocol {
  async findByEmailCode(code: number): Promise<User | null> {
    const user = this.Users.find((user) => user.email_code === code);
    return user ? user : null;
  }
  private readonly Users: User[] = [userTest];

  async findById(userId: number): Promise<User | null> {
    const user = this.Users.find((user) => user.id === userId);
    return user ? user : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.Users.find((user) => user.email === email);
    return user ? user : null;
  }

  async add(props: User): Promise<void> {
    this.Users.push({
      ...props,
      id: this.Users.length + 1,
      isEnabled: false,
      createdAt: new Date(),
    });
  }

  async modify(userId: number, user: User): Promise<void> {
    const indexUser = this.Users.findIndex(
      (userRepository) => userRepository.id === userId,
    );
    let userModified = this.Users[indexUser];
    userModified = {
      ...userModified,
      name: user.name ? user.name : userModified.name,
      age: user.age ? user.age : userModified.age,
      password: user.password ? user.password : userModified.password,
      email_code:
        typeof user.email_code === typeof null
          ? user.email_code
          : userModified.email_code,
      isEnabled: user.isEnabled ? user.isEnabled : userModified.isEnabled,
    } as User;
    this.Users[indexUser] = userModified;
  }
}

export { UserRepositoryMock };
