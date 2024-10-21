// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { registerAdmin } = require('../Controllers/Admincontroller');

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public
router.post('/register', registerAdmin);



module.exports = router;
