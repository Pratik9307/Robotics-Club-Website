// ContactModal.js
import React from 'react';
import './ContactmodelAdmin.css'; // Create a new CSS file for the modal styling

const ContactmodelAdmin = ({ isOpen, onClose, contact }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Contact Details</h2>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Verified:</strong> {contact.verified ? 'Yes' : 'No'}</p>
                <p><strong>Phone:</strong> {contact.mobile}</p> {/* Example additional field */}
                <p><strong>subject:</strong> {contact.subject}</p> {/* Example additional field */}
                <p><strong>createdAt:</strong> {contact.createdAt}</p> {/* Example additional field */}
                <p><strong>Message:</strong> {contact.message}</p> {/* Example additional field */}
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default ContactmodelAdmin;
