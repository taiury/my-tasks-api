import { Task } from '@/entities';

interface TaskRepositoryProtocol {
  add(props: Task): Promise<void>;
  findTaskById(taskId: number): Promise<Task | null>;
  findTasksByUserId(userId: number): Promise<Task[]>;
  modify(props: Task): Promise<void>;
}

export { TaskRepositoryProtocol };
