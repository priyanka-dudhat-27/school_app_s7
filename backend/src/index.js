const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');
const morgan = require('morgan');
const cors=require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cors());

// Import routes
const indexRouter = require('./routes/index');


// Route handling
app.use('/', indexRouter);


// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
