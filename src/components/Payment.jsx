import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import { motion } from "framer-motion";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    const fetchPublishableKey = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/config", {
          method: "GET",
          credentials: "include",
        });
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error("Error fetching publishable key:", error);
      }
    };

    fetchPublishableKey();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/payment", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total_amount: data.total_amount,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await response.json();
        if (!clientSecret) {
          throw new Error("Invalid client secret returned");
        }

        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (data) {
      createPaymentIntent();
    }
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 p-4 dark:bg-gray-900"
    >
      <div>
        <h1 className="text-3xl text-center dark:text-white">Payment</h1>
        {clientSecret && stripePromise ? (
          <Elements stripe={stripePromise} options={{ clientSecret, locale: "en" }}>
            <CheckOutForm  data={data} />
          </Elements>
        ) : (
          <p className="text-xl dark:text-white text-center">Loading...</p>
        )}
      </div>
    </motion.div>
  );
}

export default Payment;
