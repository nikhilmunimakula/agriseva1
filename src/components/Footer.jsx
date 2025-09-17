import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="text-sm">&copy; 2025 CropConnect. All rights reserved.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;