const express = require("express");
const router = express.Router();

// Import Contact controller
const { contact } = require("../Controllers/Contact");

// Route for contact
router.post("/contact", contact);



// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,  // Make sure changePassword is correctly imported
} = require("../Controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Import the auth middleware
const { auth } = require("../middlewares/auth");  // Ensure auth is imported

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for Changing the password (with auth middleware)
router.post("/changepassword", auth, changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;
