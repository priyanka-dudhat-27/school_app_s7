/* eslint-disable no-unused-vars */
// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL; 
// console.log(">>>>>>>>",BASE_URL)

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // Default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, formData);
            console.log(response.data);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Error registering user:', error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Register</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="name"
                    required
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
