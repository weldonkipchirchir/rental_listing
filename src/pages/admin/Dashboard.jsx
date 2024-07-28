import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { NavLink, useLoaderData } from "react-router-dom";
import { json } from "react-router-dom";
import { getAdminData } from "../../components/api/api";

export async function loader() {
  try {
    const data = await getAdminData();
    return json(data);
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}

const Dashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState(null);
  const listings = useLoaderData();

  useEffect(() => {
    if (listings.error) {
      setError(listings.error);
    } else {
      setRentals(listings);
    }
  }, [listings]);

  const totalRevenue = rentals
    .reduce((acc, rental) => acc + parseFloat(rental.revenue), 0)
    .toFixed(2);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-7 dark:bg-gray-900">
        <div className="mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 padding dark:bg-gray-900"
    >
      <div className="md:p-7 dark:bg-gray-900">
        <div className="mx-auto">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 max-md:text-2xl dark:text-white">
              Admin Dashboard
            </h1>
            <NavLink to="/create-listing">
              <button className="flex items-center px-2 py-2 font-semibold text-white rounded-lg shadow-md max-md:text-sm max-sm:text-xs max-sm:gap-1 md:px-4 bg-primary hover:bg-primary-dark">
                <AiOutlinePlus className="md:mr-2 " /> Add Rental
              </button>
            </NavLink>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-3 mb-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 max-md:text-lg dark:text-gray-200">
                Total Rentals
              </h2>
              <p className="mt-2 text-3xl font-bold max-md:text-lg text-primary dark:text-secondary">
                {rentals.length}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 max-md:text-lg dark:text-gray-200">
                Active Rentals
              </h2>
              <p className="mt-2 text-3xl font-bold max-md:text-lg text-primary dark:text-secondary">
                {rentals?.filter((rental) => rental.available).length}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 max-md:text-lg dark:text-gray-200">
                Booked Rentals
              </h2>
              <p className="mt-2 text-3xl font-bold max-md:text-lg text-primary dark:text-secondary">
                {rentals?.filter((rental) => !rental.available).length}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-800 max-md:text-lg dark:text-gray-200">
                Revenue
              </h2>
              <p className="mt-2 text-3xl font-bold max-md:text-lg text-primary dark:text-secondary">
                ${totalRevenue}
              </p>
            </div>
          </div>

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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {rentals?.map((rental) => (
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
                        <CiLocationOn className="w-5 h-5 mr-1 text-primary dark:text-secondary" />
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
