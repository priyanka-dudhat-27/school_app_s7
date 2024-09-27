/* eslint-disable no-unused-vars */
// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice'; // Assuming you have a logout action

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">School Management System</h1>
      <nav>
        <ul className="flex space-x-4">
          {userRole === 'admin' && (
            <>
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
              <li><Link to="/manage-courses">Manage Courses</Link></li>
            </>
          )}
          {userRole === 'teacher' && (
            <>
              <li><Link to="/teacher-dashboard">Teacher Dashboard</Link></li>
              <li><Link to="/manage-assignments">Manage Assignments</Link></li>
            </>
          )}
          {userRole === 'student' && (
            <>
              <li><Link to="/student-dashboard">Student Dashboard</Link></li>
              <li><Link to="/view-assignments">View Assignments</Link></li>
            </>
          )}
          <li>
            <button onClick={handleLogout} className="bg-red-600 p-2 rounded">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
