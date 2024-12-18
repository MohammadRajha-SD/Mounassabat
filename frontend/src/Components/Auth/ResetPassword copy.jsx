import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();  // Destructure token from useParams

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
//   const token = queryParams.get('token'); // Get the token from the URL

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://mounassabat.ma/api/reset-password', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token,
      });

      if (response.data.success) {
        setSuccess(true);
        setError(null);
        // Optionally redirect after success
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {success ? (
          <div className="text-center text-green-500">
            <p>Password reset successful! You can now log in with your new password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
