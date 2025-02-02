// src/components/GoogleLoginButton.js
import React from 'react';
import API from '../../api.js';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Get the Google OAuth URL from the backend
      const response = await API.get('api/auth/google/redirect');
      
      // Redirect the user to Google's OAuth page
      window.location.href = response.data;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
