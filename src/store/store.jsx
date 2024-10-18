import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Slice/employerSlice';
import attendanceReducer from './Slice/attendanceSlice';
import payrollReducer from './Slice/PayrollSlice';
import benefitsReducer from './Slice/BenefitsSlice';


export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    attendance: attendanceReducer,
    payroll: payrollReducer,
    benefits: benefitsReducer,

    
  },
});
