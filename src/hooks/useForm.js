// import { useState, useCallback } from 'react';

// const useForm = (initialState, validationRules, onSubmit) => {
//   const [formData, setFormData] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
//   const [submissionError, setSubmissionError] = useState(null);

//   const validateField = useCallback(
//     (name, value) => {
//       if (validationRules[name]) {
//         return validationRules[name](value, formData);
//       }
//       return null;
//     },
//     [validationRules, formData]
//   );

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     Object.keys(initialState).forEach(key => {
//       const error = validateField(key, formData[key]);
//       if (error) {
//         newErrors[key] = error;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData, validateField, initialState]);

//   const handleInputChange = useCallback(
//     e => {
//       const { name, value } = e.target;
//       setFormData(prev => ({ ...prev, [name]: value }));
//       setSubmissionError(null);

//       // Валідація відбувається лише, якщо була спроба відправлення
//       if (hasAttemptedSubmit) {
//         const fieldError = validateField(name, value);
//         setErrors(prev => ({ ...prev, [name]: fieldError }));
//       }
//     },
//     [validateField, hasAttemptedSubmit]
//   );

//   const handleDateChange = useCallback(
//     (date, name) => {
//       setFormData(prev => ({ ...prev, [name]: date }));
//       setSubmissionError(null);

//       // Валідація відбувається лише, якщо була спроба відправлення
//       if (hasAttemptedSubmit) {
//         const fieldError = validateField(name, date);
//         setErrors(prev => ({ ...prev, [name]: fieldError }));
//       }
//     },
//     [validateField, hasAttemptedSubmit]
//   );

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setHasAttemptedSubmit(true); // Тепер ця змінна включає валідацію

//     const formIsValid = validateForm();
//     if (!formIsValid) return;

//     setIsSubmitting(true);
//     setSubmissionError(null);

//     try {
//       await onSubmit(formData);
//     } catch (err) {
//       setSubmissionError(
//         err.message || 'Something went wrong. Please try again.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     errors,
//     isSubmitting,
//     hasAttemptedSubmit,
//     submissionError,
//     handleInputChange,
//     handleDateChange,
//     handleSubmit,
//   };
// };

// export default useForm;
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // ✅ ДОДАНО: Для доступу до поточної мови

const useForm = (initialState, validationRules, onSubmit) => {
  // 1. Стан
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  // 2. Доступ до i18n
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Поточна мова, яка буде залежністю

  // 3. Функції валідації (без змін, оскільки вони коректно залежать від formData)
  const validateField = useCallback(
    (name, value) => {
      if (validationRules[name]) {
        // validationRules[name] отримує t() від батьківського компонента
        return validationRules[name](value, formData);
      }
      return null;
    },
    [validationRules, formData]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(initialState).forEach(key => {
      // Викликаємо validateField, який залежить від validationRules,
      // що оновлюється при зміні мови.
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField, initialState]);

  // 4. ✅ ЕФЕКТ: Повторна валідація при зміні мови
  useEffect(() => {
    // Цей ефект спрацьовує при зміні мови (currentLanguage) або при першій спробі відправки
    if (hasAttemptedSubmit) {
      // Якщо помилки вже відображаються, перевіряємо всю форму заново.
      // Це змусить t() всередині FormBooking.jsx перекласти повідомлення.
      validateForm();
    }
  }, [currentLanguage, hasAttemptedSubmit, validateForm]);
  // validateForm додається як залежність, але оскільки він використовує useCallback,
  // він не буде викликати нескінченний цикл.

  // 5. Обробники вводу (без змін)
  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      setSubmissionError(null);

      if (hasAttemptedSubmit) {
        const fieldError = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    },
    [validateField, hasAttemptedSubmit]
  );

  const handleDateChange = useCallback(
    (date, name) => {
      setFormData(prev => ({ ...prev, [name]: date }));
      setSubmissionError(null);

      if (hasAttemptedSubmit) {
        const fieldError = validateField(name, date);
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    },
    [validateField, hasAttemptedSubmit]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const formIsValid = validateForm();
    if (!formIsValid) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setSubmissionError(
        err.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Повернення
  return {
    formData,
    errors,
    isSubmitting,
    hasAttemptedSubmit,
    submissionError,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useForm;
