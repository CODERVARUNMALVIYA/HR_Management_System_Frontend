import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust the import based on your project structure
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Slice/authSlice'; // Action to save user data
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await axios.post('/employee/login', { email, password });
      console.log('Login successful:', response.data);
      dispatch(loginSuccess(response.data)); // Dispatch success action with user data
      navigate('/employee/profile'); // Redirect to profile page after login
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      setError(err.response?.data.message || 'An error occurred during login.'); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
