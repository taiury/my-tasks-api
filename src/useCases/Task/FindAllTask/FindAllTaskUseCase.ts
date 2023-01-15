import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { FindAllTaskDTO } from './FindAllTaskDTO';

class FindAllTaskUseCase implements UseCaseProtocol<FindAllTaskDTO, Task[]> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute(DTO: FindAllTaskDTO): Promise<Task[]> {
    const tasks = await this.taskRepository.findTasksByUserId(DTO.userId);
    return tasks;
  }
}

export { FindAllTaskUseCase };
