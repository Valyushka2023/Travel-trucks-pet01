import Camper from '../models/CamperModel.js';
import mongoose from 'mongoose';

// Отримання всіх кемперів
export const getCampers = async (req, res) => {
  try {
    const campers = await Camper.find(); // Отримуємо всі документи з колекції 'campers'
    res.json(campers);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Отримання конкретного кемпера за ID
export const getCamperById = async (req, res) => {
  try {
    const camper = await Camper.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          rating: 1,
          location: 1,
          id: 1,
          form: 1,
          length: 1,
          width: 1,
          height: 1,
          tank: 1,
          consumption: 1,
          transmission: 1,
          engine: 1,
          AC: 1,
          bathroom: 1,
          kitchen: 1,
          TV: 1,
          radio: 1,
          refrigerator: 1,
          microwave: 1,
          gas: 1,
          water: 1,
          gallery: 1,
          reviews: {
            $sortArray: {
              input: '$reviews',
              sortBy: { createdAt: -1 },
            },
          },
        },
      },
    ]);

    if (!camper || camper.length === 0) {
      return res.status(404).json({ message: 'Кемпер не знайдений' });
    }

    res.json(camper[0]);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Додавання відгуку для конкретного кемпера
export const addReview = async (req, res) => {
  const { camperId } = req.params; // Отримуємо id кемпера з параметрів
  const { reviewer_name, reviewer_rating, comment, email } = req.body; // Отримуємо дані відгуку з тіла запиту

  try {
    // Шукаємо кемпера за id
    const camper = await Camper.findById(camperId);
    if (!camper) {
      return res
        .status(404)
        .json({ success: false, message: 'Кемпер не знайдений' });

      // return res.status(404).json({ message: 'Кемпер не знайдений' });
    }

    // Створюємо об'єкт відгука, який відповідає вбудованій схемі
    const newReview = {
      reviewer_name,
      reviewer_rating,
      comment,
      email,
      createdAt: new Date(),
    };

    // Додаємо новий відгук на початок масиву відгуків
    camper.reviews.unshift(newReview);

    // Перераховуємо середній рейтинг
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

    // Зберігаємо оновлений документ кемпера
    await camper.save();

    // Відправляємо успішну відповідь з оновленими даними кемпера
    //     res.status(201).json({ message: 'Відгук успішно додано', camper: camper });
    //   } catch (error) {
    //     if (error.name === 'ValidationError') {
    //       // Обробка помилок валідації Mongoose
    //       const errors = Object.values(error.errors).map(el => el.message);
    //       return res.status(400).json({
    //         message: "Будь ласка, заповніть обов'язкові поля.",
    //         errors: errors,
    //       });
    //     }
    //     res.status(500).json({ message: 'Помилка сервера', error });
    //   }
    // };
    res.status(201).json({
      success: true,
      message: 'Відгук успішно додано',
      camper: camper,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Будь ласка, заповніть обов'язкові поля.",
      });
    }
    res.status(500).json({ success: false, message: 'Помилка сервера', error });
  }
};
