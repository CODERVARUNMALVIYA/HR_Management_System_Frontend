// src/pages/EmployerHome.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';

const EmployerHome = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Attendance Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-4">Attendance</h2>
                        <p className="text-gray-600 mb-4">Monitor and manage employee attendance.</p>
                        <Link to="/attendance" className="text-blue-600 hover:underline">
                            Manage Attendance →
                        </Link>
                    </div>

                    {/* Benefits Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                        <p className="text-gray-600 mb-4">Manage employee benefits and enrollments.</p>
                        <Link to="/benefits" className="text-blue-600 hover:underline">
                            Manage Benefits →
                        </Link>
                    </div>

                    {/* Leave Management Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-4">Leave Management</h2>
                        <p className="text-gray-600 mb-4">Track and approve employee leave requests.</p>
                        <Link to="/leave" className="text-blue-600 hover:underline">
                            Manage Leave →
                        </Link>
                    </div>
                </div>

                {/* Additional Dashboard Stats or Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-4">Total Employees</h2>
                        <p className="text-2xl font-bold">150</p> {/* Example count */}
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <h2 className="text-xl font-semibold mb-4">Employees on Leave</h2>
                        <p className="text-2xl font-bold">5</p> {/* Example count */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerHome;
