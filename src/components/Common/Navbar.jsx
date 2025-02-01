import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSeedling, FaBars, FaTimes } from "react-icons/fa";
import { UserButton, useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-400 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold flex items-center">
          <FaSeedling className="mr-2" />
          Agrauto
        </div>

        {/* Hamburger Menu for Small Devices */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex ${
            isMenuOpen ? "block" : "hidden"
          } bg-green-600 md:bg-transparent md:space-x-4 flex-col md:flex-row md:items-center z-10`}
        >
          <Link
            to="/"
            className="block md:inline-block text-white hover:bg-white hover:text-green-600 px-3 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block md:inline-block text-white hover:bg-white hover:text-green-600 px-3 py-2 rounded transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/weather"
            className="block md:inline-block text-white hover:bg-white hover:text-green-600 px-3 py-2 rounded transition duration-300"
          >
            Weather
          </Link>
        </div>

        {/* Always Visible Buttons */}
        <div className="space-x-4 flex items-center">
          {isSignedIn ? (
            <Link
              to="/dashboard"
              className="bg-white text-green-600 hover:bg-green-700 hover:text-white px-3 py-2 rounded transition duration-300"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-white text-green-600 hover:bg-green-700 hover:text-white px-3 py-2 rounded transition duration-300"
            >
              Get Started
            </Link>
          )}
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
