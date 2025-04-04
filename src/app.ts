import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/api', routes);
app.use(errorHandler);

export default app;
