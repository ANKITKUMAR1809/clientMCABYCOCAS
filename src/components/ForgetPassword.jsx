import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://collegeservermcabycocas.onrender.com/auth/faculty/forget-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate(`/reset-password:${email}`);
      } else {
        toast.error(data.message || "Email Not exist");
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
          Forget Password
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
