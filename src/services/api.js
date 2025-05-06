import axios from 'axios';

const BASE_URL = '/campers'; // Твій поточний базовий URL для кемперів
const BOOKINGS_ENDPOINT = '/bookings'; // Додамо endpoint для бронювань
const BACKEND_BASE_URL = 'http://localhost:5001';
// const BACKEND_BASE_URL = 'http://your-backend-domain.com/api';

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
    // console.error('Error fetching campers:', error);
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
    // console.error('Error sending review:', error);
    return null;
  }
};

export const sendBookingRequest = async bookingData => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}${BOOKINGS_ENDPOINT}`,
      bookingData
    );
    return response.data; // Очікуємо, що backend поверне { success: boolean, message?: string }
  } catch (_error) {
    // console.error('Error sending booking request:', error);
    return {
      success: false,
      message: _error.message || 'Failed to connect to the server.',
    };
  }
};
