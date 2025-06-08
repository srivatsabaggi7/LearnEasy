const Course = require('../models/Course');

// Create course
const createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            ...req.body,
            instructor: req.user._id
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate('instructor', 'name email')
            .populate('students', 'name email');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email')
            .populate('students', 'name email');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Enroll in course
const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            if (course.students.includes(req.user._id)) {
                res.status(400).json({ message: 'Already enrolled' });
            } else {
                course.students.push(req.user._id);
                await course.save();
                res.json({ message: 'Successfully enrolled' });
            }
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCourse, getCourses, getCourseById, enrollCourse };