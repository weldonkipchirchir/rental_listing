import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  NavLink,
  defer,
  Await,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Suspense } from "react";
import { adminListings, deleteAdminListing } from "../../components/api/api";

export function loader() {
  return defer({ listings: adminListings().catch((error) => ({ error })) });
}

const AdminRentalListing = () => {
  const listingPromise = useLoaderData();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const res = await deleteAdminListing(id);
      setStatus(res.message);
      navigate(".", { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  function renderListings(listings) {
    if (!listings || listings.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="px-6 py-4 text-center">
            No listings found.
          </td>
        </tr>
      );
    }

    return (
      <div className="overflow-hidden overflow-x-auto rounded-lg shadow-md dark:bg-gray-800">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Image
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Location
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {listings?.map((rental) => (
              <tr key={rental.id} className="bg-white dark:bg-gray-900">
                <td className="px-6 py-4 whitespace-nowrap">
                  {rental.imagelink && rental.imagelink[0] ? (
                    <img
                      src={rental.imagelink[0]}
                      alt={rental.title}
                      className="object-cover w-16 h-16 rounded-lg"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {rental.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                  <div className="flex items-center">
                    <CiLocationOn className="w-5 h-5 mr-1 dark:text-secondary text-primary" />
                    <span>{rental.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${rental.price}/month
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rental.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {rental.available ? "Available" : "Booked"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <NavLink to="/edit-listing" state={{ list: rental }}>
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit Listing"
                      className="mr-2 text-indigo-600 hover:text-indigo-900"
                    >
                      <AiOutlineEdit className="w-5 h-5" />
                    </button>
                  </NavLink>
                  <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Delete Listing"
                    onClick={() => handleDelete(rental.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <AiOutlineDelete className="w-5 h-5" />
                  </button>
                  <ReactTooltip id="my-tooltip" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && (
          <div className="w-full mt-4 text-center text-red-500">{error}</div>
        )}
        {status && (
          <p className="text-xl text-center text-green-600">{status}</p>
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
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="md:p-8">
        <div className="mx-auto padding">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:mb-6 max-md:text-2xl dark:text-white">
            Manage Rental Listings
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={listingPromise.listings}>
              {(listings) => {
                if (listings.error) {
                  return (
                    <p className="text-center text-red-500">
                      Error loading listings: {listings.error.message}
                    </p>
                  );
                }
                return renderListings(listings);
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRentalListing;
