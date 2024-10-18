import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

const ManagerRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('/manager/register', { name, email, password });
            setSuccess('Manager registered successfully!'); // Display success message
            setName('');
            setEmail('');
            setPassword('');
            navigate('/managerprofile'); // Navigate to manager profile after registration
        } catch (error) {
            setError('Error registering manager: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="manager-registration p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Register Manager</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Register Manager
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? 
                    <a href="/managerlogin" className="text-blue-600 hover:underline"> Login here</a>
                </p>
            </div>
        </div>
    );
};

export default ManagerRegistration;
