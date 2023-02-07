import { TaskRepositoryProtocol } from '@/repositories';
import { UseCaseProtocol } from '@/types/UseCaseProtocol';
import { Api400Error } from '@/utils';
import { CreateTaskDTO, createTaskSchema } from './CreateTaskDTO';

class CreateTaskUseCase implements UseCaseProtocol<CreateTaskDTO, void> {
  constructor(private readonly taskRepository: TaskRepositoryProtocol) {}
  async execute(DTO: CreateTaskDTO): Promise<void> {
    const { userId, title, description } = createTaskSchema.parse(DTO, {
      errorMap: () => {
        throw new Api400Error('Parameters are badly formatted.');
      },
    });

    this.taskRepository.add({
      title,
      description,
      authorId: userId,
      finalized: false,
    });
  }
}

export { CreateTaskUseCase };
