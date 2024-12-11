import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const boostrap = async () => {
    await initMongoDB();
  setupServer();
};

boostrap();
