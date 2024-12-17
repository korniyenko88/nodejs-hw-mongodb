import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';

import { logger } from './middlewares/logger.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();
  const PORT = Number(getEnvVar('PORT', 3000));
  app.use(logger);

  app.use(express.json());
  app.use(cors());

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
