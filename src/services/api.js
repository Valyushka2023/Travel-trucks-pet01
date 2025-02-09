import axios from "axios";


const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = async (params = {}) => { // Додаємо params за замовчуванням пустий об'єкт
  try {
    const searchParams = new URLSearchParams(params); // Створюємо URLSearchParams

    const response = await axios.get(`${BASE_URL}?${searchParams}`); // Використовуємо URLSearchParams

    if (!Array.isArray(response.data)) {
      console.error("API did not return an array:", response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    return [];
  }
};
