import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./AdminPanel.css";
import Navimage from '../assets/GOOD.jpg';
import AdminNavbar from './AdminNavbar';
import { ToastContainer, toast } from 'react-toastify';


const AdminPanel = () => {
    const navigate = useNavigate(); // Initialize navigate for redirection
    const [students, setStudents] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [activeSection, setActiveSection] = useState('student-data');
    const [receipts, setReceipts] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [reportData, setReportData] = useState({
        totalStudents: 0,
        totalContacts: 0,
        students: [],
        contacts: []
    });
    const [theme, setTheme] = useState('light'); // Theme: light or dark
    const [emailNotifications, setEmailNotifications] = useState(true); // Email notifications toggle
    const [smsNotifications, setSmsNotifications] = useState(false); // SMS notifications toggle
    const [language, setLanguage] = useState('en'); // Language selection
    const [selectedUserEmail, setSelectedUserEmail] = useState(null);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
  

    const [reply, setReply] = useState('');

    useEffect(() => {
        fetchStudents();
        fetchContacts();
        fetchReceipts();
        fetchReportData();
    }, []);


    useEffect(() => {
        // Fetch all contacts
        const fetchContacts = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/v1/contact');
            setContacts(response.data);
          } catch (error) {
            console.error('Error fetching contacts:', error);
          }
        };
    
        fetchContacts();
      }, []);


      
    const handleDeleteReply = async (email, index) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/${email}/message/${index}`);
            toast.success(response.data.message); // Show success toast
            fetchContacts(); // Refresh contacts after deletion
        } catch (error) {
            console.error('Error deleting reply:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete reply'; // Access error message safely
            toast.error(errorMessage); // Show error toast
        }
    };
    
    
      // Frontend code for sending reply

      const handleReplySubmit = async () => {
        if (!reply || !selectedContact?.email) {
            toast.error('No reply or contact selected');  // Replace alert with toast
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/api/admin/${selectedContact.email}/message`, {
                message: reply,
            });

            toast.success(response.data.message);  // Show success toast
            setReply('');  // Clear the reply input
            fetchContacts();  // Refresh contacts after sending reply
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Failed to send reply');  // Show error toast
        }
    };
    

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/admin/students');
            setStudents(res.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const fetchReceipts = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/admin/receipts');
            setReceipts(res.data);
        } catch (error) {
            console.error('Error fetching receipts:', error);
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/admin/contacts');
            setContacts(res.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const fetchReportData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/admin/reports');
            setReportData(res.data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };

    const toggleStudentVerification = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/admin/students/verify/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error verifying student:", error);
        }
    };

    const toggleContactVerification = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/admin/contacts/verify/${id}`);
            fetchContacts();
        } catch (error) {
            console.error("Error verifying contact:", error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/admin/students/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/admin/contacts/${id}`);
            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const deleteReceipt = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/admin/receipts/${id}`);
            fetchReceipts();
        } catch (error) {
            console.error('Error deleting receipt:', error);
        }
    };

     // Function to handle theme switching
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    // Apply theme change logic (e.g., updating CSS variables)
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Function to toggle email notifications
  const toggleEmailNotifications = () => {
    setEmailNotifications((prev) => !prev);
    // Additional logic for handling email notifications
    console.log("Email Notifications: ", !emailNotifications);
  };

  // Function to toggle SMS notifications
  const toggleSmsNotifications = () => {
    setSmsNotifications((prev) => !prev);
    // Additional logic for handling SMS notifications
    console.log("SMS Notifications: ", !smsNotifications);
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    // Logic to apply language changes across the app
    console.log("Selected Language: ", selectedLanguage);
  };

  // Function to handle data backup
  const handleBackup = () => {
    // Logic for backing up data (API calls, file creation, etc.)
    console.log("Data backup initiated");
  };

  // Function to handle data restore
  const handleRestore = () => {
    // Logic for restoring data (API calls, file retrieval, etc.)
    console.log("Data restore initiated");
  };

  // Function to handle account deactivation
  const handleAccountDeactivation = () => {
    // Logic to deactivate the admin account
    console.log("Account deactivated");
  };

  // Function to handle account deletion
  const handleAccountDeletion = () => {
    // Logic to delete the admin account (API call, confirmation)
    console.log("Account deleted");
  };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };


    const openModal1 = (email) => {
        setSelectedUserEmail(email);
        setIsModalOpen1(true);
      };
      
      const closeModal1 = () => {
        setIsModalOpen1(false);
        setSelectedUserEmail(null);
      };
    const [openImages, setOpenImages] = useState({});

    // Toggle function for opening/closing image view
    const toggleImageView = (id) => {
        setOpenImages((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the specific image
        }));
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/admin/logout'); // Call your logout endpoint
            localStorage.removeItem('token'); // Remove token from local storage
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="admin-panel">
            <div className={`sidebar1 ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header1">
                    <img src={Navimage} className="logo" alt="Admin Logo" />
                    <h3>Admin Dashboard</h3>
                </div>
                <ul>
                    <li>
                        <button onClick={() => setActiveSection('student-data')}>
                            Student Data ({students.length})
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('receipt-info')}>
                            Receipt Added Student ({receipts.length})
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('course-info')}>Courses Info</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('contact-info')}>
                            Contact Info ({contacts.length})
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('reports')}>Reports</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('Contact')}>Contact</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('settings')}>Settings</button>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
                    </li>
                </ul>
            </div>

            <button onClick={toggleSidebar} className={`sidebar-toggle1 ${sidebarOpen ? 'close' : 'open'}`}>
                {sidebarOpen ? 'Close' : 'Open'}
            </button>

            <div className={`panel-container ${sidebarOpen ? 'shifted' : ''}`}>
                <AdminNavbar />
                <h2 className='H2'>Admin Panel</h2>

                {activeSection === 'student-data' && (
                    <div>
                        <h3>Student Data</h3>
                        {students.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Account type</th>
                                        <th>Verified</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map(student => (
                                        <tr key={student._id}>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>{student.email}</td>
                                            <td>{student.accountType}</td>
                                            <td>{student.verified ? 'Yes' : 'No'}</td>
                                            <td>
                                                <button 
                                                    onClick={() => toggleStudentVerification(student._id)}
                                                    className={student.verified ? 'verified' : 'unverified'}
                                                >
                                                    {student.verified ? 'Unverify' : 'Verify'}
                                                </button>
                                                <button 
                                                    onClick={() => deleteStudent(student._id)}
                                                    className="delete-button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No student data available.</p>
                        )}
                    </div>
                )}

                {activeSection === 'receipt-info' && (
                    <div>
                        <h3>Receipt Added Student</h3>
                        {receipts.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    
                                        <th>Email ID</th>
                                        <th>Account Type</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receipts.map((receipt) => (
                                        <tr key={receipt._id}>
                                            <td>{receipt.studentName}</td>
                                           
                                            <td>{receipt.studentEmail}</td>
                                            <td>{receipt.accountType}</td>
                                            <td>
                                                <button onClick={() => toggleImageView(receipt._id)}>
                                                    {openImages[receipt._id] ? 'Hide Image' : 'View Image'}
                                                </button>
                                                {openImages[receipt._id] && (
                                                    <img
                                                        src={receipt.imageUrl}
                                                        alt={receipt.studentName}
                                                        style={{ width: '500px', height: '500px', marginTop: '10px' }}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <button onClick={() => deleteReceipt(receipt._id)} className="delete-button">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No receipt information available.</p>
                        )}
                    </div>
                )}

                {activeSection === 'course-info' && (
                    <div>
                        <h3>Courses Info</h3>
                        {/* Add your courses info here */}
                    </div>
                )}

                {activeSection === 'contact-info' && (
                    <div>
                        <h3>Contact Data</h3>
                        {contacts.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                    <th>Name</th>
                            
                                        <th>Email</th>
                                        <th>Verified</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr key={contact._id}>
                                            <td>{contact.name}</td>
                                            
                                            <td>{contact.email}</td>
                                            <td>{contact.verified ? 'Yes' : 'No'}</td>
                                            <td>
                                                <button 
                                                    onClick={() => toggleContactVerification(contact._id)}
                                                    className={contact.verified ? 'verified' : 'unverified'}
                                                >
                                                    {contact.verified ? 'Unverify' : 'Verify'}
                                                </button>
                                                <button 
                                                    onClick={() => openModal(contact)}
                                                    className="view-button"
                                                >
                                                    View
                                                </button>
                                                <button 
                                                    onClick={() => deleteContact(contact._id)}
                                                    className="delete-button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No contact data available.</p>
                        )}
                    </div>
                )}

                {activeSection === 'reports' && (
    <div className="report-section">
        <h3>Reports</h3>
        <div className="report-card">
            <h4>Total Students</h4>
            <p>{reportData.totalStudents}</p>
        </div>
        <div className="report-card">
            <h4>Total Contacts</h4>
            <p>{reportData.totalContacts}</p>
        </div>
        <h4>Student Entries</h4>
        <div className="table-container">
            {reportData.students.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                            <th>Email</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.students.map(student => (
                            <tr key={student._id}>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.verified ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No student entries available.</p>
            )}
        </div>
        <h4>Contact Entries</h4>
        <div className="table-container">
            {reportData.contacts.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                           
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contact entries available.</p>
            )}
        </div>
    </div>
)}
{activeSection === 'Contact' && (
    <div>
        <h1>Admin Contact Panel</h1>
        <div className="contacts-list">
            <h3>All Contacts</h3>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id} onClick={() => setSelectedContact(contact)}>
                        {contact.name} - {contact.email}
                    </li>
                ))}
            </ul>
        </div>

        {selectedContact && (
            <div className="selected-contact">
                <h3>Conversation with {selectedContact.name}</h3>
                <div className="conversation-container">
                    <div className="user-message">
                        <h4>User Message</h4>
                        <p>{selectedContact.message}</p>
                    </div>

                    {selectedContact.adminReplies.length > 0 && (
                        <div className="admin-replies">
                            <h4>Previous Admin Replies</h4>
                            {selectedContact.adminReplies.map((reply, index) => (
                                <div key={index} className="reply-item">
                                    <p>
                                        {reply.reply} <small>(at {new Date(reply.repliedAt).toLocaleString()})</small>
                                    </p>
                                    <button 
                                        className="delete-reply-button"
                                        onClick={() => handleDeleteReply(selectedContact.email, index)}
                                    >
                                        Delete Reply
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <textarea
                    className="reply-textarea"
                    placeholder="Type your reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                ></textarea>
                <button className="send-reply-button" onClick={handleReplySubmit}>Send Reply</button> 
                <ToastContainer />  {/* Include ToastContainer for toasts */}
            </div>
        )}
    </div>
)}




                {activeSection === 'settings' && (
  <div className="settings-section">
    <h3>Settings</h3>
    <div className="settings-options">

      {/* Profile Settings */}
      <div className="setting-item">
        <h4>Profile Settings</h4>
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>

      {/* Theme Settings */}
      <div className="setting-item">
        <h4>Theme</h4>
        <div className="theme-options">
          <button onClick={() => setTheme('light')}>Light Mode</button>
          <button onClick={() => setTheme('dark')}>Dark Mode</button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="setting-item">
        <h4>Notification Settings</h4>
        <label>
          <input type="checkbox" checked={emailNotifications} onChange={toggleEmailNotifications} />
          Email Notifications
        </label>
        <label>
          <input type="checkbox" checked={smsNotifications} onChange={toggleSmsNotifications} />
          SMS Notifications
        </label>
      </div>

      {/* Language Settings */}
      <div className="setting-item">
        <h4>Language</h4>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Data Backup Settings */}
      <div className="setting-item">
        <h4>Data Backup</h4>
        <button onClick={handleBackup}>Backup Now</button>
        <button onClick={handleRestore}>Restore Data</button>
      </div>

      {/* Account Management */}
      <div className="setting-item">
        <h4>Account Management</h4>
        <button onClick={handleAccountDeactivation}>Deactivate Account</button>
        <button onClick={handleAccountDeletion}>Delete Account</button>
      </div>

    </div>
  </div>
)}

            </div>

            {/* Modal for viewing contact details */}
            {isModalOpen && selectedContact && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Contact Details</h4>
                        <p><strong>Name:</strong> {selectedContact.name}</p>
                        <p><strong>Email:</strong> {selectedContact.email}</p>
                        <p><strong>Phone:</strong> {selectedContact.mobile}</p>
                        <p><strong>Subject:</strong> {selectedContact.subject}</p>
                        <p><strong>CreatedAt:</strong> {selectedContact.createdAt}</p>
                        <p><strong>Message:</strong> {selectedContact.message}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            

        </div>
    );
};

export default AdminPanel;
