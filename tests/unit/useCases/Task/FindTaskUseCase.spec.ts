import { Task } from '@/entities';
import { FindTaskUseCase } from '@/useCases';
import { TaskRepositoryMock } from '../../mocks';

const newTask: Task = {
  id: 1,
  title: 'NEW_TASK',
  description: 'TEST',
  authorId: 1,
  finalized: false,
  createdAt: new Date(),
};

const taskRepository = new TaskRepositoryMock();
taskRepository.add(newTask);

const sut = new FindTaskUseCase(taskRepository);

describe('FindTaskUseCase', () => {
  it('should find task in repository.', async () => {
    const task = await sut.execute({ taskId: 1, userId: 1 });

    expect(task.title).toEqual('NEW_TASK');
    expect(task.finalized).toEqual(false);
  });

  it('should not find the task in repository because taskId is invalid.', async () => {
    await expect(sut.execute({ taskId: 99999, userId: 1 })).rejects.toThrow(
      new Error('Task ID is invalid'),
    );
  });

  it('should not find the task in the repository because the user is not the owner of the task.', async () => {
    await expect(sut.execute({ taskId: 1, userId: 99999 })).rejects.toThrow(
      new Error('Is not task owner'),
    );
  });
});
