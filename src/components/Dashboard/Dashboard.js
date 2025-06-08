import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        
        if (user.role === 'student') {
          setEnrolledCourses(data.filter(course => 
            course.students.some(student => student._id === user._id)
          ));
        } else if (user.role === 'instructor') {
          setInstructorCourses(data.filter(course => 
            course.instructor._id === user._id
          ));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <div className="dashboard">
      
      <h2>Welcome {user?.name}</h2>
      <h2>LearnEasy</h2>
      <h4>An organized way to learn!</h4>
      {user?.role === 'student' && (
        <div className="enrolled-courses">
          <h3>My Enrolled Courses</h3>
          {enrolledCourses.map(course => (
            <div key={course._id} className="course-card">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}

      {user?.role === 'instructor' && (
        <div className="instructor-courses">
          <h3>My Courses</h3>
          {instructorCourses.map(course => (
            <div key={course._id} className="course-card">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <p>Enrolled Students: {course.students.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;