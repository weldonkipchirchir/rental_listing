/* eslint-disable react/prop-types */
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useLocation } from "react-router-dom";
import cn from "../../utils/cn";
import { motion } from "framer-motion";
import { sendAdminResetPassword, sendUserResetPassword } from "./api/api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const role = location.state?.role || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    let formData={
        email: email,
      };
    try {
      if (role === "admin") {
        await sendAdminResetPassword(formData);
      } else if (role === "user") {
        await sendUserResetPassword(formData);
      }
      setMessage("Check your email for further instructions.");
      setStatus("idle");
    } catch (err) {
      setMessage(err.message);
      setStatus("idle");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900"
    >
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-slate-500">
        <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-neutral-200">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm font-bold text-center text-neutral-600 dark:text-neutral-300">
          Enter your email address to receive a password reset link.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="your-email@example.com"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="w-full py-3 font-medium text-white transition-all duration-300 rounded-md shadow-inner bg-gradient-to-br from-primary dark:from-primary dark:to-primary to-secondary hover:shadow-md dark:shadow-md dark:bg-primary"
            disabled={status === "submitting"}
            type="submit"
          >
            {status === "submitting" ? "Submitting..." : "Submit"} &rarr;
            <BottomGradient />
          </button>

          {message && (
            <p className="m-3 text-center text-green-600">{message}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
