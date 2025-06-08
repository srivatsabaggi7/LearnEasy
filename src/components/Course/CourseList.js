import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      if (response.ok) {
        // Refresh course list
        const updatedResponse = await fetch('http://localhost:5000/api/courses');
        const updatedData = await updatedResponse.json();
        setCourses(updatedData);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {user?.role === 'instructor' && (
        <Link to="/courses/create" className="btn btn-primary mb-3">
          Create New Course
        </Link>
      )}
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor.name}</p>
            <div className="course-actions">
              <Link to={`/courses/${course._id}`} className="btn btn-info">
                View Details
              </Link>
              {user?.role === 'student' && (
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="btn btn-success"
                  disabled={course.students.some(student => student._id === user._id)}
                >
                  {course.students.some(student => student._id === user._id)
                    ? 'Enrolled'
                    : 'Enroll'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;