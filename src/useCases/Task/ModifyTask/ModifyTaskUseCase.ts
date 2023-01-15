import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { ModifyTaskDTO } from './ModifyTaskDTO';

class ModifyTaskUseCase implements UseCaseProtocol<ModifyTaskDTO, void> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute({
    userId,
    taskId,
    title,
    description,
    finalized,
  }: ModifyTaskDTO): Promise<void> {
    const task = await this.taskRepository.findTaskById(taskId);

    if (!task) throw new Error('Task not Exists');
    if (task.authorId !== userId) throw new Error('Not the task owner');

    await this.taskRepository.modify({
      id: taskId,
      title,
      description,
      finalized,
    } as Task);
  }
}

export { ModifyTaskUseCase };
