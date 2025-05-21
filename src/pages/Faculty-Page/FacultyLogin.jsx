import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FacultyContext from "../../context/FacultyContext";
const FacultyLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const {setLoggedIn,loggedIn, user, setUser} = useContext(FacultyContext);
  
  useEffect(()=>{
    if(loggedIn && user)
    {
      console.log(user,loggedIn)
      navigate('/faculty')
    }
  },[loggedIn,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://collegeservermcabycocas.onrender.com/auth/faculty-login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoggedIn(true);
        setUser(data.user);
        navigate("/faculty");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-2xl p-10 max-w-xl w-full"
      >
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-6">
          Faculty Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right text-sm">
            <a
              href="/forgot-password"
              className="text-zinc-600 hover:text-zinc-800 underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FacultyLogin;
