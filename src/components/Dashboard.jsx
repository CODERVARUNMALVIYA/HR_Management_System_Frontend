// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Task Management System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login/user')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login as User
        </button>
        <button
          onClick={() => navigate('/login/admin')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
