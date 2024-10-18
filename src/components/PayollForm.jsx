import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayroll } from '../store/Slice/PayrollSlice';

const PayrollForm = () => {
    const [form, setForm] = useState({
        employeeId: '',
        salaryType: '',
        hourlyRate: '',
        hoursWorked: '',
        fixedSalary: '',
        commissionRate: '',
        taxRate: '',
    });

    const dispatch = useDispatch();
    const payrollStatus = useSelector((state) => state.payroll.status);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.employeeId) newErrors.employeeId = 'Employee ID is required';
        if (!form.salaryType) newErrors.salaryType = 'Salary type is required';
        if (form.salaryType === 'hourly' && (!form.hourlyRate || !form.hoursWorked)) {
            newErrors.hourlyRate = 'Hourly rate and hours worked are required';
        }
        if (form.salaryType === 'fixed' && !form.fixedSalary) {
            newErrors.fixedSalary = 'Fixed salary is required';
        }
        if (form.salaryType === 'commission' && !form.commissionRate) {
            newErrors.commissionRate = 'Commission rate is required';
        }
        if (!form.taxRate) newErrors.taxRate = 'Tax rate is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(processPayroll(form));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Process Payroll</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Employee ID */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        placeholder="Enter Employee ID"
                        value={form.employeeId}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                            errors.employeeId ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>

                {/* Salary Type */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Salary Type</label>
                    <select
                        name="salaryType"
                        value={form.salaryType}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                            errors.salaryType ? 'border-red-500' : ''
                        }`}
                    >
                        <option value="">Select Salary Type</option>
                        <option value="hourly">Hourly</option>
                        <option value="fixed">Fixed</option>
                        <option value="commission">Commission</option>
                    </select>
                    {errors.salaryType && <p className="text-red-500 text-sm mt-1">{errors.salaryType}</p>}
                </div>

                {/* Conditional Fields based on Salary Type */}
                {form.salaryType === 'hourly' && (
                    <>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
                            <input
                                type="number"
                                name="hourlyRate"
                                placeholder="Hourly Rate"
                                value={form.hourlyRate}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                    errors.hourlyRate ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Hours Worked</label>
                            <input
                                type="number"
                                name="hoursWorked"
                                placeholder="Hours Worked"
                                value={form.hoursWorked}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                    </>
                )}

                {form.salaryType === 'fixed' && (
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Fixed Salary</label>
                        <input
                            type="number"
                            name="fixedSalary"
                            placeholder="Fixed Salary"
                            value={form.fixedSalary}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                errors.fixedSalary ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.fixedSalary && <p className="text-red-500 text-sm mt-1">{errors.fixedSalary}</p>}
                    </div>
                )}

                {form.salaryType === 'commission' && (
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                        <input
                            type="number"
                            name="commissionRate"
                            placeholder="Commission Rate"
                            value={form.commissionRate}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                                errors.commissionRate ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.commissionRate && <p className="text-red-500 text-sm mt-1">{errors.commissionRate}</p>}
                    </div>
                )}

                {/* Tax Rate */}
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                    <input
                        type="number"
                        name="taxRate"
                        placeholder="Tax Rate"
                        value={form.taxRate}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
                            errors.taxRate ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.taxRate && <p className="text-red-500 text-sm mt-1">{errors.taxRate}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>
            </form>

            {/* Feedback */}
            {payrollStatus === 'loading' && <p className="text-blue-500 mt-4">Processing payroll...</p>}
            {payrollStatus === 'succeeded' && <p className="text-green-500 mt-4">Payroll processed successfully!</p>}
            {payrollStatus === 'failed' && <p className="text-red-500 mt-4">Failed to process payroll. Please try again.</p>}
        </div>
    );
};

export default PayrollForm;
