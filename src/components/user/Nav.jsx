import Avatar from "react-avatar";
import { GiSpookyHouse } from "react-icons/gi";
import { useState, useContext, useEffect, useRef } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { ThemeContext } from "../context/ThemeContext";
import Cookies from "js-cookie";
import {
  guestLinks,
  userLinks,
  getActiveStyles,
  adminLinks,
} from "../../util/links";
import { IoMdMoon, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  getAdminUnreadNotifications,
  getUserUnreadNotifications,
} from "../api/api";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dropdownRef = useRef(null);
  const { isLoggedIn, userInfo, setIsLoggedIn, setUserInfo, setUser } =
    useAuth();
  const navigate = useNavigate();
  let userName;

  let links;

  if (isLoggedIn && userInfo && userInfo.user) {
    if (userInfo.user.role === "user") {
      links = userLinks;
      userName = userInfo.user.username;
    } else if (userInfo.user.role === "admin") {
      links = adminLinks;
      userName = userInfo.user.username;
    }
  } else {
    links = guestLinks;
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserInfo(null);
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    navigate("/", { replace: true });
  };

  async function getNotifications() {
    try {
      if (userInfo?.user.role === "user") {
        const res = await getUserUnreadNotifications();
        setNotifications(res);
      } else if (userInfo?.user.role === "admin") {
        const res = await getAdminUnreadNotifications();
        setNotifications(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    if (userInfo?.user.role === "user" || userInfo?.user.role === "admin") {
      getNotifications();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfo?.user.role, notifications]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b dark:bg-gray-900 border-gray-400">
      <div className="flex items-center gap-3">
        <GiSpookyHouse className="h-9 w-9 text-primary dark:text-white" />
        <NavLink to="/" className="text-2xl font-bold dark:text-white">
          Rently
        </NavLink>
      </div>
      <div className="hidden md:flex gap-4 items-center">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            style={({ isActive }) => getActiveStyles(isActive, link.name)}
            className="text-lg font-medium hover:text-primary dark:text-white"
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <Avatar name={userName} size="40" round />
              {!showDropdown && notifications && notifications.length > 0 && (
                <div className="absolute top-0 right-4 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </div>
              )}
              {showDropdown ? (
                <IoMdArrowDropup className="text-primary dark:text-white" />
              ) : (
                <IoMdArrowDropdown className="text-primary dark:text-white" />
              )}
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50">
                <div
                  onClick={toggleTheme}
                  className="flex items-center gap-4 justify-between px-4 py-2 cursor-pointer dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "dark" ? (
                    <>
                      <IoSunnyOutline className="w-6 h-6" />
                      <span className="text-sm">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <IoMdMoon className="w-6 h-6" />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  )}
                </div>
                <NavLink
                  to={
                    userInfo.user.role === "admin"
                      ? "/admin-settings"
                      : "/user-settings"
                  }
                  className="block px-4 py-2 dark:text-white hover:bg-gray-100 text-sm dark:hover:bg-gray-700"
                >
                  Settings
                </NavLink>
                <NavLink
                  to={
                    userInfo.user.role === "user"
                      ? `/notifications`
                      : "/notification-msg"
                  }
                  className="block px-4 py-2 text-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Notifications{" "}
                  <span className="text-red-500 text-sm">
                    {notifications && notifications.length > 0
                      ? `(${notifications.length} New)`
                      : ""}
                  </span>
                </NavLink>
                {userInfo.user.role === "user" && (
                  <NavLink
                    to="/payments"
                    className="block px-4 py-2 dark:text-white hover:bg-gray-100 text-sm dark:hover:bg-gray-700"
                  >
                    Payments
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <div className="md:hidden">
          {showMenu ? (
            <IoClose
              className="w-10 h-10 text-3xl cursor-pointer text-primary dark:text-white"
              onClick={toggleMenu}
            />
          ) : (
            <HiMenuAlt2
              className="w-10 h-10 text-3xl cursor-pointer text-primary dark:text-white"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50">
          <ul className="flex flex-col items-center gap-4 py-4">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                style={({ isActive }) => getActiveStyles(isActive, link.name)}
                className="text-lg font-medium hover:text-primary dark:text-white"
              >
                {link.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
