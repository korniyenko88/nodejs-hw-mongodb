// src/index.js
import pino from 'pino-http';
import express from 'express';
import cors from 'cors';

const PORT = 3000;

const app = express();

// Middleware для логування часу запиту
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// наприклад, у запитах POST або PATCH
app.use(express.json());

// Маршрут для обробки GET-запитів на '/'
app.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

// Middleware для обробких помилок (приймає 4 аргументи)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
  });
});

app.use('*', (reg, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, reg, res, next) => {
  res.status(500).json({
      massege: 'Something went wrone ',
      error:err.massege,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use(cors());
