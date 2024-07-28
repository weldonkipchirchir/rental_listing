/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
function Completion(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 padding dark:bg-gray-900"
    >
      <h1 className="text-2xl dark:text-white text-center">
        Congratulations!! Payment and Booking successful 
      </h1>
      ;
      <div className="flex justify-center">
        <NavLink
          className="text-xl bg-primary rounded-md p-2 text-white text-center"
          to="/bookings"
        >
          Bookings
        </NavLink>
      </div>
    </motion.div>
  );
}

export default Completion;
