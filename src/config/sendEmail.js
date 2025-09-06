import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

// Створюємо транспортер
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Основна функція
export const sendEmail = async ({ to, subject, html }) => {
  // Перевірка параметрів
  if (!to || !subject || !html) {
    const errorMsg = `[EMAIL] Відсутні обов'язкові параметри для надсилання email: ${JSON.stringify({ to, subject, html })}`;
    logger.error(errorMsg);
    console.error('❌ [DEBUG] sendEmail():', errorMsg);
    throw new Error('Missing email parameters');
  }

  console.log('[DEBUG] Викликано sendEmail() з такими параметрами:', {
    to,
    subject,
    html,
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER, // fallback
    to,
    subject,
    html,
  };

  try {
    logger.info(
      `[EMAIL] Спроба відправити email на адресу: ${to}, тема: ${subject}`
    );
    const info = await transporter.sendMail(mailOptions);
    logger.info('✅ [EMAIL] Email успішно відправлено: %o', info);
    console.log('✅ [DEBUG] Email відправлено:', info.response);
  } catch (error) {
    logger.error(
      '❌ [EMAIL] Помилка відправлення email на адресу: %s, помилка: %o',
      to,
      error
    );
    console.error('❌ [DEBUG] sendEmail помилка:', error);
    throw new Error('Email sending failed');
  }
};
