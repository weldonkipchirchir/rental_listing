import { useState, Suspense } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoBookmarksSharp } from "react-icons/io5";
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from "react-icons/io";
import {
  defer,
  Await,
  useLoaderData,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  deleteFavorite,
  getSearchList,
  listings,
  loggedInUserListings,
} from "../components/api/api";
import { createFavorite } from "../components/api/api";
import { useAuth } from "../components/context/auth";

const ITEMS_PER_PAGE = 6;

export function Loader() {
  return defer({
    allListings: listings().catch((error) => ({ error })),
    userListings: loggedInUserListings().catch((error) => ({ error })),
  });
}

export default function Listing() {
  const { isLoggedIn } = useAuth();
  const { allListings, userListings } = useLoaderData();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [searchListings, setSearchListings] = useState([]);

  const listingsToUse = isLoggedIn ? userListings : allListings;

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    const data = await getSearchList(searchTerm);
    setSearchListings(data);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = () => {
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSearchListings([]);
    setAvailableOnly(false);
    setCurrentPage(1);
  };

  function renderListings(listings) {
    if (!listingsToUse || listingsToUse.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center">
            No listings found.
          </td>
        </tr>
      );
    }

    const filteredListing = listings?.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesAvailability = !availableOnly || item.available;

      return matchesSearch && matchesAvailability;
    });

    const totalPages = Math.ceil(filteredListing?.length / ITEMS_PER_PAGE);

    const currentItems = filteredListing.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const handleBookmark = async (e, id, bookmark) => {
      e.preventDefault();
      try {
        if (bookmark) {
          await deleteFavorite(id);
        } else {
          const formData = { listing_id: id };
          await createFavorite(formData);
        }
        navigate(".", { replace: true });
      } catch (error) {
        console.error("Error updating bookmark:", error.message || error);
      }
    };

    return (
      <div className="sm:p-7">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-slate-600 focus:outline-none focus:border-primary"
        />

        <div className="flex items-center mb-4 space-x-4">
          <label className="text-gray-600 dark:text-white">
            Available Only:
          </label>
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={() => setAvailableOnly(!availableOnly)}
            className="border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleAvailabilityChange}
            className="px-4 py-2 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Apply
          </button>
        </div>

        <button
          onClick={handleResetFilters}
          className="px-4 py-2 mb-4 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Reset Filters
        </button>

        <div className="grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {searchListings && searchListings.length > 0 ? (
            searchListings?.map((list) => (
              <div
                className="relative w-full max-w-md mb-2 overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg sm:mb-12 dark:shadow-gray-400 dark:shadow-md dark:bg-gray-900 hover:scale-105"
                key={list.id}
              >
                <NavLink to={`/rentals/${list.id}`} state={{ list: list }}>
                  {list.imagelink && list.imagelink[0] ? (
                    <img
                      src={list.imagelink[0]}
                      alt={list.title}
                      className="object-cover w-full rounded-lg h-52"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full text-gray-500 bg-gray-200 rounded-lg dark:bg-slate-800 h-52">
                      No Image
                    </span>
                  )}
                </NavLink>
                <div className="p-4">
                  <h1 className="mb-2 text-2xl font-bold text-primary dark:text-secondary">
                    {list.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <CiLocationOn className="text-primary dark:text-secondary" />
                    <p className="dark:text-gray-400">{list.location}</p>
                  </div>
                  <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200 ">
                    $ {list.price}/month
                  </p>
                  <p className="mb-8 text-gray-600 dark:text-white">
                    {list.description}
                  </p>
                  <NavLink
                    to={`/rentals/${list.id}`}
                    state={{ list: list }}
                    className="p-2 mt-2 text-white rounded-md bg-primary"
                  >
                    View
                  </NavLink>
                  {isLoggedIn && (
                    <IoBookmarksSharp
                      onClick={(e) =>
                        handleBookmark(e, list.id, list.bookmarkStatus)
                      }
                      className={`absolute cursor-pointer mt-4 text-2xl bottom-3 right-6 ${
                        list.bookmarkStatus ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))
          ) : currentItems.length > 0 ? (
            currentItems?.map((list) => (
              <div
                className="relative w-full max-w-sm mb-2 overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg sm:mb-12 dark:shadow-gray-400 dark:shadow-md dark:bg-gray-900 hover:scale-105"
                key={list.id}
              >
                {console.log(list)}
                <NavLink to={`/rentals/${list.id}`} state={{ list: list }}>
                  {list.imagelink && list.imagelink[0] ? (
                    <img
                      src={list.imagelink[0]}
                      alt={list.title}
                      className="object-cover w-full rounded-lg h-52"
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full text-gray-500 bg-gray-200 rounded-lg dark:bg-slate-800 h-52">
                      No Image
                    </span>
                  )}
                </NavLink>
                <div className="p-4">
                  <h1 className="mb-2 text-2xl font-bold text-primary dark:text-secondary">
                    {list.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <CiLocationOn className="text-primary dark:text-secondary" />
                    <p className="dark:text-gray-400">{list.location}</p>
                  </div>
                  <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200 ">
                    $ {list.price}/month
                  </p>
                  <p className="mb-8 text-gray-600 dark:text-white">
                    {list.description}
                  </p>
                  <NavLink
                    to={`/rentals/${list.id}`}
                    state={{ list: list }}
                    className="p-2 text-white rounded-md bg-primary"
                  >
                    View
                  </NavLink>
                  {isLoggedIn && (
                    <IoBookmarksSharp
                      onClick={(e) =>
                        handleBookmark(e, list.id, list.bookmarkStatus)
                      }
                      className={`absolute cursor-pointer mt-4 text-2xl bottom-3 right-6 ${
                        list.bookmarkStatus ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-100">
              No results found.
            </p>
          )}
        </div>
        {currentItems.length > 0 ? (
          <div className="flex items-center justify-center w-full mt-8">
            <IoMdArrowDropleftCircle
              className={`text-3xl cursor-pointer ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "text-primary dark:text-secondary"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)]?.map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-md`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <IoMdArrowDroprightCircle
              className={`text-3xl cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "text-primary dark:text-secondary"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 max-sm:padding dark:bg-gray-900"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={listingsToUse}>
          {(data) => {
            if (data.error) {
              return (
                <p className="text-center text-red-500">
                  Error loading listings: {data.error.message}
                </p>
              );
            }
            return renderListings(data);
          }}
        </Await>
      </Suspense>
    </motion.div>
  );
}
