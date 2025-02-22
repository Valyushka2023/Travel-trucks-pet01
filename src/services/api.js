import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = async (params = {}) => {
    try {
        const searchParams = new URLSearchParams(params);
        const response = await axios.get(`${BASE_URL}?${searchParams}`);

        if (response.status !== 200) {
            console.error(`API returned status code: ${response.status}`);
            return [];
        }

        if (response.data && response.data.items && Array.isArray(response.data.items)) {
            console.log("API response data:", response.data.items); // Логування даних
            return response.data.items;
        } else {
            console.error("API did not return an array:", response.data);
            return [];
        }
    } catch (error) {
        if (error.response) {
            console.error("API returned error:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received from API:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        return [];
    }
};