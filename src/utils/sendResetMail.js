import nodemailer from 'nodemailer';
import 'dotenv/config';
import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

// const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
//   process.env;

const nodemailerConfig = {
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendResetMail = async (options) => {
  return await transport.sendMail(options);
};
