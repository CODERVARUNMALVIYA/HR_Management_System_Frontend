import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Slice/authSlice';


const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  // State for email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Submit handler
 const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg('');

  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMsg(data.msg || 'Login failed');
      return;
    }

    if (data.token && data.user) {
      dispatch(loginSuccess({
        user: data.user,
        token: data.token,
      }));

      localStorage.setItem('token', data.token);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/tasks');
      }
    }

  } catch (error) {
    setErrorMsg('Server error. Please try again later.');
    console.error('Login error:', error);
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h2 className="text-2xl mb-4 font-semibold">Login as {role === 'admin' ? 'Admin' : 'User'}</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

      <form className="flex flex-col w-80 space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>

      <button
        onClick={() => navigate('/signup')}
        className="px-6 py-3 text-black rounded-lg mt-4"
      >
        SignUp
      </button>
    </div>
  );
};

export default Login;
