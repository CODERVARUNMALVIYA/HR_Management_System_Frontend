// src/slices/payrollSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Async action to process payroll
export const processPayroll = createAsyncThunk(
    'payroll/processPayroll',
    async (payrollData) => {
        const response = await axios.post('http://localhost:3000/payroll/process', payrollData);
        return response.data;
    }
);

const payrollSlice = createSlice({
    name: 'payroll',
    initialState: {
        payroll: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(processPayroll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(processPayroll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.payroll = action.payload;
            })
            .addCase(processPayroll.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default payrollSlice.reducer;
