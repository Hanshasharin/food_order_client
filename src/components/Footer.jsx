// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Brand / Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">FoodieApp</h2>
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Contact / Email */}
        <div>
          <p className="text-gray-400 mb-2">Contact us:</p>
          <a
            href="mailto:support@foodieapp.com"
            className="text-blue-400 hover:text-blue-600 underline"
          >
            support@foodieapp.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
