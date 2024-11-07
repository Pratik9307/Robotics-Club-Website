import React from 'react';
import './Logout.css';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay3">
      <div className="modal-content3">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out? You will need to log in again to access your account.</p>
        <div className="modal-buttons3">
          <button className="btn3 btn-cancel3" onClick={onClose}>Cancel</button>
          <button className="btn3 btn-logout3" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
