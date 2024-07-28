/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [isResent, setIsResent] = useState(false);
  const { state } = useLocation();
  const email = state?.email || 'your email address';

  const handleResendVerification = () => {
    // Add logic to resend verification email here
    setIsResent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Verify Your Email Address
        </h1>
        <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
          A verification email has been sent to <span className="font-semibold text-gray-900 dark:text-white">{email}</span>. 
          Please check your inbox and click on the verification link to activate your account.
        </p>
        <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
          If you didn't receive the email, click the button below to resend the verification email.
        </p>
        <button
          onClick={handleResendVerification}
          className="w-full px-4 py-2 text-white bg-secondary-500 rounded-lg hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Resend Verification Email
        </button>
        {isResent && (
          <p className="mt-4 text-sm text-center text-green-500">
            Verification email resent successfully.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;
