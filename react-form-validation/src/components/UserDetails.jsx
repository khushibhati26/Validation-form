import React from 'react';

const UserDetails = ({ userData, onBack }) => {
  return (
    <div className="details-container">
      <div className="details-wrapper">
        <h2>Registration Successful!</h2>
        <div className="user-details">
          <div className="detail-group">
            <h3>Personal Information</h3>
            <div className="detail-row">
              <span className="label">First Name:</span>
              <span className="value">{userData.firstName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Last Name:</span>
              <span className="value">{userData.lastName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Username:</span>
              <span className="value">{userData.username}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Contact Information</h3>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Phone:</span>
              <span className="value">{userData.countryCode} {userData.phoneNumber}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Location</h3>
            <div className="detail-row">
              <span className="label">Country:</span>
              <span className="value">{userData.country}</span>
            </div>
            <div className="detail-row">
              <span className="label">City:</span>
              <span className="value">{userData.city}</span>
            </div>
          </div>

          <div className="detail-group">
            <h3>Identity Information</h3>
            <div className="detail-row">
              <span className="label">PAN Number:</span>
              <span className="value">{userData.panNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Aadhar Number:</span>
              <span className="value">{userData.aadharNumber}</span>
            </div>
          </div>
        </div>

        <button onClick={onBack} className="back-btn">
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default UserDetails;