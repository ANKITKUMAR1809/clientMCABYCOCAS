import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Boxes,
  Contact,
  GraduationCap,
  Home,
  Info,
  User,
  Menu,
  X,
  Bell,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 font-medium transition-all px-3 py-2 rounded-xl hover:bg-blue-800/20 ${
      isActive ? "text-blue-400" : "text-gray-300"
    }`;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 shadow-lg text-white"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative z-50">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.cocaspatna.ac.in/img/Logo_of_College_of_Commerce,_Arts_and_Science.png"
            alt="College Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold tracking-wide">MCA BY COCAS</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links */}
        <ul
          className={`absolute md:static top-20 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:flex-row flex flex-col md:flex gap-4 md:gap-6 items-start md:items-center p-6 md:p-0 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <li>
            <NavLink to="/" className={navLinkStyle}>
              <Home size={18} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/faculty" className={navLinkStyle}>
              <GraduationCap size={18} /> Faculty
            </NavLink>
          </li>
          <li>
            <NavLink to="/student" className={navLinkStyle}>
              <User size={18} /> Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkStyle}>
              <Info size={18} /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/notificaiton" className={navLinkStyle}>
              <Bell size={18} /> Notifications
            </NavLink>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
