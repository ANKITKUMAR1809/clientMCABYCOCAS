import { BellDot } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AdmissionInfo from "../components/AdmissionInfo";

const Student = () => {
  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      batch: formData.get("batch"),
      email: formData.get("email"),
    };

    try {
      const response = await fetch(
        "https://collegeservermcabycocas.onrender.com/register-student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        e.target.reset();
      } else {
        toast.error(result.error || result.info || "Something went wrong");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("Network error, please try again");
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-12"
      >
        <title>Student | MCABYCOCAS</title>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start justify-center">
          {/* Form Container */}
          <motion.form
            onSubmit={handleRegisterStudent}
            className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              Register to Get Notification <BellDot className="text-green-500" />
            </h1>

            <div className="flex flex-col gap-4">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="batch" className="text-sm font-semibold text-gray-700">
                Batch Year
              </label>
              <motion.input
                type="text"
                id="batch"
                name="batch"
                placeholder="Your Batch Year (e.g., 2024)"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
              />
            </div>

            <motion.button
              type="submit"
              className="mt-4 bg-green-500 text-white text-lg font-semibold py-3 rounded-md shadow-lg hover:bg-green-600 active:scale-95 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Notified
            </motion.button>
          </motion.form>

          {/* Admission Info Section */}
          <div className="w-full max-w-3xl">
            <AdmissionInfo />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Student;
