import userCollection from '../db/models/User.js';

export const registr = async (payload) => {
  const newUser = await userCollection.create(payload);

  return newUser;
};
