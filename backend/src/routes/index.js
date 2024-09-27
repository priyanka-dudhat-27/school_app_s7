const express = require('express');

const enrollmentRoutes = require("./enrollmentRoutes")
const authRoutes = require("./authRoutes")
const gradeRoutes = require("./gradeRoutes")
const courseRoutes = require("./courseRoutes")

const router=express.Router()

router.use("/auth",authRoutes)
router.use('/courses', courseRoutes);
router.use('/enrollment', enrollmentRoutes);
router.use('/grades', gradeRoutes);

module.exports = router;