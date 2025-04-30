// import axios from 'axios';

// // const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// // const BASE_URL = "http://localhost:5001/api";
// // const BASE_URL = "/api";
// const BASE_URL = '/campers';

// const handleApiError = error => {
//   if (error.response) {
//     console.error('API повернув помилку:', error.response.data);
//     console.error('Код стану:', error.response.status);
//     console.error('Заголовки:', error.response.headers);
//   } else if (error.request) {
//     if (error.message && error.message.includes('Помилка мережі')) {
//       console.error('Помилка підключення, дані недоступні');
//     } else {
//       console.error('Відповіді від API не отримано:', error.request);
//     }
//   } else {
//     if (error.message && error.message.includes('Помилка мережі')) {
//       console.error('Помилка підключення, дані недоступні');
//     } else {
//       console.error('Помилка налаштування запиту:', error.message);
//     }
//   }
//   return [];
// };

// // Функція fetchCampers отримує список кемперів.
// export const fetchCampers = async (params = {}) => {
//   try {
//     const searchParams = new URLSearchParams(params).toString();
//     const url = searchParams ? `${BASE_URL}?${searchParams}` : BASE_URL;

//     console.log(`Зроблено запит на URL: ${url}`); // Логування URL

//     const response = await axios.get(url);

//     console.log('Отримано відповідь від API:', response); // Логування відповіді

//     if (response.status !== 200) {
//       console.error(`API повернув код стану: ${response.status}`);
//       return [];
//     }

//     const data = response.data;
//     console.log('Дані, отримані від API:', data); // Логування даних

//     if (Array.isArray(data)) {
//       return data;
//     } else if (data?.items && Array.isArray(data.items)) {
//       return data.items;
//     } else {
//       console.error('API не повернув масив:', data);
//       return [];
//     }
//   } catch (error) {
//     return handleApiError(error);
//   }
// };

// export const sendReview = async reviewData => {
//   try {
//     const { camperId, ...reviewFields } = reviewData;

//     if (!camperId) {
//       console.error(
//         'Для надсилання відгуку потрібен ідентифікатор кемпера (camperId)'
//       );
//       return null;
//     }

//     console.log(`Надсилання відгуку для кемпера з ID: ${camperId}`); // Логування ID кемпера

//     // const response = await axios.post(
//     //   `${BASE_URL}/${camperId}/reviews`,
//     //   JSON.stringify(reviewFields),
//     //   {
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //   }
//     // );
//     const response = await axios.post(
//       `${BASE_URL}/${camperId}/reviews`,
//       reviewFields,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log('Відповідь від API після відправлення відгуку:', response); // Логування відповіді

//     if (response.status === 201) {
//       console.log('Відгук успішно відправлено:', response.data);
//       return response.data;
//     } else {
//       console.error('Помилка відправлення відгуку:', response.status);
//       return null;
//     }
//   } catch (error) {
//     console.error('Помилка відправлення відгуку:', error);
//     return null;
//   }
// };

import axios from 'axios';

const BASE_URL = '/campers';

// const handleApiError = error => {
//   return [];
// };

// Функція fetchCampers отримує список кемперів.
export const fetchCampers = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${BASE_URL}?${searchParams}` : BASE_URL;

    const response = await axios.get(url);

    if (response.status !== 200) {
      return [];
    }

    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    } else if (data?.items && Array.isArray(data.items)) {
      return data.items;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export const sendReview = async reviewData => {
  try {
    const { camperId, ...reviewFields } = reviewData;

    if (!camperId) {
      return null;
    }

    const response = await axios.post(
      `${BASE_URL}/${camperId}/reviews`,
      JSON.stringify(reviewFields),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
