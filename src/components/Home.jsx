import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { FaUsers, FaClipboardCheck, FaDollarSign, FaTasks, FaPaperPlane } from 'react-icons/fa'; // Added FaPaperPlane icon for Leave Application

const HomePage = () => {
    const [employeeCount, setEmployeeCount] = useState(null);
    const [error, setError] = useState(null);
    const [isLightMode, setIsLightMode] = useState(true);

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const response = await axios.get('/employees/count'); // Example API endpoint
                setEmployeeCount(response.data.count); // Adjust to match the actual response structure
            } catch (err) {
                setError('Error fetching employee count');
            }
        };

        fetchEmployeeCount();
    }, []);

    return (
        <div className="home-page bg-gray-50 min-h-screen">
            {/* Welcome Section */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 text-center">
                <h1 className="text-5xl font-bold">Welcome to the HR Management System</h1>
                <p className="mt-4 text-xl">Effortlessly manage employees, track attendance, process payroll, and more!</p>
            </header>

            {/* Navigation Links */}
            <nav className="flex flex-col md:flex-row justify-center mt-8 space-x-0 md:space-x-8">
                {['/employees', '/benefits', '/attendance', '/payroll', '/performance', '/leave', '/register', '/managerlogin'].map((path, index) => (
                    <Link 
                        key={index} 
                        to={path} 
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2 md:mb-0"
                    >
                        {path.slice(1).charAt(0).toUpperCase() + path.slice(2)} {/* Capitalizes first letter */}
                    </Link>
                ))}
            </nav>

            {/* Key Features Overview */}
            <section className="mt-12 px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>

                {/* Display dynamic data */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white shadow-lg p-6 rounded-lg text-center w-full max-w-md">
                        <h3 className="text-xl font-semibold text-blue-700">Employee Overview</h3>
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <p className="text-2xl mt-2">
                                {employeeCount !== null ? `Total Employees: ${employeeCount}` : 'Loading...'}
                            </p>
                        )}
                    </div>
                </div>

                {/* Feature Cards with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />, title: "Employee Management", description: "Maintain a centralized employee database with efficient tools for management." },
                        { icon: <FaClipboardCheck className="text-blue-600 text-4xl mx-auto mb-4" />, title: "Geofencing Attendance", description: "Track employee attendance using geofencing for accurate time tracking." },
                        { icon: <FaDollarSign className="text-blue-600 text-4xl mx-auto mb-4" />, title: "Payroll Processing", description: "Automate salary calculations, tax deductions, and generate payslips effortlessly." },
                        { icon: <FaTasks className="text-blue-600 text-4xl mx-auto mb-4" />, title: "Benefits Administration", description: "Manage employee benefits such as health insurance and retirement plans." },
                        { icon: <FaPaperPlane className="text-blue-600 text-4xl mx-auto mb-4" />, title: "Leave Application", description: "Easily apply for leave and manage your leave requests." },
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                            {feature.icon}
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 p-6 bg-gray-800 text-white text-center">
                <p>&copy; 2024 HR Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
