import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error } from '@/utils';
import { FindAllTaskDTO, findAllTaskSchema } from './FindAllTaskDTO';

class FindAllTaskUseCase implements UseCaseProtocol<FindAllTaskDTO, Task[]> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute(DTO: FindAllTaskDTO): Promise<Task[]> {
    const { userId } = findAllTaskSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    const tasks = await this.taskRepository.findTasksByUserId(userId);
    return tasks;
  }
}

export { FindAllTaskUseCase };
