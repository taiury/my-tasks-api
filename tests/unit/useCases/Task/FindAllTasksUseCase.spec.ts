import { Task } from '@/entities';
import { FindAllTaskUseCase } from '@/useCases';
import { TaskRepositoryMock } from '../../mocks';

const newTask: Task[] = [
  {
    id: 1,
    title: 'MY_TASK',
    description: 'TEST',
    authorId: 1,
    finalized: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'MY_TASK_TWO',
    description: 'TEST',
    authorId: 1,
    finalized: false,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'NOT_MY_TASK',
    description: 'TEST',
    authorId: 2,
    finalized: false,
    createdAt: new Date(),
  },
];

const taskRepositoryMock = new TaskRepositoryMock();
taskRepositoryMock.add(newTask[0]);
taskRepositoryMock.add(newTask[1]);
taskRepositoryMock.add(newTask[2]);

const sut = new FindAllTaskUseCase(taskRepositoryMock);

describe('FindAllTasksUseCase', () => {
  it('should find all userID owner tasks ', async () => {
    const tasks = await sut.execute({ userId: 1 });

    expect(tasks[0].title).toEqual('MY_TASK');
    expect(tasks[1].title).toEqual('MY_TASK_TWO');
    expect(tasks[2]).toEqual(undefined);
  });
});
