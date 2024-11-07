// controllers/AdminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        // Create new admin
        admin = new Admin({
            username,
            password,
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        // Save the admin to the database
        await admin.save();

        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



