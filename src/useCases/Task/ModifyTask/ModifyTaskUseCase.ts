import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error, Api401Error, Api404Error } from '@/utils';
import { ModifyTaskDTO, modifyTaskSchema } from './ModifyTaskDTO';

class ModifyTaskUseCase implements UseCaseProtocol<ModifyTaskDTO, void> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute(DTO: ModifyTaskDTO): Promise<void> {
    const { userId, taskId, title, description, finalized } =
      modifyTaskSchema.parse(DTO, {
        errorMap: () => {
          throw new Api400Error('Parameters are badly formatted.');
        },
      });

    const task = await this.taskRepository.findTaskById(taskId);

    if (!task) throw new Api404Error('Task not Exists.');
    if (task.authorId !== userId) throw new Api401Error('Not the task owner.');

    await this.taskRepository.modify({
      id: taskId,
      title,
      description,
      finalized,
    } as Task);
  }
}

export { ModifyTaskUseCase };
