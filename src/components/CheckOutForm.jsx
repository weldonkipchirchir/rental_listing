/* eslint-disable react/prop-types */
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { createBooking } from "./api/api";
import { useNavigate } from "react-router-dom";

export default function CheckOutForm({ data }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/completion`,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const bookingData = {
          ...data,
          paymentId: paymentIntent.id,
          status: paymentIntent.status,
          paymentMethod: paymentIntent.payment_method_types,
        };

        try {
          await createBooking(bookingData);
          setMessage("Payment successful and booking created!");
          navigate("/completion");
        } catch (bookingError) {
          setMessage("Payment was successful, but creating the booking failed.");
        }
      } else {
        setMessage("Payment not completed. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen flex justify-center dark:text-white bg-gray-100 dark:bg-gray-900 w-full"
    >
      <form
        id="payment-form"
        className="max-w-3xl mt-5 border h-[350px] bg-white dark:text-white border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" className="my-4 dark:text-white " />
        <button
          disabled={isProcessing || !stripe || !elements}
          id="submit"
          className="bg-primary text-white py-3 px-4 rounded-md font-semibold transition-all duration-200 ease-in-out hover:filter-contrast-115 active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span id="button-text">
            {isProcessing ? "Processing ..." : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <p id="payment-message" className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </motion.div>
  );
}
