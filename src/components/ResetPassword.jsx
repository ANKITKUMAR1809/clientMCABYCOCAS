import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const [password,setPassword]= useState({password:"",confirmPassword:""});
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://collegeservermcabycocas.onrender.com/auth/faculty/verify-otp/:${email}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setVerified(true);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
      navigate('faculty/login');
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `https://collegeservermcabycocas.onrender.com/auth/faculty/reset-password/:${email}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: password.password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-4 py-10">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-900 text-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 text-white"
        >
          Reset Password
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-1">OTP</label>
            <input
              type="text"
              name="otp"
              onChange={handleChange}
              required
              placeholder="Enter OTP (Number)"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium shadow-md transition-all"
          >
            {verified?"OTP Verified":"Verify OTP"}
          </motion.button>
        </form>
        <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              required
              placeholder="Enter your new password"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              onChange={handlePasswordChange}
              required
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium shadow-md transition-all"
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
