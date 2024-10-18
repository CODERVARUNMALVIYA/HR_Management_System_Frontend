// src/components/Employer.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Employer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    position: '',
    salary: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post('/employee/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        jobDetails: {
          position: formData.position,
          salary: Number(formData.salary), // Ensure salary is sent as a number
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/employee/profile');
  
      setSuccessMessage('Employee registered successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        position: '',
        salary: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to the login page
  const handleLoginRedirect = () => {
    navigate('/login'); // Adjust this path as necessary for your login route
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee Registration</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter employee name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter employee email"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a secure password"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter job position"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter salary amount"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account?</p>
        <button
          onClick={handleLoginRedirect}
          className="mt-2 text-blue-600 underline hover:text-blue-800"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Employer;
