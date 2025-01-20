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

export const sendEmail = (data) => {
  const email = { ...data, from: getEnvVar(SMTP.SMTP_FROM) };
  return transport.sendMail(email);
};

// const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.ukr.net',
//   port: 465, // 25, 465, 887, 2525
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// /*
// const data = {
//     to: "xocir12840@fenxz.com",
//     subject: "Hello from ukr.net",
//     html: "<h1>Welcome to ukr.net</h1>",
// };
// */

// export const sendEmail = (data) => {
//   const email = { ...data, from: UKR_NET_EMAIL };
//   return transport.sendMail(email);
// };
