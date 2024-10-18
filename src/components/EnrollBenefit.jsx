import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollEmployeeInBenefit } from '../store/Slice/BenefitsSlice';

const EnrollBenefit = () => {
    const [formData, setFormData] = useState({ employeeId: '', benefitId: '' });
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.benefits);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(enrollEmployeeInBenefit(formData));
        setFormData({ employeeId: '', benefitId: '' });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Enroll Employee in Benefit</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        id="employeeId"
                        placeholder="Enter Employee ID"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="benefitId" className="block text-sm font-medium text-gray-700">Benefit ID</label>
                    <input
                        type="text"
                        name="benefitId"
                        id="benefitId"
                        placeholder="Enter Benefit ID"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition ease-in-out duration-300"
                >
                    Enroll
                </button>
            </form>
        </div>
    );
};

export default EnrollBenefit;
