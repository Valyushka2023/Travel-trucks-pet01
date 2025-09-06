import axios from 'axios';

const BASE_URL = '/campers'; // Ця змінна більше не використовується для запитів API
const BOOKINGS_ENDPOINT = '/bookings';
const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Отримати список усіх кемперів (з optional фільтрами)
export const fetchCampers = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const url = searchParams
      ? `${BACKEND_BASE_URL}/campers?${searchParams}`
      : `${BACKEND_BASE_URL}/campers`;
    const response = await axios.get(url);

    // --- Логування після успішного запиту ---
    console.log(`GET request to ${url} succeeded. Status: ${response.status}`);
    console.log('Response data:', response.data);

    if (response.status !== 200) return [];

    const data = response.data;

    if (Array.isArray(data)) return data;
    if (data?.items && Array.isArray(data.items)) return data.items;

    return [];
  } catch (error) {
    // --- Логування помилки ---
    console.error(`Error fetching campers: ${error.message}`);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }
    return [];
  }
};

// ✅ Отримати одного кемпера за ID
export const fetchCamperById = async id => {
  try {
    if (!id) return null;

    // Виправлено: використовується повний шлях з BACKEND_BASE_URL
    const url = `${BACKEND_BASE_URL}/campers/${id}`;

    // --- Логування перед запитом ---
    console.log(`Sending GET request to: ${url}`);

    const response = await axios.get(url);

    // --- Логування після успішного запиту ---
    console.log(`GET request to ${url} succeeded. Status: ${response.status}`);
    console.log('Response data:', response.data);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    // --- Логування помилки ---
    console.error(`Error fetching camper by ID: ${error.message}`);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
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

    // Виправлено: використовується повний шлях з BACKEND_BASE_URL
    const response = await axios.post(
      `${BACKEND_BASE_URL}/campers/${camperId}/reviews`,
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
