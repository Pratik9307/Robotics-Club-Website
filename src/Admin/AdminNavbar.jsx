import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './AdminNavbar.css';  // Assume custom CSS for styling
import Navimage from '../assets/GOOD.jpg';

const AdminNavbar = ({ onLogout, onThemeChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();  // Use navigate to redirect after logout

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');  // Clear the auth flag or token from localStorage

    // Optionally call any additional logout logic passed from parent component
    if (onLogout) {
      onLogout();
    }

    navigate('/login');  // Redirect the user to the login page after logout
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply the theme based on darkMode state
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Call the parent function if passed
    if (onThemeChange) {
      onThemeChange(darkMode);
    }
  }, [darkMode, onThemeChange]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <ul className="nav-links">
          <li>
            <a href="">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="">
              <i className="fas fa-chart-line"></i> Reports
            </a>
          </li>
          <li>
            <a href="">
              <i className="fas fa-cog"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      <button className="theme-toggle" onClick={handleThemeChange}>
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        {darkMode ? ' Light Mode' : ' Dark Mode'}
      </button>

      <div className="sidebar-header1">
        <div
          className="profile-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={Navimage} className="logo" alt="Admin Logo" />
          <i className="fas fa-caret-down"></i>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="/profile">
                <i className="fas fa-user"></i> Profile
              </a>
              <a href="/settings">
                <i className="fas fa-sliders-h"></i> Settings
              </a>
              <button onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
