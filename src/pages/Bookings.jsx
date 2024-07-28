import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  deleteBooking,
  getBookings,
  updateUserBooking,
} from "../components/api/api";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";

const RentalBooks = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(null);

  async function fetchBookings() {
    const res = await getBookings();
    setBookings(res);
  }
  useEffect(() => {
    fetchBookings();
  }, [bookings]);

  const handleDelete = async (id, status) => {
    try {
      if (status === "pending") {
        await updateUserBooking(id);
      }
      await updateUserBooking(id);
      await deleteBooking(id);
      fetchBookings();
    } catch {
      setStatus("There was an error deleting the booking.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 padding dark:bg-gray-900"
    >
      <div className="md:p-8 dark:bg-gray-900">
        <div className="mx-auto ">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 max-md:text-2xl dark:text-white">
            Your Bookings
          </h1>

          <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Check-In Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Check-Out Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Review
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings?.map((booking) => (
                    <tr key={booking.id} className="bg-white dark:bg-gray-900">
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                        {booking.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                        {booking.check_in_date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                        {booking.check_out_date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${booking.total_amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          } dark:bg-gray-700 dark:text-white`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link
                          className="p-2 text-white rounded-md bg-primary"
                          to="/review"
                          state={{ id: booking.listing_id }}
                        >
                          Add Review
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <NavLink
                          to="/create-notification"
                          state={{ booking: booking }}
                          className='text-xl'
                        >
                          <button
                            data-tooltip-id="my-tooltip"
                      data-tooltip-content="Send message"
                            className="text-green-600 hover:text-green-900"
                          >
                            <IoIosSend className="w-5 h-5" />
                          </button>
                        </NavLink>
                        <button
                          data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete booking"
                          onClick={() =>
                            handleDelete(booking.id, booking.status)
                          }
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
              {status && <p className="mt-4 text-red-500">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RentalBooks;
