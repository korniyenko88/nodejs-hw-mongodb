import { initMpngoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const boostrap = async () => {
    await initMpngoDB();
  setupServer();
};

boostrap();
