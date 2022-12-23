import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(routes);

export { app };
