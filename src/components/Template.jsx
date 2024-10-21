import React from 'react';
import frameImage from "../assets/frame.png";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { FcGoogle } from "react-icons/fc";
import './Template.css'; // Import external CSS
import Navbar from './Navbar';
import { useSelector } from 'react-redux'; // Import useSelector

const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
  const { loading } = useSelector((state) => state.auth); // Get loading state

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div> {/* Spinner from your first code */}
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Navbar />
      <div className="template-container">
        <div className="template-left">
          <h1 className="template-title">{title}</h1>
          <p className="template-description">
            <span className="template-desc1">{desc1}</span>
            <br />
            <span className="template-desc2">{desc2}</span>
          </p>

          {formtype === "signup" ? (
            <SignupForm setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}

          <div className="divider">
            <div className="divider-line"></div>
            <p className="divider-text">OR</p>
            <div className="divider-line"></div>
          </div>

          <button className="google-button">
            <FcGoogle />
            <p>Sign Up with Google</p>
          </button>
        </div>

        <div className="template-right">
          <img
            
          />
          <img
            src={image}
            alt="Students"
            className="template-student-img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;
