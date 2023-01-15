import { Task } from '@/entities';
import { TaskRepositoryProtocol } from '@/repositories';

class TaskRepositoryMock implements TaskRepositoryProtocol {
  private readonly Tasks: Task[] = [];

  async findTaskById(taskId: number): Promise<Task | null> {
    const task = this.Tasks.find((task) => task.id === taskId);
    return task ? task : null;
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    const tasks = this.Tasks.filter((task) => task.authorId === userId);
    return tasks;
  }

  async add(props: Task): Promise<void> {
    this.Tasks.push({
      ...props,
      id: this.Tasks.length + 1,
      createdAt: new Date(),
    });
  }

  async modify(props: Task): Promise<void> {
    const indexUser = this.Tasks.findIndex(
      (userRepository) => userRepository.id === props.id,
    );
    let taskModified: Task = this.Tasks[indexUser];
    taskModified = {
      ...taskModified,
      title: props.title ? props.title : taskModified.title,
      description: props.description
        ? props.description
        : taskModified.description,
      finalized: props.finalized ? props.finalized : taskModified.finalized,
      deleteAt: props.finalized ? new Date() : taskModified.deleteAt,
    };
    this.Tasks[indexUser] = taskModified;
  }
}

export { TaskRepositoryMock };
