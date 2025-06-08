const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
    createCourse, 
    getCourses, 
    getCourseById, 
    enrollCourse 
} = require('../controllers/courseController');

router.route('/').post(protect, createCourse).get(getCourses);
router.route('/:id').get(getCourseById);
router.route('/:id/enroll').post(protect, enrollCourse);

module.exports = router;