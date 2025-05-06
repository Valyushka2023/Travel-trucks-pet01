// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   id: number, // Унікальний ідентифікатор заявки
//   camperId: string, // ID заброньованого кемпера
//   name: string, // Ім'я користувача
//   email: string, // Email користувача
//   bookingDate: string, // Дата бронювання
//   comment: string, // Коментар користувача (необов'язково)
//   createdAt: Date, // Дата створення заявки
//   status: 'pending' | 'processing' | 'confirmed' | 'rejected', // Статус заявки
//   // Інші поля, якщо потрібно (наприклад, контактний телефон)
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// export default Booking;

// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   id: {
//     type: Number, // Унікальний ідентифікатор заявки
//     required: true,
//   },
//   camperId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   bookingDate: {
//     type: String,
//     required: true,
//   },
//   comment: {
//     type: String,
//     default: '', // необов'язковий
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'confirmed', 'rejected'],
//     default: 'pending',
//   },
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// export default Booking;

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  camperId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: '', // необов'язковий
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'confirmed', 'rejected'],
    default: 'pending',
  },
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

export default Booking;
