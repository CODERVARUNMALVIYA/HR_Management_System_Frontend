import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; // Axios instance with baseURL

const ManagerProfile = () => {
    const [manager, setManager] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchManagerProfile = async () => {
        try {
            const response = await axios.get('/manager/profile');
            setManager(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            setError('Error fetching manager profile: ' + (error.response?.data?.message || error.message));
        }
    };

    useEffect(() => {
        fetchManagerProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put('/manager/update', { name, email });
            setManager(response.data);
            setSuccess('Profile updated successfully!');
        } catch (error) {
            setError('Error updating profile: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="manager-profile p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Manager Profile</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                {manager && (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Update Profile
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ManagerProfile;
