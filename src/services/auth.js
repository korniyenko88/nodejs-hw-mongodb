import createHttpError from 'http-errors';
import userCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import path from 'path';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';

import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';
import { TEMPLATES_DIR } from '../constants/index.js';
import { sendEmail } from '../utils/sendEmail.js';
import { readFile } from 'node:fs/promises';
import { getEnvVar } from '../utils/getEnvVar.js';
import { SMTP } from '../constants/index.js';
import { sendResetMail } from '../utils/sendResetMail.js';



const emailTemplatePath = path.join(TEMPLATES_DIR, 'verify-email.html');
const emailTemplateSource = await readFile(emailTemplatePath, 'utf-8');
const appDomain = getEnvVar('APP_DOMEIN');
const jwtSecret = getEnvVar('JWC_SECRET');


const createSessionData = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifetime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifetime,
});

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

  const template = Handlebars.compile(emailTemplateSource);

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

   const html = template({
     link: `${appDomain}/auth/verify?token=${token}`,
   });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html,
  };
   await sendEmail(verifyEmail);

  return newUser;
};

export const requestResetToken = async (email) => {
  const user = await userCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWC_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath, 'utf-8')
  ).toString();

  const template = Handlebars.compile(templateSource);
  console.log('Compiled template:', template);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMEIN')}/reset-password?token=${resetToken}`,
  });


  try {
    await sendResetMail({
      from: getEnvVar(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
 }
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWC_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await userCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await userCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
   await SessionCollection.deleteOne({ userId: user._id });
};

export const verify = async token => {
  try {
    const { email } = jwt.verify(token, jwtSecret);
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw createHttpError(401, "User not found!")
    }
    await userCollection.findOneAndUpdate({ _id: user._id }, { verify: true });
  }
  catch (error) {
    throw createHttpError(401, error.message);
  }
};

export const login = async ({ email, password }) => {
  const user = await userCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  if (!user.verify) {
    throw createHttpError(401, 'Email is not verified!');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSessionData();

  return SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refreshToken = async (payload) => {
  console.log('Payload:', payload);
  const oldSession = await SessionCollection.findOne({
    refreshToken: payload.refreshToken,
    _id: payload.sessionId,
  });
  console.log('Old session:', oldSession);

  if (!oldSession) {
    throw createHttpError(401, 'Ssesion not found!');
  }

  if (Date.now() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired!');
  }

  await SessionCollection.deleteOne({ _id: payload.sessionId });
  const sessionData = createSessionData();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });
};

export const logout = async (sessionId) => await SessionCollection.deleteOne({_id: sessionId});

export const getSession = (filter) => SessionCollection.findOne(filter);

export const getUser = (filter) => userCollection.findOne(filter);
