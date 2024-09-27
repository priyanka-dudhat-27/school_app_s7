/* eslint-disable no-unused-vars */
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CourseManagement from '../pages/CourseManagement'
const ProtectedRoute = ({ component: Component, role }) => {
  const userRole = useSelector(state => state.user.role);

  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

// Prop type validation
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired, 
  role: PropTypes.string.isRequired,            // Expecting a string for role
};

export default ProtectedRoute;
