import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (reg, res) => {
    res.json;
    ({
      message: 'Hello world'
    });
  });

  app.use('*', (reg, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, reg, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
