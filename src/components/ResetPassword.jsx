import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://collegeservermcabycocas.onrender.com/auth/faculty/verify-otp/${email}`,
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
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://collegeservermcabycocas.onrender.com/auth/faculty/reset-password/${email}`,
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
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    }
    setLoading(false);
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

        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.form
              key="otp-form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium mb-1">OTP</label>
              <input
                type="text"
                name="otp"
                onChange={handleChange}
                value={otp}
                required
                placeholder="Enter OTP (6 digits)"
                autoFocus
                maxLength={6}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
                className={`w-full py-2 rounded-xl ${
                  loading ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-700 hover:bg-zinc-600"
                } text-white font-medium shadow-md transition-all`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="password-form"
              onSubmit={handlePasswordSubmit}
              className="mt-4 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={password.password}
                required
                placeholder="Enter your new password"
                autoFocus
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              />
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handlePasswordChange}
                value={password.confirmPassword}
                required
                placeholder="Confirm Password"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
                className={`w-full py-2 rounded-xl ${
                  loading ? "bg-zinc-500 cursor-not-allowed" : "bg-zinc-700 hover:bg-zinc-600"
                } text-white font-medium shadow-md transition-all`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
