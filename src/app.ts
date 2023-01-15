import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { sessionRoutes, taskRoutes, userRoutes } from './routes';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(sessionRoutes);
app.use(userRoutes);
app.use(taskRoutes);

export { app };
