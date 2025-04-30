import Camper from '../models/CamperModel.js'; // Імпортуємо модель Camper

export const addReview = async (req, res) => {
  const { camperId } = req.params; // Отримуємо id кемпера з параметрів
  const { reviewer_name, reviewer_rating, comment, email } = req.body; // Отримуємо дані відгуку з тіла запиту

  try {
    // Шукаємо кемпера за id
    const camper = await Camper.findById(camperId);
    if (!camper) {
      return res.status(404).json({ message: 'Кемпер не знайдений' });
    }

    // Створюємо об'єкт відгука, який відповідає вбудованій схемі
    const newReview = {
      reviewer_name,
      reviewer_rating,
      comment,
      email,
      createdAt: new Date(),
    };

    // Додаємо новий відгук до масиву відгуків кемпера
    camper.reviews.push(newReview);

    // Зберігаємо оновлений документ кемпера
    await camper.save();

    // Перераховуємо середній рейтинг (за бажанням, можна робити і на фронтенді)
    let totalRating = 0;
    if (camper.reviews.length > 0) {
      totalRating = camper.reviews.reduce(
        (sum, review) => sum + review.reviewer_rating,
        0
      );
    }
    const averageRating =
      camper.reviews.length > 0 ? totalRating / camper.reviews.length : 0;
    camper.rating = averageRating;
    await camper.save(); // Знову зберігаємо кемпера з оновленим рейтингом

    // Відправляємо успішну відповідь з оновленими даними кемпера
    res.status(201).json({ message: 'Відгук успішно додано', camper: camper });
  } catch {
    res.status(500).json({ message: 'Помилка сервера' });
  }
};
