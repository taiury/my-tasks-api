import { Task } from '@/entities';
import { ModifyTaskUseCase } from '@/useCases';
import { TaskRepositoryMock } from '../../mocks';

const newTask: Task = {
  id: 1,
  title: 'NEW_TASK',
  description: 'TEST',
  authorId: 1,
  finalized: false,
  createdAt: new Date(),
};

const taskRepositoryMock = new TaskRepositoryMock();
taskRepositoryMock.add(newTask);
const sut = new ModifyTaskUseCase(taskRepositoryMock);

describe('ModifyTaskUseCase', () => {
  it('should modify Task in repository', async () => {
    await sut.execute({
      taskId: 1,
      userId: 1,
      title: 'NEW_TITLE',
      description: 'NEW_DESCRIPTION',
    });

    const task = await taskRepositoryMock.findTaskById(1);

    expect(task?.title).toEqual('NEW_TITLE');
    expect(task?.description).toEqual('NEW_DESCRIPTION');
  });

  it('should not modify Task in repository because TaskID is invalid', async () => {
    await expect(
      sut.execute({
        taskId: 9999,
        userId: 1,
        title: 'NEW_TITLE',
        description: 'NEW_DESCRIPTION',
      }),
    ).rejects.toThrow(Error('Task not Exists'));
  });

  it('should not modify Task in repository because TaskID is invalid', async () => {
    await expect(
      sut.execute({
        taskId: 1,
        userId: 9999,
        title: 'NEW_TITLE',
        description: 'NEW_DESCRIPTION',
      }),
    ).rejects.toThrow(Error('Not the task owner'));
  });
});
