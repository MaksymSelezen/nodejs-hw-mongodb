import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {
  getAllContacts,
  getContactById,
} from './controllers/contactController.js';

export function setupServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.get('/contacts', getAllContacts);
  app.get('/contacts/:id', getContactById);

  app.use((req, res) => {
    res
      .status(404)
      .json({ status: 404, message: "Sorry, can't find that!", data: null });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}
