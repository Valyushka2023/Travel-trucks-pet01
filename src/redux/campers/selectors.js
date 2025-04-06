
//  селектор, який повертає список кемперів або порожній масив, якщо дані ще не завантажені.
//  export const selectCampers — експортуємо іменовану функцію selectCampers, щоб її можна було використовувати в інших файлах.
//  (state) => — оголошуємо функцію, яка приймає state (глобальний стан Redux).
//  state.campers?.items || [] —
//  state.campers?.items – перевіряємо, чи існує state.campers, і якщо так, то повертаємо items.
//  || [] – якщо items не існує (наприклад, undefined або null), повертаємо порожній масив [].
//  Це захищає код від помилок, якщо state.campers ще не ініціалізований.

export const selectCampers = (state) => state.campers?.items || [];

// селектор, який  повертає булеве значення true або false, що вказує, чи триває завантаження даних.
// export const selectIsLoading — експортуємо селектор selectIsLoading.
// (state) => state.campers.isLoading — функція отримує state і повертає значення isLoading.
export const selectIsLoading = (state) => state.campers.isLoading;


// селектор, який  повертає інформацію про можливу помилку, якщо вона сталася під час запиту даних
// export const selectError — експортуємо селектор selectError.
// (state) => state.campers.error — функція отримує state і повертає error, якщо є помилка.
export const selectError = (state) => state.campers.error;

