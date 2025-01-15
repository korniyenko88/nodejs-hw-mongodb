import createHttpError from 'http-errors';
import userCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import bcrypt from 'bcrypt';

import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';

export const registr = async (payload) => {
  const { email, password } = payload;
  const user = await userCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userCollection.create({
    ...payload,
    password: hashPassword,
  });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await userCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifetime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
  });
};

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => userCollection.findOne(filter);