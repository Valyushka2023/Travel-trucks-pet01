// import Camper from '../models/CamperModel.js';
// import mongoose from 'mongoose';

// // Отримання всіх кемперів
// export const getCampers = async (req, res) => {
//   try {
//     const campers = await Camper.find(); // Отримуємо всі документи з колекції 'campers'
//     res.json(campers);
//   } catch (error) {
//     res.status(500).json({ message: 'Помилка сервера', error });
//   }
// };

// // Отримання конкретного кемпера за ID
// export const getCamperById = async (req, res) => {
//   try {
//     const camper = await Camper.aggregate([
//       {
//         $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           description: 1,
//           price: 1,
//           rating: 1,
//           location: 1,
//           id: 1,
//           form: 1,
//           length: 1,
//           width: 1,
//           height: 1,
//           tank: 1,
//           consumption: 1,
//           transmission: 1,
//           engine: 1,
//           AC: 1,
//           bathroom: 1,
//           kitchen: 1,
//           TV: 1,
//           radio: 1,
//           refrigerator: 1,
//           microwave: 1,
//           gas: 1,
//           water: 1,
//           gallery: 1,
//           reviews: {
//             $sortArray: {
//               input: '$reviews',
//               sortBy: { createdAt: -1 },
//             },
//           },
//         },
//       },
//     ]);

//     if (!camper || camper.length === 0) {
//       return res.status(404).json({ message: 'Кемпер не знайдений' });
//     }

//     res.json(camper[0]);
//   } catch (error) {
//     res.status(500).json({ message: 'Помилка сервера', error });
//   }
// };

// // Додавання відгуку для конкретного кемпера
// export const addReview = async (req, res) => {
//   const { camperId } = req.params; // Отримуємо id кемпера з параметрів
//   const { reviewer_name, reviewer_rating, comment, email } = req.body; // Отримуємо дані відгуку з тіла запиту

//   try {
//     // Шукаємо кемпера за id
//     const camper = await Camper.findById(camperId);
//     if (!camper) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'Кемпер не знайдений' });

//       // return res.status(404).json({ message: 'Кемпер не знайдений' });
//     }

//     // Створюємо об'єкт відгука, який відповідає вбудованій схемі
//     const newReview = {
//       reviewer_name,
//       reviewer_rating,
//       comment,
//       email,
//       createdAt: new Date(),
//     };

//     // Додаємо новий відгук на початок масиву відгуків
//     camper.reviews.unshift(newReview);

//     // Перераховуємо середній рейтинг
//     let totalRating = 0;
//     if (camper.reviews.length > 0) {
//       totalRating = camper.reviews.reduce(
//         (sum, review) => sum + review.reviewer_rating,
//         0
//       );
//     }
//     const averageRating =
//       camper.reviews.length > 0 ? totalRating / camper.reviews.length : 0;
//     camper.rating = averageRating;

//     // Зберігаємо оновлений документ кемпера
//     await camper.save();

//     res.status(201).json({
//       success: true,
//       message: 'Відгук успішно додано',
//       camper: camper,
//     });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         success: false,
//         message: "Будь ласка, заповніть обов'язкові поля.",
//       });
//     }
//     res.status(500).json({ success: false, message: 'Помилка сервера', error });
//   }
// };
import Camper from '../models/CamperModel.js';
import mongoose from 'mongoose';

// =========================================================================
// ✅ Отримання всіх кемперів з підтримкою перекладу (БЕЗ ЗМІН)
// =========================================================================
export const getCampers = async (req, res) => {
  try {
    const langCode = req.query.lang || 'en';
    let campers = await Camper.find().lean();

    const translatedCampers = campers.map(camper => {
      let descriptionToUse = camper.description;

      if (langCode === 'uk' && camper.description_uk) {
        descriptionToUse = camper.description_uk;
      }

      const translatedCamper = {
        ...camper,
        description: descriptionToUse,
      };

      delete translatedCamper.description_uk;
      return translatedCamper;
    });

    res.json(translatedCampers);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// =========================================================================
// ✅ Отримання конкретного кемпера за ID: Відновлено ВСІ пропущені поля
// =========================================================================
export const getCamperById = async (req, res) => {
  try {
    // 1. Отримання мови з query parameters
    const langCode = req.query.lang || 'en';

    const camper = await Camper.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          // 💥 ЛОГІКА ПЕРЕКЛАДУ (НОВЕ)
          description: {
            $cond: {
              if: {
                $and: [
                  { $eq: [langCode, 'uk'] },
                  { $ne: ['$description_uk', null] },
                ],
              },
              then: '$description_uk',
              else: '$description',
            },
          },
          price: 1, // ✅ ВІДНОВЛЕНО
          rating: 1, // ✅ ВІДНОВЛЕНО
          location: 1, // ✅ ВІДНОВЛЕНО
          id: 1, // ✅ ВІДНОВЛЕНО
          form: 1, // ✅ ВІДНОВЛЕНО
          length: 1, // ✅ ВІДНОВЛЕНО
          width: 1, // ✅ ВІДНОВЛЕНО
          height: 1, // ✅ ВІДНОВЛЕНО
          tank: 1, // ✅ ВІДНОВЛЕНО
          consumption: 1, // ✅ ВІДНОВЛЕНО
          transmission: 1, // ✅ ВІДНОВЛЕНО
          engine: 1, // ✅ ВІДНОВЛЕНО
          AC: 1, // ✅ ВІДНОВЛЕНО (для іконок)
          bathroom: 1, // ✅ ВІДНОВЛЕНО (для іконок)
          kitchen: 1, // ✅ ВІДНОВЛЕНО (для іконок)
          TV: 1, // ✅ ВІДНОВЛЕНО
          radio: 1, // ✅ ВІДНОВЛЕНО
          refrigerator: 1, // ✅ ВІДНОВЛЕНО
          microwave: 1, // ✅ ВІДНОВЛЕНО
          gas: 1, // ✅ ВІДНОВЛЕНО
          water: 1, // ✅ ВІДНОВЛЕНО
          gallery: 1, // ✅ ВІДНОВЛЕНО (для галереї)
          reviews: {
            $sortArray: {
              input: '$reviews',
              sortBy: { createdAt: -1 },
            },
          }, // ✅ ВІДНОВЛЕНО
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

// =========================================================================
// Додавання відгуку (БЕЗ ЗМІН)
// =========================================================================
export const addReview = async (req, res) => {
  const { camperId } = req.params;
  const { reviewer_name, reviewer_rating, comment, email } = req.body;

  try {
    const camper = await Camper.findById(camperId);
    if (!camper) {
      return res
        .status(404)
        .json({ success: false, message: 'Кемпер не знайдений' });
    }

    const newReview = {
      reviewer_name,
      reviewer_rating,
      comment,
      email,
      createdAt: new Date(),
    };

    camper.reviews.unshift(newReview);

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

    await camper.save();

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
