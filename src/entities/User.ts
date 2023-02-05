import { Task } from './Task';

interface User {
  id?: number;
  email: string;
  name: string;
  age: number;
  password: string;
  tasks?: Task[];
  email_code?: number;
  isEnabled?: boolean;
  createdAt?: Date;
}

export { User };
