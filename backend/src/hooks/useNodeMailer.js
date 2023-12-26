import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'kietletest.dev@gmail.com',
    pass: 'jeri zckh zqkv kblv',
  },
});
