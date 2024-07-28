import { useState } from "react";
import { motion } from "framer-motion";
import { updateAdmin } from "../../components/api/api";
import { useAuth } from "../../components/context/auth";

const Settings = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("password do not match");
      return;
    }

    const formData = {
      newPassword: newPassword,
      currentPassword: currentPassword,
      username: username,
    };

    try {
      const res = await updateAdmin(formData);
      setStatus(res.message);
      setError(null);
      setUsername("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
      setStatus(null);
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
      <div className="p-8 bg-gray-100 md:p-16 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h1 className="md:mb-8 pt-2 max-md:text-2xl text-3xl font-bold text-center text-gray-900 dark:text-white">
            Settings
          </h1>
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Change Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Enter new username"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="current-password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Enter current password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
            >
              Save Changes
            </button>
          </form>
          {error && <p className="text-xl text-center text-red-600">{error}</p>}
          {status && (
            <p className="text-xl text-center text-green-600">{status}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
