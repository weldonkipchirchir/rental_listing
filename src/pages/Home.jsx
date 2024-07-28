/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import h1Background from "../assets/h1.jpeg"; // Replace with your actual image path
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { testimonialList } from "../util/product";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/context/auth";

function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const {user}= useAuth()

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let link

  if (user?.role == "admin"){
    link ="/listing"
  } else{
    link = "/rentals"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen max-[770px]:mt-20 bg-gray-100 dark:bg-gray-900"
    >
      {/* Content Section */}
      <div
        className="relative flex flex-col justify-center items-center z-20 w-full h-100vh min-h-[600px] px-6 py-12 mx-auto -mt-20 text-center text-white bg-black bg-opacity-50 bg-center bg-cover rounded-md md:mt-0"
        style={{
          backgroundImage: `url(${h1Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          imageRendering: "auto",
        }}
      >
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Rental Vibes</h1>
        <p className="mb-4 text-lg md:text-xl">
          Step into a world where houses aren't just buildings, they're stories
          waiting to be lived.
        </p>
        <NavLink to={link}>
        <button className="px-10 py-3 text-white rounded-md w-min bg-primary hover:bg-primary-dark">
          Explore
        </button>
        </NavLink>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-center text-black mt-7 dark:text-white">
          Why Choose Us?
        </h1>
        <div className="relative z-30 justify-center mx-auto text-center text-white padding-l md:grid md:grid-cols-4 md:gap-6 dark:bg-gray-900">
          <div className="p-6 md:col-span-1 md:text-left">
            <h2 className="py-2 text-3xl font-bold text-black md:text-4xl dark:text-white">
              100+
            </h2>
            <p className="text-black dark:text-white">Unique Properties</p>
          </div>
          <div className="p-6 md:col-span-1 md:text-left">
            <h2 className="py-2 text-3xl font-bold text-black md:text-4xl dark:text-white">
              95%
            </h2>
            <p className="text-black dark:text-white">Satisfaction Rate</p>
          </div>
          <div className="p-6 md:text-left">
            <h2 className="py-2 text-3xl font-bold text-black dark:text-white md:text-4xl">
              100+
            </h2>
            <p className="text-black dark:text-white">Trusted Partners</p>
          </div>
          <div className="p-6 md:text-left">
            <h2 className="py-2 text-3xl font-bold text-black md:text-4xl dark:text-white">
              24/7
            </h2>
            <p className="text-black dark:text-white">Support Team</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-10 padding-x">
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-semibold text-center max-sm:text-2xl dark:text-white">
              Curious Mind Want to Know
            </h1>

            {["How to Rent?", "Maintenance?", "Can I Decorate?"].map(
              (title, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between w-full my-4">
                    <h1 className="text-2xl font-semibold dark:text-white max-sm:text-xl">{title}</h1>
                    <div>
                      {openIndex === index ? (
                        <IoIosArrowUp
                          className="text-2xl dark:text-white"
                          onClick={() => toggleDropdown(index)}
                        />
                      ) : (
                        <IoIosArrowDown
                          className="text-2xl dark:text-white"
                          onClick={() => toggleDropdown(index)}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={openIndex === index ? "block text-xl dark:text-gray-400" : "hidden"}
                  >
                    <p>
                      {index === 0 &&
                        "Renting a house is as easy as pie! Just browse our listings, pick your dream home, and contact us to schedule a viewing."}
                      {index === 1 &&
                        "We've got your back! Our maintenance team is on standby to fix any issues faster than you can say 'home sweet home'."}
                      {index === 2 &&
                        "Absolutely! Make your rental feel like home with your personal touch. Paint the walls, hang up art, and let your style shine!"}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-10 padding-x ">
          <h1 className="text-3xl font-semibold text-center dark:text-white max-sm:text-2xl">Testimonials</h1>
          <div className="grid grid-cols-3 gap-8 py-3 max-lg:grid-cols-1">
            {testimonialList.map((testimonial, index) => (
              <div
                key={index}
                className="relative max-[250px]: flex flex-col items-center w-full p-5 my-4 border-2 border-gray-300 rounded-lg"
              >
                <RiDoubleQuotesL className="absolute -mt-4 -ml-4 text-2xl text-gray-500 dark:text-white top-1 left-4" />
                <p className="my-5 dark:text-gray-400">{testimonial.description}</p>
                <h1 className="text-2xl font-semibold dark:text-white max-sm:text-xl">{testimonial.name}</h1>
                <RiDoubleQuotesR className="absolute -mb-4 -mr-4 text-2xl font-bold text-gray-500 dark:text-white bottom-1 right-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
