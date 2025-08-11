
// src/components/Login/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black bg-opacity-75 py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-gray-400 text-sm">
          Questions? Call 000-800-919-1743 (Toll-Free)
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 mb-6">
          <a href="#" className="text-gray-400 hover:underline text-sm">FAQ</a>
          <a href="#" className="text-gray-400 hover:underline text-sm">Help Centre</a>
          <a href="#" className="text-gray-400 hover:underline text-sm">Terms of Use</a>
          <a href="#" className="text-gray-400 hover:underline text-sm">Privacy</a>
          <a href="#" className="text-gray-400 hover:underline text-sm">Cookie Preferences</a>
          <a href="#" className="text-gray-400 hover:underline text-sm">Corporate Information</a>
        </div>

        <div className="flex items-center">
          <select className="bg-black border border-gray-600 text-white px-4 py-2 rounded-sm text-sm">
            <option>🌐 English</option>
            <option>🌐 हिन्दी</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;