import { User } from './User';

interface Task {
  id?: number;
  title: string;
  description?: string;
  author?: User;
  authorId: number;
  finalized: boolean;
  createdAt?: Date;
  deleteAt?: Date;
}

export { Task };
