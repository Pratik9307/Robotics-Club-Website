import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
<footer class="footer">
  <div class="footer-container">
    <div class="footer-section footer-logo-section">
      <img src="path/to/logo.png" alt="Sanjivani College of Engineering" class="footer-logo" />
      <h1>Sanjivani College of Engineering</h1>
      <p>
        Established in 1983, Sanjivani College of Engineering is affiliated with Savitribai Phule Pune University and approved by AICTE. The college offers a range of undergraduate, postgraduate, and doctoral programs in engineering, management, and other fields.
      </p>
    </div>
    <div class="footer-section footer-contact-section">
      <h2>Contact Us</h2>
      <p><strong>Address:</strong> Shingnapur, Kopargaon, Ahmednagar, Maharashtra 423603, India</p>
      <p><strong>Phone:</strong> +91 2423 222862, +91 2423 222866</p>
      <p><strong>Email:</strong> <a href="mailto:info@sanjivani.org.in">info@sanjivani.org.in</a></p>
    </div>
    <div class="footer-section footer-links-section">
      <h2>Quick Links</h2>
      <ul>
        <li><a href="https://www.sanjivani.org.in/admissions">Admissions</a></li>
        <li><a href="https://www.sanjivani.org.in/courses">Courses</a></li>
        <li><a href="https://www.sanjivani.org.in/placements">Placements</a></li>
        <li><a href="https://www.sanjivani.org.in/contact">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Sanjivani College of Engineering. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;
