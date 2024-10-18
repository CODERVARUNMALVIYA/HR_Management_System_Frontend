import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust the path according to your project structure

const ManagerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('/manager/managerlogin', { email, password });
            setSuccess('Manager logged in successfully!'); // Display success message
            // Optionally redirect to another page or store the token
        } catch (error) {
            setError('Error logging in: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="manager-login p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Manager Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
                <p className="mt-6 text-center text-sm text-gray-600">
                    <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
                </p>
            </div>
        </div>
    );
};

export default ManagerLogin;
