// src/components/AttendanceClockIn.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';

const AttendanceClockIn = () => {
    const [formData, setFormData] = useState({
        lat: null,
        lng: null,
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Access the employer profile from the redux store
    const employerProfile = useSelector((state) => state.employee.employerProfile);
    const employeeId = employerProfile?.id; // Ensure this path matches your state structure

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError(null);
                },
                (error) => {
                    let errorMessage;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "User denied the request for Geolocation.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "The request to get user location timed out.";
                            break;
                        case error.UNKNOWN_ERROR:
                        default:
                            errorMessage = "An unknown error occurred.";
                            break;
                    }
                    setError(errorMessage);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.lat || !formData.lng) {
            setError("Please fetch your location before clocking in.");
            return;
        }

        if (!employeeId) {
            setError("Employee ID is not available."); // This indicates employeeId is not being fetched correctly
            return;
        }

        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);

        try {
            const response = await axios.post('/attendance/clock-in', {
                employeeId,
                lat: formData.lat,
                lng: formData.lng,
            });

            setSuccessMessage("Clock-in successful!");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Something went wrong during clock-in.');
            } else {
                setError('Error in setting up clock-in request.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-center">Clock In</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <button
                onClick={getCurrentLocation}
                className="w-full mb-4 py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
                Get Current Location
            </button>
            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Clocking In...' : 'Clock In'}
                </button>
            </form>
        </div>
    );
};

export default AttendanceClockIn;
