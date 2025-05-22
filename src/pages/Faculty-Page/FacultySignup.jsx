import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const FacultySignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://collegeservermcabycocas.onrender.com/auth/faculty-signup",
        formData,
        { withCredentials: true }
      );
      if (response.ok) {
        toast.success("Signup successful!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-800/40 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-zinc-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-tight">
          Faculty Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <input
                  type={field.includes("password") ? "password" : field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="peer w-full px-4 py-3 text-white bg-zinc-800 border border-zinc-600 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={
                    field === "confirmPassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                />
                <label
                  htmlFor={field}
                  className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-400"
                >
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </motion.div>
            )
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 transition duration-300 text-white font-semibold rounded-lg shadow-md shadow-indigo-900"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FacultySignup;
