// src/components/BenefitsList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBenefits } from '../store/Slice/BenefitsSlice';

const BenefitsList = () => {
    const dispatch = useDispatch();
    const benefits = useSelector((state) => state.benefits.benefits);
    const status = useSelector((state) => state.benefits.status);
    const error = useSelector((state) => state.benefits.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBenefits());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Benefits List</h2>
            <ul className="space-y-4">
                {benefits.map((benefit) => (
                    <li key={benefit._id} className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-xl font-semibold">{benefit.name}</h3>
                        <p className="text-gray-700">{benefit.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BenefitsList;
