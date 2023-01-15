import { ModifyTaskController } from '@/controllers';
import { Task } from '@/entities';
import { ModifyTaskUseCase } from '@/useCases';
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
const modifyTaskUseCase = new ModifyTaskUseCase(taskRepositoryMock);
const sut = new ModifyTaskController(modifyTaskUseCase);

describe('ModifyTaskController', () => {
  it('should modify task in repository', async () => {
    const req = new MockRequest({ userId: 1, body: { taskId: 1 } }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should modify task in repository because user id is invalid', async () => {
    const req = new MockRequest({ body: { taskId: 1 } }) as Request;
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
