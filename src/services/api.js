

import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const handleApiError = (error) => {
    if (error.response) {
        console.error("API returned error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
    } else if (error.request) {
        if (error.message && error.message.includes("Network Error")) {
            console.error("Connection error, no data available");
        } else {
            console.error("No response received from API:", error.request);
        }
    } else {
        if (error.message && error.message.includes("Network Error")) {
            console.error("Connection error, no data available");
        } else {
            console.error("Error setting up request:", error.message);
        }
    }
    return [];
};

export const fetchCampers = async (params = {}) => {
    try {
        const searchParams = new URLSearchParams(params).toString();
        const url = searchParams ? `${BASE_URL}?${searchParams}` : BASE_URL;

        const response = await axios.get(url);
        console.log("API response data:", response.data);
        if (response.status !== 200) {
            console.error(`API returned status code: ${response.status}`);
            return [];
        }

        console.log("API response data:", response.data); // Додано для перевірки структури

        try {
            // Спробуйте розпарсити дані
            const data = JSON.parse(JSON.stringify(response.data));
            console.log("Parsed API data:", data); // Виведення розпарсених даних для перевірки

            // Перевірка структури даних
            if (Array.isArray(data)) {
                console.log("API response data (array):", data);
                return data;
            } else if (data && data.items && Array.isArray(data.items)) {
                console.log("API response data (items):", data.items);
                return data.items;
            } else {
                console.error("API did not return an array:", data);
                return [];
            }
        } catch (parseError) {
            // Обробка помилки парсингу
            console.error("Error parsing JSON:", parseError);
            return []; // Повертаємо порожній масив у випадку помилки парсингу
        }
    } catch (error) {
        return handleApiError(error);
    }
};

export const sendReview = async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData); // Додаємо /reviews до BASE_URL

    if (response.status === 201) { // 201 Created - успішно створено
      console.log("Відгук успішно відправлено:", response.data);
      return response.data; // Повертаємо дані відгуку з сервера
    } else {
      console.error("Помилка відправлення відгуку:", response.status);
      return null; // Повертаємо null у випадку помилки
    }
  } catch (error) {
    console.error("Помилка відправлення відгуку:", error);
    return null; // Повертаємо null у випадку помилки
  }
};



