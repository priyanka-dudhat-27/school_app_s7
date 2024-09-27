/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../features/courseSlice';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Snackbar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Alert,
} from '@mui/material';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CourseManagement = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formValues, setFormValues] = useState({ 
    title: '', 
    description: '', 
    assignedTeacher: '', // New field for assigned teacher
    startDate: '', // New field for start date
    endDate: '', // New field for end date
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/courses/courses`);
        dispatch(setCourses(response.data));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const coursesArray = Array.isArray(courses) ? courses : [];

  const handleOpenDialog = (course = null) => {
    setCurrentCourse(course);
    setFormValues(course ? { 
      title: course.title, 
      description: course.description,
      assignedTeacher: course.assignedTeacher || '', // Use existing value or empty
      startDate: course.startDate ? course.startDate.split('T')[0] : '', // Format the date
      endDate: course.endDate ? course.endDate.split('T')[0] : '' // Format the date
    } : { 
      title: '', 
      description: '', 
      assignedTeacher: '', 
      startDate: '', 
      endDate: '' 
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCourse(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      };

      if (currentCourse) {
        // Editing an existing course
        await axios.put(`${BASE_URL}/courses/updateCourse/${currentCourse.id}`, formValues, config);
        setSnackbarMessage('Course updated successfully!');
      } else {
        // Adding a new course
        await axios.post(`${BASE_URL}/courses/createCourse`, formValues, config);
        setSnackbarMessage('Course added successfully!');
      }
      handleCloseDialog();
      const response = await axios.get(`${BASE_URL}/courses/getCourses`, config);
      dispatch(setCourses(response.data));
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving course:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Error saving course.');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`${BASE_URL}/courses/deleteCourse/${courseId}`);
      dispatch(setCourses(coursesArray.filter((course) => course.id !== courseId)));
      setSnackbarMessage('Course deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting course:', error);
      setSnackbarMessage('Error deleting course.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Manage Courses
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Add Course
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned Teacher</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coursesArray.length > 0 ? (
              coursesArray.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>{course.assignedTeacher.name}</TableCell> {/* Assuming assignedTeacher has a name property */}
                  <TableCell>{new Date(course.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(course.endDate).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenDialog(course)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No courses available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Dialog for adding/editing courses */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="assignedTeacher"
                label="Assigned Teacher ID" // Assuming you need the teacher's ID
                type="text"
                fullWidth
                variant="outlined"
                value={formValues.assignedTeacher}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="startDate"
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="endDate"
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.endDate}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {currentCourse ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagement;
