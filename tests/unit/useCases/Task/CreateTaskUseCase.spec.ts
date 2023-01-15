import { CreateTaskUseCase } from '@/useCases';
import { TaskRepositoryMock } from '../../mocks';

const taskRepository = new TaskRepositoryMock();
const sut = new CreateTaskUseCase(taskRepository);

describe('CreateTaskUseCase', () => {
  it('should create a new task in repository.', async () => {
    await sut.execute({ userId: 1, title: 'TEST', description: 'Lorem ipsum' });
    const task = await taskRepository.findTaskById(1);

    expect(task?.authorId).toEqual(1);
    expect(task?.title).toEqual('TEST');
  });
});
