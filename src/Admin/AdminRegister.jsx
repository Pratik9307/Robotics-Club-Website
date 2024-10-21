import React, { useState } from 'react';
import axios from 'axios';
import './AdminRegister.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:4000/api/admin/register', { username, password });
      console.log('Registration successful:', res.data);
      // Handle successful registration, e.g., redirect, show success message, etc.
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h2 className="admin-login-heading">Admin Registration</h2>
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
          <button className="admin-login-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
