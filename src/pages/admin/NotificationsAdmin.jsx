import { useEffect, useState } from "react";
import {
  getAdminNotifications,
  getAdminSentNotifications,
  updateAdminNotification,
} from "../../components/api/api";
import { motion } from "framer-motion";
import { HiMailOpen, HiMail } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { formatDate } from "../../util/util";
import { Tooltip as ReactTooltip } from "react-tooltip";

const NotificationsAdmin = () => {
  const [notifications, setNotifications] = useState([]);
  const [sentNotifications, setSentNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const response = await getAdminNotifications();
      setNotifications(response);
      setFilteredNotifications(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchSentNotifications = async () => {
    try {
      const response = await getAdminSentNotifications();
      setSentNotifications(response);
    } catch (error) {
      console.error("Error fetching sent notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchSentNotifications();
  }, []);

  const filterNotifications = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredNotifications(notifications);
    } else if (status === "read") {
      setFilteredNotifications(
        notifications.filter((notification) => notification.read)
      );
    } else if (status === "unread") {
      setFilteredNotifications(
        notifications.filter((notification) => !notification.read)
      );
    } else if (status === "sent") {
      setFilteredNotifications(sentNotifications);
    }
  };

  const handleRead = async (id, read) => {
    try {
      let formData;
      if (read) {
        formData = {
          read: false,
        };
      } else {
        formData = {
          read: true,
        };
      }
      await updateAdminNotification(id, formData);
      fetchNotifications();
      navigate("/notification-msg");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen p-8 bg-slate-100 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 max-md:text-2xl dark:text-white">
          Notifications
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => filterNotifications("all")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } transition-colors duration-300`}
          >
            All
          </button>
          <button
            onClick={() => filterNotifications("read")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              filter === "read"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } transition-colors duration-300`}
          >
            Read
          </button>
          <button
            onClick={() => filterNotifications("unread")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              filter === "unread"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } transition-colors duration-300`}
          >
            Unread
          </button>
          <button
            onClick={() => filterNotifications("sent")}
            className={`px-4 py-2 mx-2 rounded-lg ${
              filter === "sent"
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-700"
            } transition-colors duration-300`}
          >
            Sent
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotifications?.map((notification) => (
            <motion.div
              key={notification.id}
              className={`p-6 rounded-lg shadow-lg bg-white relative cursor-pointer transition-transform transform hover:scale-105 dark:bg-gray-800`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                {filter === "sent" ? (
                  <p className="text-lg break-words text-primary dark:text-gray-300 sm:text-xl">
                    To: {notification.email}
                  </p>
                ) : (
                  <p className="text-lg break-words text-primary dark:text-gray-300 sm:text-xl">
                    From: {notification.email}
                  </p>
                )}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {notification.subject}
                  </h3>
                  {filter !== "sent" &&
                    (notification.read ? (<>
                      <HiMailOpen
                         data-tooltip-id="my-tooltip"
                      data-tooltip-content="Mark as unread"
                        onClick={() =>
                          handleRead(notification.id, notification.read)
                        }
                        className="text-green-500 cursor-pointer"
                        size={24}
                      />
                      <ReactTooltip id="my-tooltip" />
                      </>
                    ) : (<>
                      <HiMail
                        onClick={() =>
                          handleRead(notification.id, notification.read)
                        }
                        className="text-red-500 cursor-pointer"
                        size={24}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Mark as read"
                        />
                        <ReactTooltip id="my-tooltip" />
                        </>
                    ))}
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  {notification.message}
                </p>
                {filter !== "sent" && (
                  <NavLink
                    to="/notification"
                    state={{ notification: notification }}
                  >
                    <button className="absolute flex items-center px-2 py-2 font-semibold rounded-lg shadow-md bottom-1 right-1 dark:text-white max-md:text-sm hover:text-white hover:bg-primary hover:bg-primary-dark">
                      Reply
                    </button>
                  </NavLink>
                )}
              </div>
              <p className="absolute text-sm text-primary bottom-1 left-1 dark:text-gray-300">
                  {formatDate(notification.created_at)}
                </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsAdmin;