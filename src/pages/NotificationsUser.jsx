import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { postAdminNotifications } from "../components/api/api";

const SendUserNotificationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state?.booking;

  let defaultMessage
  if(bookingDetails){
    defaultMessage = `Hello ${bookingDetails.admin_username}, `;
  }
  const notification = location.state?.notification;
  
  const [email, setEmail] = useState(
    bookingDetails != null
    ? bookingDetails.user_email
    : notification != null
    ? notification.email
    : ""
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState( bookingDetails != null ? defaultMessage : "");
  const [status, setStatus] = useState(null);

  const handleEmailChange = (e) => {
    setStatus(null);
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setStatus(null);
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setStatus(null);
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData
    if (bookingDetails){
    formData = {
      admin_id: bookingDetails.admin_id,
      message: message,
      subject: subject,
      email: email,
      booking_id: bookingDetails.id,
    };
  }
    if (notification){
    formData = {
      admin_id: notification.admin_id,
      message: message,
      subject: subject,
      email: email,
      booking_id: notification.booking_id,
    };
  }

    try {
      await postAdminNotifications(formData);
      setStatus("success");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
            Send Notification
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter recipient's email address"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter email subject"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter email message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            >
              Send Notification
            </button>
          </form>
          {status && (
            <div className="mt-4">
              <p className="text-sm font-medium text-center text-green-600">
                {status === "success"
                  ? "Notification sent successfully!"
                  : "An error occurred. Please try again."}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SendUserNotificationPage;
