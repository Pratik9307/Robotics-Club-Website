// controllers/UserContactController.js

const mailSender = require('../utils/mailSender');
const Contact = require('../models/Contact'); // Assuming you have a Contact model

// Fetch user messages
exports.getUserMessages = async (req, res) => {
    try {
        const email = req.params.email;
        const contact = await Contact.findOne({ email });

        if (!contact) {
            return res.status(404).json({ message: 'No contact found for this email.' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching user messages:', error);
        res.status(500).json({ message: 'Error fetching messages.' });
    }
};

// Send a new message (Admin Reply)
exports.sendMessage = async (req, res) => {
    try {
        const email = req.params.email;
        const { message } = req.body;

        // Find the user by email
        const contact = await Contact.findOne({ email });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        // Add the reply to the adminReplies array
        contact.adminReplies.push({
            reply: message,
            repliedAt: new Date(),
        });

        // Save the updated contact data
        await contact.save();

        // Send reply via email (using nodemailer or your custom mailSender)
        const emailTemplate = createAdminReplyTemplate(email, message); // Use the email template below
        await mailSender(email, 'Admin Reply', emailTemplate);

        res.status(200).json({ message: 'Reply sent successfully.' });
    } catch (error) {
        console.error('Error sending reply:', error);
        res.status(500).json({ message: 'Error sending reply.' });
    }
};
// controllers/UserContactController.js

// Delete an admin reply
exports.deleteReply = async (req, res) => {
    try {
        const email = req.params.email; // User's email
        const replyIndex = parseInt(req.params.index); // Index of the reply to delete
        console.log('Email:', email, 'Reply Index:', replyIndex); // Debug log

        const contact = await Contact.findOne({ email });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        // Check if the index is valid
        if (replyIndex < 0 || replyIndex >= contact.adminReplies.length) {
            return res.status(400).json({ message: 'Invalid reply index.' });
        }

        // Remove the reply
        contact.adminReplies.splice(replyIndex, 1);
        
        await contact.save();
        console.log('Reply deleted. Remaining replies:', contact.adminReplies); // Debug log

        res.status(200).json({ message: 'Reply deleted successfully.' });
    } catch (error) {
        console.error('Error deleting reply:', error);
        res.status(500).json({ message: 'Error deleting reply.' });
    }
};



// Template for the Admin Reply Email
// Template for the Admin Reply Email
const createAdminReplyTemplate = (email, message) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Admin Reply</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
            .sanjivani-image {
                max-width: 100%;
                height: auto;
                margin-bottom: 20px;
            }
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .highlight {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
          
            <div class="message">Admin Reply From Sanjivani College Of Engineering</div>
            <div class="body">
                <p>Hello,</p>
                <p>The admin has replied to your message with the following response:</p>
                <p><strong>${message}</strong></p>
                <p>If you need further assistance, please feel free to reach out to us at <a href="mailto:info@studynotion.com">techtitan81@gmail.com</a>. We're happy to help!</p>
            </div>
        </div>
    </body>
    </html>`;
};

