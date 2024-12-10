import express from 'express';
import pino from 'pino-http';
import dotenv from 'dotenv';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cros());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (reg, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });
    
    
    
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
};
