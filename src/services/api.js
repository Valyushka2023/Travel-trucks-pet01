// import axios from 'axios';

// const BASE_URL = '/campers'; // Базовий URL для кемперів
// const BOOKINGS_ENDPOINT = '/bookings';
// const BACKEND_BASE_URL = 'http://localhost:5001';

// // ✅ Отримати список усіх кемперів (з optional фільтрами)
// export const fetchCampers = async (params = {}) => {
//   try {
//     const searchParams = new URLSearchParams(params).toString();
//     const url = searchParams ? `${BASE_URL}?${searchParams}` : BASE_URL;

//     const response = await axios.get(url);

//     if (response.status !== 200) return [];

//     const data = response.data;

//     if (Array.isArray(data)) return data;
//     if (data?.items && Array.isArray(data.items)) return data.items;

//     return [];
//   } catch {
//     return [];
//   }
// };

// // ✅ Отримати одного кемпера за ID (нове!)
// export const fetchCamperById = async id => {
//   try {
//     if (!id) return null;

//     const response = await axios.get(`${BASE_URL}/${id}`);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };

// // ✅ Надіслати відгук
// export const sendReview = async reviewData => {
//   try {
//     const { camperId, ...reviewFields } = reviewData;

//     if (!camperId) {
//       return null;
//     }

//     const response = await axios.post(
//       `${BASE_URL}/${camperId}/reviews`,
//       JSON.stringify(reviewFields),
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (response.status === 201) {
//       return response.data; // Очікується, що тут буде оновлений camper
//     } else {
//       return null;
//     }
//   } catch {
//     return null;
//   }
// };

// // ✅ Надіслати запит на бронювання
// export const sendBookingRequest = async bookingData => {
//   try {
//     const response = await axios.post(
//       `${BACKEND_BASE_URL}${BOOKINGS_ENDPOINT}`,
//       bookingData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return response.data;
//   } catch (_error) {
//     return {
//       success: false,
//       message: _error.message || 'Failed to connect to the server.',
//     };
//   }
// };
import axios from 'axios';

const BASE_URL = '/campers'; // Базовий URL для кемперів
const BOOKINGS_ENDPOINT = '/bookings';
const BACKEND_BASE_URL = 'http://localhost:5001';

// ✅ Отримати список усіх кемперів (з optional фільтрами)
export const fetchCampers = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams ? `${BASE_URL}?${searchParams}` : BASE_URL;

    // 1. Лог перед відправкою запиту
    console.log('Sending request to API for campers. URL:', url);

    const response = await axios.get(url);

    // 2. Лог статусу відповіді від API
    console.log('API response status:', response.status);

    // 3. Лог сирих даних з відповіді API
    console.log('Raw data received from API:', response.data);

    if (response.status !== 200) {
      console.error('Received non-200 status. Returning empty array.');
      return [];
    }

    const data = response.data;

    if (Array.isArray(data)) {
      console.log('Data is a direct array. Proceeding.');
      return data;
    }
    if (data?.items && Array.isArray(data.items)) {
      console.log(
        'Data is an object with an "items" array. Returning "items".'
      );
      return data.items;
    }

    console.error(
      'Data format is incorrect. Not an array or object with "items".'
    );
    return [];
  } catch (error) {
    console.error('Error during API request for campers:', error);
    return [];
  }
};

// ✅ Отримати одного кемпера за ID (нове!)
export const fetchCamperById = async id => {
  try {
    if (!id) return null;

    const response = await axios.get(`${BASE_URL}/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// ✅ Надіслати відгук
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
      return response.data; // Очікується, що тут буде оновлений camper
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// ✅ Надіслати запит на бронювання
export const sendBookingRequest = async bookingData => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}${BOOKINGS_ENDPOINT}`,
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (_error) {
    return {
      success: false,
      message: _error.message || 'Failed to connect to the server.',
    };
  }
};
