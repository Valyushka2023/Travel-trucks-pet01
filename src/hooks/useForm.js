import { useState, useCallback } from 'react';

const useForm = (initialState, validationRules, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const validateField = useCallback(
    (name, value) => {
      if (validationRules[name]) {
        return validationRules[name](value, formData);
      }
      return null;
    },
    [validationRules, formData]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(initialState).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField, initialState]);

  const handleInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      setSubmissionError(null);

      // Валідація відбувається лише, якщо була спроба відправлення
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

      // Валідація відбувається лише, якщо була спроба відправлення
      if (hasAttemptedSubmit) {
        const fieldError = validateField(name, date);
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    },
    [validateField, hasAttemptedSubmit]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    setHasAttemptedSubmit(true); // Тепер ця змінна включає валідацію

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
