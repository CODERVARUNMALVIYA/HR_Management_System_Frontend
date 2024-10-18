import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Thunks for asynchronous operations
export const fetchBenefits = createAsyncThunk('benefits/fetchBenefits', async () => {
    const response = await axios.get('/benefits/BenefitsList');
    return response.data;
});

export const createBenefit = createAsyncThunk('benefits/createBenefit', async (benefitData) => {
    const response = await axios.post('/benefits/CreateBenefit', benefitData);
    return response.data;
});

export const enrollEmployeeInBenefit = createAsyncThunk('benefits/enrollEmployee', async (enrollmentData) => {
    const response = await axios.post('/benefits/EnrollBenefit', enrollmentData);
    return response.data;
});

export const recordBenefitUsage = createAsyncThunk('benefits/recordUsage', async (usageData) => {
    const response = await axios.post('/benefits/RecordBenefitUsage', usageData);
    return response.data;
});

const benefitsSlice = createSlice({
    name: 'benefits',
    initialState: {
        benefits: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch benefits
            .addCase(fetchBenefits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBenefits.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.benefits = action.payload;
            })
            .addCase(fetchBenefits.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create benefit
            .addCase(createBenefit.fulfilled, (state, action) => {
                state.benefits.push(action.payload);
            })
            // Enroll employee
            .addCase(enrollEmployeeInBenefit.fulfilled, (state, action) => {
                // Optionally handle enrollment-related updates here
            })
            // Record usage
            .addCase(recordBenefitUsage.fulfilled, (state, action) => {
                // Optionally handle usage-related updates here
            });
    },
});

export default benefitsSlice.reducer;
