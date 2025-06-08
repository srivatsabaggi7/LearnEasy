import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <p className="course-description">{course.description}</p>
      
      <div className="instructor-info">
        <h3>Instructor</h3>
        <p>{course.instructor.name}</p>
      </div>

      <div className="course-content">
        <h3>Course Content</h3>
        {course.content.map((item, index) => (
          <div key={index} className="content-item">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            {item.videoUrl && (
              <div className="video-container">
                <video controls src={item.videoUrl}>
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {item.materials && item.materials.length > 0 && (
              <div className="materials">
                <h5>Materials</h5>
                <ul>
                  {item.materials.map((material, idx) => (
                    <li key={idx}>
                      <a href={material} target="_blank" rel="noopener noreferrer">
                        Material {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {user?.role === 'instructor' && course.instructor._id === user._id && (
        <div className="instructor-controls">
          <h3>Student List</h3>
          <ul className="student-list">
            {course.students.map(student => (
              <li key={student._id}>{student.name} - {student.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;