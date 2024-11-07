import React, { useState } from 'react';
import axios from 'axios';
import './ContactModal.css'; // Ensure the correct path to your CSS file
import { useNavigate } from 'react-router-dom';

const ContactModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    mobile: '', // Ensure mobile is included
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
    mobile: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const errors = {};

    if (touchedFields.name && (!formData.name || formData.name[0] !== formData.name[0].toUpperCase())) {
      errors.name = "Name must start with a capital letter.";
    }

    if (touchedFields.mobile && formData.mobile.length < 10) {
      errors.mobile = "Mobile number must be at least 10 digits.";
    }

    if (touchedFields.email && !/^[^\s@]+@gmail\.com$/.test(formData.email)) {
      errors.email = "Please enter a valid Gmail address (e.g., example@gmail.com).";
    }

    return errors;
  };

  const errors = validate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validate(); // Ensure validation is passed
  
    if (Object.keys(errors).length > 0) {
      setTouchedFields({
        name: true,
        email: true,
        mobile: true,
        subject: true,
        message: true,
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/contact", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Response received: ", response.data);
      if (response.status >= 200 && response.status < 300) {
        alert('Form submitted successfully');
        onClose();
        navigate('/');
      } else {
        alert(`Failed to submit form. Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error during submission: ", error.response?.data || error.message);
      alert(`Submission error: ${error.response ? error.response.data : error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (!show) return null;

  return (
    <div className="contact-modal-backdrop">
      <div className="contact-modal-container">
        <button className="contact-modal-close" onClick={onClose}>✕</button>
        <h2 className="contact-modal-title">Contact Us</h2>
        <form id="contactForm" onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter your name"
              className="contact-input"
            />
            {touchedFields.name && errors.name && <span className="contact-error-message">{errors.name}</span>}
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter your Gmail address"
              className="contact-input"
            />
            {touchedFields.email && errors.email && <span className="contact-error-message">{errors.email}</span>}
          </div>

          <div className="contact-form-group">
            <label htmlFor="mobile" className="contact-form-label">Mobile No</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter your mobile number"
              className="contact-input"
            />
            {touchedFields.mobile && errors.mobile && <span className="contact-error-message">{errors.mobile}</span>}
          </div>

          <div className="contact-form-group">
            <label htmlFor="subject" className="contact-form-label">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter subject"
              className="contact-input"
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="message" className="contact-form-label">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Enter your message"
              className="contact-input contact-textarea"
            />
          </div>

          <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
