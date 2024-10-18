// src/components/ParentComponent.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployerProfile } from '../store/Slice/employerSlice'; 
import AttendanceClockIn from './AttendanceClockIn';

const ParentComponent = () => {
    const dispatch = useDispatch();
    const employee = useSelector((state) => state.employee);

    useEffect(() => {
        // Fetch the employer profile when the component mounts
        dispatch(fetchEmployerProfile());
    }, [dispatch]);

    console.log('Employee State:', employee); // Log employee state

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-4xl text-center font-bold mt-6 text-blue-600">Attendance Management</h1>
            <div className="w-full max-w-md mt-8">
                <AttendanceClockIn />
            </div>
        </div>
    );
};

export default ParentComponent;
