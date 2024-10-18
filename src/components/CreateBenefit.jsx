// src/components/CreateBenefit.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBenefit } from '../store/Slice/BenefitsSlice';

const CreateBenefit = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        cost: '',
        eligibility: '',
    });
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.benefits);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBenefit(formData));
        setFormData({ name: '', description: '', type: '', cost: '', eligibility: '' });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Create New Benefit</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="eligibility"
                    placeholder="Eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                    Create Benefit
                </button>
            </form>
        </div>
    );
};

export default CreateBenefit;
