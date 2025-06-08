import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'cursive', font: 'icon', fontStyle: 'italic' }}>
          LearnEasy
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              <Button component={Link} to="/" color="inherit">
                Dashboard
              </Button>
              <Button component={Link} to="/courses" color="inherit">
                Courses
              </Button>
              {user.role === 'instructor' && (
                <Button component={Link} to="/courses/create" color="inherit">
                  Create Course
                </Button>
              )}
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
