import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordBenefitUsage } from '../store/Slice/BenefitsSlice';

const RecordBenefitUsage = () => {
    const [formData, setFormData] = useState({
        employeeBenefitId: '',
        usageDetails: '',
        cost: '',
    });
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.benefits);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(recordBenefitUsage(formData));
        setFormData({ employeeBenefitId: '', usageDetails: '', cost: '' });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Record Benefit Usage</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="form-group">
                    <input
                        type="text"
                        name="employeeBenefitId"
                        placeholder="Employee Benefit ID"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="usageDetails"
                        placeholder="Usage Details"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="cost"
                        placeholder="Cost"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
                >
                    Record Usage
                </button>
            </form>
        </div>
    );
};

export default RecordBenefitUsage;
