import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import * as contactServices from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();
  const PORT = Number(getEnvVar('PORT', 3000));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(express.json());
  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const data = await contactServices.getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id=${contactId} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id=${contactId}!`,
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
