import React from 'react';

const RegistrationFormInput = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
}) => (
    <div>
        <label>
            {label}:
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </label>
        {error && <span>{error}</span>}
    </div>
);

export default RegistrationFormInput;