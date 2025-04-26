import Review from '../models/Review.js'; // Імпортуємо модель Review
import Camper from '../models/Camper.js'; // Імпортуємо модель Camper

export const addReview = async (req, res) => {
  const { camperId } = req.params; // Отримуємо id кемпера з параметрів
  const { reviewer_name, reviewer_rating, comment, email } = req.body; // Отримуємо дані відгуку з тіла запиту

  try {
    // Шукаємо кемпера за id
    const camper = await Camper.findById(camperId);
    if (!camper) {
      return res.status(404).json({ message: 'Кемпер не знайдений' });
    }

    // Створюємо новий відгук
    const newReview = new Review({
      camperId,          // Зберігаємо ID кемпера
      reviewer_name,     // Ім'я рецензента
      reviewer_rating,   // Оцінка рецензента
      comment,           // Коментар рецензента
      email,             // Електронна пошта рецензента (не обов'язково)
      createdAt: new Date(), // Дата створення відгуку
    });

    // Зберігаємо відгук в базі даних
    await newReview.save();

    // Відправляємо успішну відповідь
    res.status(201).json({ message: 'Відгук успішно додано', review: newReview });
  } catch (error) {
    console.error('Помилка додавання відгуку:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

