import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { CreateTaskDTO } from './CreateTaskDTO';

class CreateTaskUseCase implements UseCaseProtocol<CreateTaskDTO, void> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute({ userId, title, description }: CreateTaskDTO): Promise<void> {
    if (!title) throw new Error('Title is required');

    this.taskRepository.add({
      title,
      description,
      authorId: userId,
      finalized: false,
    });
  }
}

export { CreateTaskUseCase };
