import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploadReceipt.css';

export default function UploadReceipt() {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [accountType, setAccountType] = useState('');  // New state for account type

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !studentName || !studentEmail || !accountType) {
      toast.error('Please fill in all fields and select a file.', { autoClose: 5000 });
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('studentName', studentName);
    formData.append('studentEmail', studentEmail);
    formData.append('accountType', accountType);  // Add account type to form data

    const uploadToast = toast.info('Uploading receipt...', { autoClose: false });

    try {
      const response = await axios.post('http://localhost:4000/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss(uploadToast);
      console.log('Response:', response.data);
      toast.success('Image uploaded successfully!', { autoClose: 5000 });
    } catch (error) {
      toast.dismiss(uploadToast);
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image', { autoClose: 5000 });
    }
  };

  return (
    <div className="upload-receipt-container">
      <h2 className="upload-receipt-title">Upload Receipt</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Enter student name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="text-input"
        />
        <input
          type="email"
          placeholder="Enter student email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="text-input"
        />
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="select-input"
        >
          <option value="">Select Account Type</option>
          <option value="student">Student</option>
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="upload-button">Upload</button>
      </form>
      {file && <p className="file-info">Selected File: {file.name}</p>}
      <ToastContainer />
    </div>
  );
}
