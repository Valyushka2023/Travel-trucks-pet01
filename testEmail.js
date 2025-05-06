// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST, // smtp-relay.brevo.com
//   port: Number(process.env.SMTP_PORT), // 587
//   secure: false, // для порту 587
//   auth: {
//     user: process.env.SMTP_USER, // твій email
//     pass: process.env.SMTP_PASSWORD, // згенерований SMTP ключ
//   },
//   tls: {
//     rejectUnauthorized: false, // опційно, щоб уникнути self-signed errors
//   },
// });

// const mailOptions = {
//   from: process.env.SMTP_FROM,
//   to: process.env.ADMIN_EMAIL, // можеш змінити на свою пошту
//   subject: '🔔 Тестовий лист з Brevo SMTP',
//   html: `<h2>Привіт!</h2><p>Це тестовий лист для перевірки SMTP-підключення.</p>`,
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('❌ Помилка надсилання:', error);
//   } else {
//     console.log('✅ Лист надіслано:', info.response);
//   }
// });
import dotenv from 'dotenv';
import { sendEmail } from '././src/config/sendEmail.js'; // заміни шлях на правильний

dotenv.config();

const runTest = async () => {
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL, // або введи прямо тут: 'твоя_пошта@gmail.com'
      subject: '📨 Тест від sendEmail()',
      html: '<h2>Це тестовий лист з реального коду!</h2><p>Перевірка успішна!</p>',
    });
    console.log('✅ Тестовий лист успішно надіслано');
  } catch (err) {
    console.error('❌ Помилка під час надсилання листа:', err);
  }
};

runTest();
