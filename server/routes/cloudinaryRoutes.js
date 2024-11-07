const express = require("express");
const { uploadPhoto } = require("../Controllers/cloudinaryController");
const router = express.Router();

// Define the route for uploading images with authentication
router.post("/upload",uploadPhoto); // Add authenticateUser here

module.exports = router;
