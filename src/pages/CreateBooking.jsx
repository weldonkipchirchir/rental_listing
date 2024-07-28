/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function CreateBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { list } = location.state || {};

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    listing_id: list.id,
    check_in_date: "",
    check_out_date: "",
    total_amount: list.price,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const calculateTotalAmount = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const oneMonth = 1000 * 60 * 60 * 24 * 30.44; 

    const diffTime = endDate - startDate;
    let diffMonths = diffTime / oneMonth;

    if (diffMonths < 1) {
      diffMonths = 1;
    } else {
      diffMonths = Math.ceil(diffMonths); 
    }

    const pricePerMonth = parseFloat(list.price);
    return (pricePerMonth * diffMonths).toFixed(2);
  };

  const totalAmount = calculateTotalAmount(formData.check_in_date, formData.check_out_date);
  formData.total_amount= totalAmount;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (new Date(formData.check_out_date) <= new Date(formData.check_in_date)) {
      setError({ message: "Check-out date must be after check-in date." });
      return;
    }


    const formattedData = {
      ...formData,
      check_in_date: formatDateString(formData.check_in_date),
      check_out_date: formatDateString(formData.check_out_date),
    };

    try {
      navigate(`/payment/${list?.id}`, { state: { data: formattedData } });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="min-h-screen bg-gray-100 p-7 dark:bg-gray-900"
    >
      <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg dark:shadow-gray-400 dark:shadow-md dark:bg-gray-900">
        <NavLink
          to={`/rentals/${list.id}`}
          className="text-white block max-w-fit text-xl mb-5 sm:mb-10 bg-primary p-2 rounded-md"
        >
          Back
        </NavLink>
        <form onSubmit={handleBooking} className="mt-6 space-y-4">
          <input
            type="date"
            name="check_in_date"
            placeholder="Check-in Date"
            value={formData.check_in_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-slate-600 focus:outline-none focus:border-primary"
            required
          />
          <input
            type="date"
            name="check_out_date"
            placeholder="Check-out Date"
            value={formData.check_out_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-slate-600 focus:outline-none focus:border-primary"
            required
          />
          <input
            type="number"
            name="total_amount"
            placeholder="Total Amount"
            value={formData.total_amount}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:text-gray-100 dark:bg-slate-600 focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Book Now
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500">
            {error.message || "An error occurred while booking."}
          </p>
        )}
      </div>
    </motion.div>
  );
}
