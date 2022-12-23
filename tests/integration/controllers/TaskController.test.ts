import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import { app } from '../../../src/app';
import { generateToken } from '../../../src/utils/generateToken';

const prisma = new PrismaClient();

describe('TaskController', () => {
  beforeAll(async () => {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (userAlreadyExist) {
      await prisma.task.deleteMany({
        where: { authorId: userAlreadyExist.id },
      });
      await prisma.user.delete({ where: { email: 'TASK@gmail.com' } });
    }

    await prisma.user.create({
      data: {
        name: 'TEST',
        age: 21,
        email: 'TASK@gmail.com',
        password: 'PASSWORD',
      },
    });
  });

  it('should create a new task in repository', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const response = await request(app)
      .post('/task')
      .send({ title: 'NEW TASK' })
      .send({ description: 'Lorem ipsum' })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(200);

    expect(response.body.finalized).toEqual(false);
  });

  it('should not create a new task in repository because user id not is valid', async () => {
    const response = await request(app)
      .post('/task')
      .send({ title: 'NEW TASK' })
      .send({ description: 'Lorem ipsum' })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(999999)}`)
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });

  it('should not create a new task in repository because the "title" parameter is missing', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const response = await request(app)
      .post('/task')
      .send({ description: 'Lorem ipsum' })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });

  it('should update task in repository', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const tasks = await prisma.task.findMany({ where: { authorId: user.id } });

    if (tasks.length === 0) throw new Error('ERROR TASK IS EMPTY');

    const response = await request(app)
      .put('/task')
      .send({ id: tasks[0].id })
      .send({ finalized: true })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(200);

    expect(response.body.finalized).toEqual(true);
  });

  it('should update task in repository because user is not the task owner', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const tasks = await prisma.task.findMany({ where: { authorId: user.id } });

    if (tasks.length === 0) throw new Error('ERROR TASK IS EMPTY');

    const response = await request(app)
      .put('/task')
      .send({ id: tasks[0].id })
      .send({ finalized: true })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(999999)}`)
      .expect(401);

    expect(response.body.error).toEqual('User is not the task owner');
  });

  it('should update task in repository because because the "finalized" parameter is not string', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const tasks = await prisma.task.findMany({ where: { authorId: user.id } });

    if (tasks.length === 0) throw new Error('ERROR TASK IS EMPTY');

    const response = await request(app)
      .put('/task')
      .send({ id: tasks[0].id })
      .send({ finalized: 'true' })
      .set('Content-Type', 'application/json')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(400);

    expect(response.body.error).toEqual('Bad request');
  });

  it('should update task in repository because because the "finalized" parameter is not string', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'TASK@gmail.com' },
    });

    if (!user) throw new Error('ERROR USER NOT EXISTS');

    const response = await request(app)
      .get('/task')
      .set('authentication', `Bearer ${generateToken(user.id)}`)
      .expect(200);

    expect(response.body[0].title).toEqual('NEW TASK');
  });
});
