import { FaFacebook } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/auth";

function Footer() {
  const year = new Date().getFullYear();
  const { isLoggedIn, userInfo } =
  useAuth();

  return (
    <div className="w-full py-6 bg-gray-100 border-t-2 border-gray-700 padding-x dark:bg-gray-900 dark:border-gray-700">
      <div className="grid w-full grid-cols-1 gap-6 text-center md:grid-cols-4 md:gap-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-start dark:text-white">RentEasy</h1>
          <p className="py-3 text-lg text-start dark:text-white">
            Find your next home with ease on RentEasy, the ultimate platform for
            rental listings. Whether you are looking for apartments, houses, or
            short-term rentals, we connect you with your ideal living space
            quickly and efficiently.
          </p>
          <div className="flex justify-start gap-5 py-4">
            <FaFacebook className="text-2xl dark:text-white" />
            <CiTwitter className="text-2xl dark:text-white" />
            <CiInstagram className="text-2xl dark:text-white" />
            <CiLinkedin className="text-2xl dark:text-white" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 sm:mx-auto">
          <h1 className="text-xl font-bold text-start dark:text-white">Account</h1>
          <NavLink className="hover:text-primary dark:text-white" to="/">Home</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to={isLoggedIn && userInfo.user.role === "user" ?`/rentals`:`/listing`}>Listings</NavLink>
          {isLoggedIn && userInfo.user.role == "user" && <NavLink className="hover:text-primary dark:text-white" to="/bookmarks">Bookmarks</NavLink>}
          <NavLink className="hover:text-primary dark:text-white" to={isLoggedIn && userInfo.user.role === "user" ?`/notifications`:`/notification`}>Notifications</NavLink>
        </div>
        <div className="flex flex-col items-start gap-3 sm:mx-auto">
          <h1 className="text-xl font-bold dark:text-white">About</h1>
          <NavLink className="hover:text-primary dark:text-white" to="/about-us">About Us</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to="/">Contact Us</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to="/">Privacy Policy</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to="/">Terms of Service</NavLink>
        </div>
        <div className="flex flex-col items-start gap-3 sm:mx-auto">
          <h1 className="text-xl font-bold dark:text-white">Company</h1>
          <NavLink className="hover:text-primary dark:text-white" to="/">Careers</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to="/">Help Center</NavLink>
          <NavLink className="hover:text-primary dark:text-white" to="/">Support</NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center py-2 text-xl">
        <p className="dark:text-white">Copyright © {year} RentEasy</p>
      </div>
    </div>
  );
}

export default Footer;
