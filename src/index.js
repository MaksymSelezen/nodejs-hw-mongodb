import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

export const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
