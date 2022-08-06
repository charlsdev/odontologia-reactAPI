import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import resTime from 'response-time';
import { PORT } from './envCnf.js';

import loginRoutes from './routes/login.routes.js';

const app = express();

app.set('port', PORT);

app.use(cors());
app.use(resTime());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', loginRoutes);

export default app;