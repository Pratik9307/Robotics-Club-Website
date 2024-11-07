import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css"

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="verify-container">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="verify-form-container">
          <h1 className="verify-title">Verify Email</h1>
          <p className="verify-description">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="otp-input"
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button type="submit" className="submit-btn">
              Verify Email
            </button>
          </form>
          <div className="flex items-center justify-between">
            <Link to="/signup" className="back-link">
              <BiArrowBack /> Back To Signup
            </Link>
            <button
              className="resend-btn"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer /> Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
