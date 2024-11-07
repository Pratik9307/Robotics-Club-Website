// Admin.js
const express = require('express');
const User = require("../models/User");
const Contact = require("../models/Contact");

const router = express.Router();
const Receipt = require('../models/reciept');

// GET all receipts
router.get('/receipts', async (req, res) => {
    try {
        const receipts = await Receipt.find();
        res.json(receipts);
    } catch (error) {
        console.error("Error fetching receipts:", error);
        res.status(500).send("Server error");
    }
});

// DELETE a receipt by ID
router.delete('/receipts/:id', async (req, res) => {
    try {
        const receiptId = req.params.id;
        await Receipt.findByIdAndDelete(receiptId);
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting receipt:', error);
        res.status(500).send("Server error");
    }
});


// Get reports
router.get('/reports', async (req, res) => {
    try {
        const totalStudents = await User.countDocuments();
        const totalContacts = await Contact.countDocuments();
        const students = await User.find();
        const contacts = await Contact.find();
        
        res.json({
            totalStudents,
            totalContacts,
            students,
            contacts
        });
    } catch (error) {
        console.error("Error fetching report data:", error);
        res.status(500).send("Server error");
    }
});

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
    try {
        const student = await User.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        res.json({ msg: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        res.json({ msg: 'Contact deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all students
router.get('/students', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Verify a student by ID
router.put('/students/verify/:id', async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        student.verified = !student.verified;
        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Verify a contact by ID
router.put('/contacts/verify/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        contact.verified = !contact.verified;
        await contact.save();
        res.json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
