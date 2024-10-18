
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Employer from './components/Employer';
import Attendance from './components/Attendance';
import Payroll from './components/PayollForm';
import Performance from './components/Performance';
import EmployerProfile from './components/EmployerProfile';
import Login from './components/Login';
import BenefitsList from './components/BenefitsList';
import CreateBenefit from './components/CreateBenefit';
import EnrollBenefit from './components/EnrollBenefit';
import RecordBenefitUsage from './components/RecordBenefitUsag';
import HomePage from './components/Home';
import LeaveApplication from './components/LeaveApplication';
import ManagerLogin from './components/ManagerLogin';
import ManagerProfile from './components/ManagerProfile';
import Register from './components/Manager'

const App = () => {
  return (
    <Provider store={store}>
      
        <Routes>
          <Route path="/employees" element={<Employer />} />
          <Route path="/employee/profile" element={<EmployerProfile/>} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/performance" element={<Performance/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managerprofile" element={<ManagerProfile />} />
          <Route path="/BenefitsList" element={<BenefitsList />} />
          <Route path="/CreateBenefit" element={<CreateBenefit />} />
          <Route path="/EnrollBenefit" element={<EnrollBenefit />} />
          <Route path="/RecordBenefitUsage" element={<RecordBenefitUsage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/leave" element={<LeaveApplication/>} />
        </Routes>
      
    </Provider>
  );
};



export default App;
