import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { NavLink, useLoaderData, json } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  adminBookings,
  updateBookingStatus,
  updateListingStatus,
} from "../../components/api/api";

export async function loader() {
  try{
    const data= await adminBookings();
    return json(data);
  }catch(error){
    return json({ error: error.message }, { status: 500 });
  }
}

const AdminBookings = () => {
  const bookings = useLoaderData();
  const [bookingData, setBookingData] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const bookings = await adminBookings();
      setBookingData(bookings);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id) => {
    setBookingData(bookingData.filter((booking) => booking.id !== id));
  };

  const handleEdit = (id, updatedBooking) => {
    setBookingData(
      bookingData.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
  };

  const handleStatusChange = async (id, newStatus, listing_id) => {
    try {
      let formData = { status: newStatus };
      const res = await updateBookingStatus(id, formData);
      if (newStatus === "confirmed") {
        await updateListingStatus(listing_id, { available: false });
      } else {
        await updateListingStatus(listing_id, { available: true });
      }
      setStatus(res.message);
      setError(null);
      fetchBookings();
      setBookingData(
        bookingData.map((booking) =>
          booking.id === id ? { ...booking, status: res.status } : booking
        )
      );
    } catch (error) {
      setError(error.message);
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
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 md:mb-6 max-md:text-2xl dark:text-white">
            Manage Bookings
          </h1>

          <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-lg dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                      Rental Title
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings && bookings.length > 0 ? bookings?.map((booking) => (
                    <tr key={booking.id} className="bg-white dark:bg-gray-900">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {booking.user_username}
                      </td>
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
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.id,
                              e.target.value,
                              booking.listing_id
                            )
                          }
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          } dark:bg-gray-700 dark:text-white`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="flex gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <NavLink
                          to="/notification"
                          state={{ booking: booking }}
                        >
                          <button
                             data-tooltip-id="my-tooltip"
                      data-tooltip-content="Send Message"
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleEdit(booking.id)}
                          >
                            <IoIosSend className="inline-block" />
                          </button>
                        </NavLink>
                        <button
                           data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete booking"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <AiOutlineDelete className="inline-block" />
                        </button>
                        <ReactTooltip id="my-tooltip" />
                      </td>
                    </tr>
                  ))
                : (
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300" colSpan="6">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {status && (
              <p className="text-xl text-center text-green-600">{status}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminBookings;
