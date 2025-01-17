import nodemailer from 'nodemailer';
import 'dotenv/config';


const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465, // 25, 465, 887, 2525
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

/*
const data = {
    to: "xocir12840@fenxz.com",
    subject: "Hello from ukr.net",
    html: "<h1>Welcome to ukr.net</h1>",
};
*/

export const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};