import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Select, MenuItem } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { name, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      return 'Name is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    const result = await register(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </Select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
