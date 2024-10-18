import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// Thunk to fetch employer profile from the backend
export const fetchEmployerProfile = createAsyncThunk(
  'employee/fetchEmployerProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/employee/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token with the request
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Error fetching profile');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employerProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.employerProfile = action.payload;
      })
      .addCase(fetchEmployerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch employer profile';
      });
  },
});

export default employeeSlice.reducer;
