/* eslint-disable react/no-unescaped-entities */
import { Signup } from "../components/SignUp";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function SIgnUpUser() {
  const { state } = useLocation();
  const role = state?.role || "user";

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:1}}
      transition={{duration:1.3}}
      >
    <main className="padding min-h-[80vh] bg-slate-100 dark:bg-gray-900">
      <Signup role={role}/>
    </main>
    </motion.div>
  );
}

export default SIgnUpUser;
