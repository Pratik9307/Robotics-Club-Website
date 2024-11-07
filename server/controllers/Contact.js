const Contact = require("../models/Contact");

exports.contact = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // Log the incoming data for debugging
    console.log("Received contact form data:", { name, email, mobile, subject, message });

    // Check if all fields are provided
    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }

    // Save contact data to MongoDB
    const contact = await Contact.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    console.log("Contact saved:", contact); // Log saved contact data

    return res.status(201).json({
      status: 201,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error saving contact form:", error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while submitting the form.",
    });
  }
};
