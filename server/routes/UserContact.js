// routes/UserContact.js

const express = require('express');
const router = express.Router();
const {deleteReply, getUserMessages, sendMessage } = require('../Controllers/UserContactController');


// Fetch user messages
router.get('/:email/messages', getUserMessages);

// Send a new message
router.post('/:email/message', sendMessage);

router.delete('/:email/message/:index', deleteReply);

module.exports = router;
