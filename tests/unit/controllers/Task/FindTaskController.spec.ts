import { FindTaskController } from '@/controllers';
import { Task } from '@/entities';
import { FindTaskUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, TaskRepositoryMock } from '../../mocks';

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
const findTaskUseCase = new FindTaskUseCase(taskRepositoryMock);
const sut = new FindTaskController(findTaskUseCase);

describe('FindTaskController', () => {
  it('should find user in repository', async () => {
    const req = new MockRequest({
      userId: 1,
      params: { taskId: 1 },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'TEST',
      }),
    );
  });

  it('should not find user in repository because user id is invalid', async () => {
    const req = new MockRequest({
      params: { taskId: 1 },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Bad Request',
      }),
    );
  });

  it('should not find user in repository because task id is invalid', async () => {
    const req = new MockRequest({
      userId: 1,
      params: { taskId: 'INVALID' },
    }) as Request;
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
