import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import routes from './routes';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  const asciiArt = `
      🏃‍♂️ Vertical Slice API is Running!

              O
              /|\\
              / \\
      Run, dev, run!

  Server time: ${new Date().toISOString()}
  `;

  res.setHeader('Content-Type', 'text/plain');
  res.send(asciiArt);
});

app.use(express.json());
app.use(requestLogger);
app.use('/api', routes);
app.use(errorHandler);

export default app;
