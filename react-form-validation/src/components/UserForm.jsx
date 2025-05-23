import React, { useState } from 'react';
import { countriesData } from '../constants/countries';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.trim().length < 2) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name should contain only letters`;
        }
        break;

      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        break;

      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          error = 'Phone number must be 10 digits';
        }
        break;

      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;

      case 'city':
        if (!value) {
          error = 'City is required';
        }
        break;

      case 'panNumber':
        if (!value.trim()) {
          error = 'PAN number is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
          error = 'PAN number format should be ABCDE1234F';
        }
        break;

      case 'aadharNumber':
        if (!value.trim()) {
          error = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          error = 'Aadhar number must be 12 digits';
        }
        break;

      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    

    if (name === 'panNumber') {
      processedValue = value.toUpperCase();
    }
    
    
    if (name === 'aadharNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

 
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'country') {
      const selectedCountry = countriesData.find(c => c.name === value);
      setAvailableCities(selectedCountry ? selectedCountry.cities : []);
      setFormData(prev => ({
        ...prev,
        country: value,
        city: '' 
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.toString().trim() !== '') &&
           Object.values(errors).every(error => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+86', country: 'CN' },
    { code: '+81', country: 'JP' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+39', country: 'IT' },
    { code: '+7', country: 'RU' },
    { code: '+55', country: 'BR' }
  ];

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>User Registration Form</h2>
        <form onSubmit={handleSubmit} className="user-form">
       
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.firstName ? 'error' : ''}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

                   <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.lastName ? 'error' : ''}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

     
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

        
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

        
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <div className="phone-input">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="country-code"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.phoneNumber ? 'error' : ''}
                placeholder="Enter phone number"
              />
            </div>
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

        
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.country ? 'error' : ''}
            >
              <option value="">Select a country</option>
              {countriesData.map(country => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>

        
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.city ? 'error' : ''}
              disabled={!formData.country}
            >
              <option value="">Select a city</option>
              {availableCities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="panNumber">PAN Number *</label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.panNumber ? 'error' : ''}
              placeholder="ABCDE1234F"
              maxLength="10"
            />
            {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
          </div>

         
          <div className="form-group">
            <label htmlFor="aadharNumber">Aadhar Number *</label>
            <input
              type="text"
              id="aadharNumber"
       name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.aadharNumber ? 'error' : ''}
              placeholder="1234 5678 9012"
              maxLength="14"
            />
            {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
          </div>

          <button
            type="submit"
            className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;