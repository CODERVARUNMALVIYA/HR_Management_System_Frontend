import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Slice/employerSlice';
import attendanceReducer from './Slice/attendanceSlice';
import payrollReducer from './Slice/PayrollSlice';
import benefitsReducer from './Slice/BenefitsSlice';
import authSlice from "./Slice/authSlice"

export const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
    payroll: payrollReducer,
    benefits: benefitsReducer,
    auth: authSlice,

    
  },
});
