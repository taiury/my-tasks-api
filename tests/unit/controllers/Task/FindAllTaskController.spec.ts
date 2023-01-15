import { FindAllTaskController } from '@/controllers';
import { Task } from '@/entities';
import { FindAllTaskUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, TaskRepositoryMock } from '../../mocks';

const newTask: Task[] = [
  {
    id: 1,
    title: 'MY_TASK',
    description: 'TEST',
    authorId: 1,
    finalized: false,
  },
  {
    id: 2,
    title: 'MY_TASK_TWO',
    description: 'TEST',
    authorId: 1,
    finalized: false,
  },
  {
    id: 3,
    title: 'NOT_MY_TASK',
    description: 'TEST',
    authorId: 2,
    finalized: false,
  },
];

const taskRepositoryMock = new TaskRepositoryMock();
taskRepositoryMock.add(newTask[0]);
taskRepositoryMock.add(newTask[1]);
taskRepositoryMock.add(newTask[2]);
const findTaskUseCase = new FindAllTaskUseCase(taskRepositoryMock);
const sut = new FindAllTaskController(findTaskUseCase);

describe('FindAllTaskController', () => {
  it('should find all userID owner tasks', async () => {
    const req = new MockRequest({ userId: 1 }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should not find all userID owner tasks', async () => {
    const req = new MockRequest({}) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });
});
