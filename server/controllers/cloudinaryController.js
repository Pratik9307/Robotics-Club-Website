const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Receipt = require("../models/reciept");  // Correct model import

exports.uploadPhoto = async (req, res) => {
  try {
    const { studentName, studentEmail, accountType } = req.body;

    // Validate the request
    if (!req.files || !req.files.image || !studentName || !studentEmail || !accountType) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const file = req.files.image;

    // Use the utility to upload the image to Cloudinary
    const result = await uploadImageToCloudinary(file, 'codehelp');

    // Create a new Receipt document in MongoDB
    const newReceipt = new Receipt({
      studentName,
      studentEmail,
      accountType,
      imageUrl: result.secure_url,  // URL of the uploaded image
      publicId: result.public_id,    // Public ID of the uploaded image (useful for deletion)
    });

    // Save the receipt to the database
    await newReceipt.save();

    return res.status(200).json({
      success: true,
      message: 'Image uploaded and student data saved successfully',
      receipt: newReceipt,
    });
  } catch (error) {
    console.error('Error uploading image or saving data:', error);
    return res.status(500).json({ success: false, message: 'Image upload failed' });
  }
};




