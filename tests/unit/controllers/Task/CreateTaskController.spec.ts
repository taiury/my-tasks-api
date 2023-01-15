import { CreateTaskController } from '@/controllers';
import { CreateTaskUseCase } from '@/useCases';
import { Request, Response } from 'express';
import { MockRequest, MockResponse, TaskRepositoryMock } from '../../mocks';

const taskRepositoryMock = new TaskRepositoryMock();
const createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
const sut = new CreateTaskController(createTaskUseCase);

describe('CreateTaskController', () => {
  it('should create task in repository', async () => {
    const req = new MockRequest({
      userId: 1,
      body: { title: 'NEW_TASK' },
    }) as Request;
    const res = new MockResponse() as Response;

    await sut.perform(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should not create task in repository becasuse not have body', async () => {
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
