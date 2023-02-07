import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error, Api401Error, Api404Error } from '@/utils';
import { FindTaskDTO, findTaskSchema } from './FindTaskDTO';

class FindTaskUseCase implements UseCaseProtocol<FindTaskDTO, Task> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute(DTO: FindTaskDTO): Promise<Task> {
    const { taskId, userId } = findTaskSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    const task = await this.taskRepository.findTaskById(taskId);

    if (!task) throw new Api404Error('Task ID is invalid.');
    if (task.authorId !== userId) throw new Api401Error('Is not task owner.');

    return task;
  }
}

export { FindTaskUseCase };
