import React from 'react';
import useRegistrationForm from './useRegistrationForm';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const {
        formData,
        handleChange,
        handleSubmit,
        validationErrors,
    } = useRegistrationForm();

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-container">
                <label className="input-label">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                />
                {validationErrors.username && <span className="error-message">{validationErrors.username}</span>}
            </div>
            <div className="input-container">
                <label className="input-label">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                />
                {validationErrors.password && <span className="error-message">{validationErrors.password}</span>}
            </div>
            <div className="input-container">
                <label className="input-label">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                />
                {validationErrors.confirmPassword && <span className="error-message">{validationErrors.confirmPassword}</span>}
            </div>
            <div className="input-container">
                <label className="input-label">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                />
                {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
            </div>
            <div className="input-container">
                <label className="input-label">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input-field"
                />
                {validationErrors.phoneNumber && <span className="error-message">{validationErrors.phoneNumber}</span>}
            </div>
            <button type="submit" disabled={Object.keys(validationErrors).length > 0} className="register-button">
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;