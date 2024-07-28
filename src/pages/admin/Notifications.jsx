import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { postNotifications } from "../../components/api/api";

const SendNotificationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state?.booking;
  const notification = location.state?.notification;

  //check when bookingdetails is available
  let defaultMessage;
  let defaultSubject;
  if (bookingDetails) {
    defaultMessage = `Hello ${bookingDetails.user_username}, your booking has been confirmed for ${bookingDetails.check_in_date} to ${bookingDetails.check_out_date}. Here are the details:\n\n`;
    defaultMessage += `Listing: ${bookingDetails.title}\n`;
    defaultMessage += `Location: ${bookingDetails.location}\n`;
    defaultMessage += `Total Amount: $${bookingDetails.total_amount}\n\n`;
    defaultMessage += `Thank you for booking with us!`;
    defaultSubject = `Booking Confirmation`;
    if (bookingDetails?.status === "cancelled") {
      defaultMessage = `Hello ${bookingDetails.user_username}, we regret to inform you that your booking has been cancelled.\n\n`;
      defaultMessage += `Booking Details:\n`;
      defaultMessage += `Listing: ${bookingDetails.title}\n`;
      defaultMessage += `Location: ${bookingDetails.location}\n`;
      defaultMessage += `Check-in Date: ${bookingDetails.check_in_date}\n`;
      defaultMessage += `Check-out Date: ${bookingDetails.check_out_date}\n\n`;
      defaultMessage += `We apologize for any inconvenience caused.`;
      defaultSubject = `Booking Cancelled`;
    }
    if (bookingDetails?.status === "completed") {
      defaultMessage = `Hello ${bookingDetails.user_username}, your bookin has been completed.\n\n`;
      defaultMessage += `Booking Details:\n`;
      defaultMessage += `Listing: ${bookingDetails.title}\n`;
      defaultMessage += `Location: ${bookingDetails.location}\n`;
      defaultMessage += `Check-in Date: ${bookingDetails.check_in_date}\n`;
      defaultMessage += `Check-out Date: ${bookingDetails.check_out_date}\n\n`;
      defaultMessage += `Thank you for staying with us! We hope to see you again soon.`;
      defaultSubject = `Booking Completed`;
    }
  } 

  const [email, setEmail] = useState(
    bookingDetails != null
      ? bookingDetails.user_email
      : notification != null
      ? notification.email
      : ""
  );
  const [subject, setSubject] = useState(
    bookingDetails != null ? defaultSubject : ""
  );
  const [message, setMessage] = useState(
    bookingDetails != null ? defaultMessage : ""
  );
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
    let formData;
    if (bookingDetails) {
      formData = {
        user_id: bookingDetails.user_id,
        message: message,
        subject: subject,
        email: email,
        booking_id: bookingDetails.id,
      };
    }

    if (notification) {
      formData = {
        user_id: notification.user_id,
        message: message,
        subject: subject,
        email: email,
        booking_id: notification.booking_id,
      };
    }

    try {
      await postNotifications(formData);
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

export default SendNotificationPage;
