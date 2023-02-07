import { CreateTaskDTO, CreateTaskUseCase } from '@/useCases';
import { Api400Error } from '@/utils';
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

  it('should not create a new task in repository because title is undifened.', async () => {
    await expect(
      sut.execute({
        userId: 1,
        description: 'Lorem ipsum',
      } as CreateTaskDTO),
    ).rejects.toThrow(new Api400Error('parameters are badly formatted.'));
  });
});
