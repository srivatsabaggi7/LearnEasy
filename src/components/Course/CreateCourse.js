import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: [{
      title: '',
      description: '',
      videoUrl: '',
      materials: ['']
    }]
  });
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (index, field, value) => {
    const newContent = [...formData.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setFormData({ ...formData, content: newContent });
  };

  const addContentSection = () => {
    setFormData({
      ...formData,
      content: [...formData.content, {
        title: '',
        description: '',
        videoUrl: '',
        materials: ['']
      }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/courses');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError('Error creating course');
    }
  };

  return (
    <div className="create-course">
      <h2>Create New Course</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Course Content</h3>
        {formData.content.map((content, index) => (
          <div key={index} className="content-section">
            <h4>Section {index + 1}</h4>
            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                className="form-control"
                value={content.title}
                onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Section Description</label>
              <textarea
                className="form-control"
                value={content.description}
                onChange={(e) => handleContentChange(index, 'description', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Video URL</label>
              <input
                type="url"
                className="form-control"
                value={content.videoUrl}
                onChange={(e) => handleContentChange(index, 'videoUrl', e.target.value)}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={addContentSection}
        >
          Add Section
        </button>

        <button type="submit" className="btn btn-primary mt-3">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;