// src/components/GoogleLoginButton.js
import React from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Get the Google OAuth URL from the backend
      const response = await axios.get('http://127.0.0.1:8000/api/auth/google/redirect');
      
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
