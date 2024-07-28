import { motion } from "framer-motion";
function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" mx-auto px-4 py-8 min-h-[80vh]"
    >
      <div className="flex flex-col items-center justify-center dark:text-white">
        <p className=" text-2xl">Page not Found</p>
        <p className="text-xl mt-10 bg-primary cursor-pointer p-2 rounded-md">
          Go back to <a href="/">Home</a>
        </p>
      </div>
    </motion.div>
  );
}

export default NotFound;
