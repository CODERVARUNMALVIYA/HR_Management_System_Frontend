// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignupPage from './components/SignUp';
import UserTasks from './components/UserTasks';
import AdminDashboard from './components/Admindashboard';
import AdminTaskList from './components/AdminTaskList';
import AdminAddTask from './components/AdminAddTask';
import UpadateTask from './components/updateTsak';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} /> 
      <Route path="/user/tasks" element={<UserTasks />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/tasks" element={<AdminTaskList />} />
      <Route path="/admin/add-task" element={<AdminAddTask />} />
      <Route path="/admin/tasks/update/:id" element={<UpadateTask />} />
    </Routes>
  );
};

export default App;
