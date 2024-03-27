import { useState } from 'react';

const useRegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = {};

        if (formData.username.length < 6) {
            errors.username = 'Username should have more than 5 characters';
        }

        if (formData.password.length < 7) {
            errors.password = 'Password should have more than 6 characters';
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (formData.phoneNumber.length !== 11) {
            errors.phoneNumber = 'Phone number should have exactly 11 digits';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                console.log(data);
                // Handle the response from the backend
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            setValidationErrors(errors);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        validationErrors,
    };
};

export default useRegistrationForm;