import mongoose from 'mongoose';

// password  mongodb:  _fbQW_d7p%40nK3DQ  //xXyOqVU4YII12yNt
// login: korniyenko



export const initMpngoDB = async () => {
  try {
   await mongoose.connect(
     'mongodb+srv://korniyenko:_fbQW_d7p%40nK3DQ@cluster0.bpx7j.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0',
   );

    console.log('Mongo connection successfully');
  } catch (error) {
    console.log(`Error connection Mongo ${error.message}`);
    throw error;
  }
};
