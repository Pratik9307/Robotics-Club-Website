const express = require('express');
const router = express.Router();
const {login} = require('../Controllers/AdminLogin');

// @route   POST /api/admin/register
// @desc    Register a new admin
// @access  Public


router.post('/Login', login);


module.exports = router;