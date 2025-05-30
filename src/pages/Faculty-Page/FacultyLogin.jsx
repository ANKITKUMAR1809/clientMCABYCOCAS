import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import FacultyContext from "../../context/FacultyContext";
import { Eye, EyeClosed } from "lucide-react";

const FacultyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const navigate = useNavigate();
  const { loggedIn, user, login } = useContext(FacultyContext);

  useEffect(() => {
    if (loggedIn && user) {
      navigate("/faculty");
    }
  }, [loggedIn, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/auth/faculty-login", {
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
        login(data.token, data.user); // store token and user via context
        navigate("/faculty");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
    } finally {
      setLoading(false);
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
          Faculty Login
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm flex items-center w-full ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-zinc-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
              />
              <span className="px-2 cursor-pointer">
                {showPassword ? (
                  <EyeClosed
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-zinc-400 hover:text-white transition"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-zinc-400 hover:text-white transition"
                  />
                )}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-right text-sm"
          >
            <Link
              to="/forget-password"
              className="text-zinc-400 hover:text-white underline transition"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            disabled={loading}
            className={`w-full py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white font-medium shadow-md transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FacultyLogin;
