import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CourseList from './components/Course/CourseList';
import CourseDetail from './components/Course/CourseDetail';
import CreateCourse from './components/Course/CreateCourse';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/courses" element={<CourseList />} />
                <Route path="/courses/create" element={<CreateCourse />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;