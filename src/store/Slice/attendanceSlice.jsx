import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to submit attendance
export const submitAttendance = createAsyncThunk('attendance/submitAttendance', async (attendanceData) => {
  const response = await axios.post('/api/attendance', attendanceData);
  return response.data;
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
