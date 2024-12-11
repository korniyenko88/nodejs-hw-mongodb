import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

// password  mongodb:  _fbQW_d7p%40nK3DQ  //xXyOqVU4YII12yNt
// login: korniyenko

export const initMongoDB = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

   
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(`Error connecting to Mongo: ${error.message}`); 
    throw error;
  }
};
