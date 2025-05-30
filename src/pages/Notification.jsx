import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Notification = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 13;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://collegeservermcabycocas.onrender.com/get-notification");
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications || []);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch notifications.");
        }
      } catch (err) {
        setError("Error fetching notifications.");
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const lastIndex = currentPage * notificationsPerPage;
  const firstIndex = lastIndex - notificationsPerPage;
  const currentNotifications = notifications.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  const goToPage = (pageNum) => setCurrentPage(pageNum);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Download handler using fetch + blob + programmatic click
  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image");
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4"
      aria-live="polite"
    >
      <title>Notifications | YourAppName</title>

      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Public Notifications
        </h2>

        {loading && (
          <p className="text-center text-gray-600">Loading notifications...</p>
        )}

        {error && !loading && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications yet.</p>
        )}

        {!loading && !error && notifications.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">#</th>
                    <th className="px-5 py-3 text-left font-semibold">Name</th>
                    <th className="px-5 py-3 text-left font-semibold">Notice</th>
                    <th className="px-5 py-3 text-left font-semibold">
                      Attachment
                    </th>
                    <th className="px-5 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentNotifications.map((note, index) => (
                    <tr
                      key={note._id || index}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {firstIndex + index + 1}
                      </td>
                      <td className="px-5 py-4 text-gray-700">{note.name}</td>
                      <td className="px-5 py-4 text-gray-700">
                        {note.notice || "-"}
                      </td>
                      <td className="px-5 py-4">
                        {note.image ? (
                          <button
                            onClick={() =>
                              handleDownload(
                                note.image,
                                `notification_${note._id || index}.jpg`
                              )
                            }
                            className="text-blue-600 hover:underline focus:outline-none"
                            aria-label="Download Attachment"
                          >
                            Download Image
                          </button>
                        ) : (
                          <span className="italic text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatDate(note.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <nav
                className="flex justify-center mt-6 space-x-2"
                role="navigation"
                aria-label="Pagination Navigation"
              >
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-4 py-2 rounded-md font-semibold border ${
                        currentPage === pageNum
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }`}
                      aria-current={
                        currentPage === pageNum ? "page" : undefined
                      }
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </nav>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Notification;
