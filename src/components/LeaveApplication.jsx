import React, { useState } from 'react';
import axios from '../utils/axios'; // Ensure axios is properly set up

const LeaveApplication = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [leaveType, setLeaveType] = useState('vacation');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            const response = await axios.post('/leave/apply-leave', {
                employeeId,
                leaveType,
                startDate,
                endDate,
                reason,
            });
            setSuccess('Leave application submitted successfully!');
        } catch (error) {
            setError('Error applying for leave: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="leave-application p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input 
                        type="text" 
                        value={employeeId} 
                        onChange={(e) => setEmployeeId(e.target.value)} 
                        required 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                    <select 
                        value={leaveType} 
                        onChange={(e) => setLeaveType(e.target.value)} 
                        required 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="vacation">Vacation</option>
                        <option value="sick">Sick</option>
                        <option value="personal">Personal</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        required 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        required 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <textarea 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)} 
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500" 
                        rows="4"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Submit Leave Application
                </button>
            </form>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
        </div>
    );
};

export default LeaveApplication;
