import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import "./ForgotPassword.css"; // Import CSS file
import Navbar from "../components/Navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="forgot-password-container">
    <Navbar/>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="forgot-password-content">
          <h1 className="forgot-password-title">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="forgot-password-text">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}.`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="form-label">
                <p>Email Address <sup>*</sup></p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-input"
                />
              </label>
            )}
            <button type="submit" className="submit-button">
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="back-to-login">
            <Link to="/login">
              <p className="back-to-login-text">  
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
