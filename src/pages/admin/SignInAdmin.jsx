/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { SignIn } from "../../components/SignIn";
function SIgnInAdmin() {


  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:1}}
      transition={{duration:1.3}}
      >
    <main className="padding min-h-[80vh] bg-slate-100 dark:bg-gray-900">
      <SignIn role="admin"/>
    </main>
    </motion.div>
  );
}

export default SIgnInAdmin;
