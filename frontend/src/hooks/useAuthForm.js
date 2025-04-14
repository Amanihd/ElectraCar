import { useState } from 'react';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const useAuthForm = (fields = []) => {
  const [values, setValues] = useState(() =>
    fields.reduce((acc, key) => ({ ...acc, [key]: initialValues[key] || '' }), {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};

    if (fields.includes('firstName')) {
      if (!values.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (!/^[a-zA-Z]+$/.test(values.firstName)) {
        newErrors.firstName = 'First name should contain only letters';
      } else if (values.firstName.length < 2 || values.firstName.length > 30) {
        newErrors.firstName = 'First name should be 2-30 characters';
      }
    }

    if (fields.includes('lastName')) {
      if (!values.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      } else if (!/^[a-zA-Z]+$/.test(values.lastName)) {
        newErrors.lastName = 'Last name should contain only letters';
      } else if (values.lastName.length < 2 || values.lastName.length > 30) {
        newErrors.lastName = 'Last name should be 2-30 characters';
      }
    }

    if (fields.includes('email')) {
      if (!values.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    if (fields.includes('password')) {
      if (!values.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (values.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)) {
        newErrors.password = 'Password must contain letters and numbers';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};

export default useAuthForm;
