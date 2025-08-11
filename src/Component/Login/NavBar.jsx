// src/components/Login/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-red-600 text-3xl font-black tracking-wide hover:text-red-500 transition">
          NETFLIX
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;