import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { FindTaskDTO } from './FindTaskDTO';

class FindTaskUseCase implements UseCaseProtocol<FindTaskDTO, Task> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute({ taskId, userId }: FindTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findTaskById(taskId);

    if (!task) throw new Error('Task ID is invalid');
    if (task.authorId !== userId) throw new Error('Is not task owner');

    return task;
  }
}

export { FindTaskUseCase };
