import { Task } from './Task';

interface User {
  id?: number;
  email: string;
  name: string;
  age: number;
  password: string;
  tasks?: Task[];
  createdAt?: Date;
}

export { User };
