import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Slice/authSlice'; // Adjust the import path if needed

const NavbarUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());      // Clear Redux auth state
    navigate('/');      // Redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center px-6 py-4 shadow z-10">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
    
        <button onClick={() => navigate('/user/tasks')} className="hover:underline">
          Dashboard
        </button>
        
        <button onClick={handleSignOut} className="hover:underline text-red-400">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavbarUser;
