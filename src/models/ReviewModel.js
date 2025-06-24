// // Якщо ти використовуєш тільки як субсхему — залишаємо тільки схему:
// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//   camperId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Camper', // Вказуємо на модель Camper для зв'язку
//     required: true,
//   },
//   reviewer_name: {
//     type: String,
//     required: true,
//   },
//   reviewer_rating: {
//     type: Number,
//     required: true,
//   },
//   comment: {
//     type: String,
//     required: false,
//   },
//   email: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Review = mongoose.model('Review', reviewSchema);

// export default Review;
