import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to the backend for admin login
      const response = await axios.post('http://localhost:4000/api/admin/Login', {
        username,
        password,
      });

      if (response.data.message === 'User Logged in successfully') {
        alert('Login successful!'); 
        onLogin();  // Trigger state change in App.js to update authentication state
        localStorage.setItem('isAuthenticated', true);  // Store authentication in localStorage
        navigate('/admin', { replace: true });  // Navigate to admin panel
      } else {
        setError(response.data.message);  // Show error if login failed
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : 'An error occurred during login');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h2 className="admin-login-heading">Admin Login</h2>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-input-group">
            <label className="admin-login-label" htmlFor="username">Username</label>
            <input
              className="admin-login-input"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="admin-login-input-group">
            <label className="admin-login-label" htmlFor="password">Password</label>
            <input
              className="admin-login-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="admin-login-error">{error}</p>}
          <button className="admin-login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
