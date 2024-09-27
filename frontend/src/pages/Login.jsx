// src/components/Login.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
      
      const { token, user } = response.data;
  
      localStorage.setItem('token', token); 
  
      dispatch(setUser({ userInfo: user, role: user.role }));
  
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/'); // Default redirection if role is not matched
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="mb-4 text-xl">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
