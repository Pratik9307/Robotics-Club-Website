const cloudinary = require("cloudinary").v2;

// Upload image to Cloudinary
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };

  // Optionally add height and quality if provided
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";  // Auto-detect the resource type (image, video, etc.)

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
