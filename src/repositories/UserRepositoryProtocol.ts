import { User } from '@/entities';

interface UserRepositoryProtocol {
  findById(userId: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  add(props: User): Promise<void>;
  modify(userId: number, user: User): Promise<void>;
}

export { UserRepositoryProtocol };
