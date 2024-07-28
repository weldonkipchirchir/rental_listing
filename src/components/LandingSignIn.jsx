import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const LandingSignIn = () => {
  const location = useLocation();
  const pathname = location.state?.pathname || "/";

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className=" mx-auto px-4 py-8 min-h-[80vh] bg-gray-100 dark:bg-gray-900"
  >
    <div className="flex flex-col items-center justify-center h-[80vh] ">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 max-sm:text-xl dark:text-white">
        Welcome to Our Platform
      </h1>
      <div className="flex justify-center gap-8">
        <Link
          to="/signin-admin"
          state={{ pathname }}
          className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded dark:text-white"
        >
          Login as Admin
        </Link>
        <Link
          to="/sign-in"
          state={{ pathname }}
          className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded dark:text-white"
        >
          Login as User
        </Link>
      </div>
    </div>
    </motion.div>
  );
};

export default LandingSignIn;
