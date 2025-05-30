import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FacultyContext from "../context/FacultyContext";
import { useContext } from "react";

const AddNotification = () => {
  const [notice, setNotice] = useState("");
  const [file, setFile] = useState(null);

  const { token } = useContext(FacultyContext);

  const handlePublishNotification = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("notice", notice);
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://collegeservermcabycocas.onrender.com/publish-notification",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Notification uploaded successfully!");
        setNotice("");
        setFile(null);
        e.target.reset();
      } else {
        toast.error(data.message || "Failed to upload notification");
      }
    } catch (error) {
      toast.error("Server error while uploading notification.");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg mt-10"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Publish New Notification
      </h2>

      <form onSubmit={handlePublishNotification} className="space-y-6">
        {/* Notice Input */}
        <div>
          <label
            htmlFor="notice"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Notification Message
          </label>
          <textarea
            id="notice"
            name="notice"
            rows={5}
            placeholder="Type the message you want to send..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-800"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="file"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Upload Image (JPG, PNG)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="file"
            name="file"
            className="block w-full text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-200"
          >
            Publish Notification
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddNotification;
