import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../util/util';
import { getUserPaymentRecords } from '../components/api/api';
const UserPaymentRecords = () => {
  const [payments, setPayments] = useState([]);

useEffect(() => {
  async function fetchPayments() {
    const response = await getUserPaymentRecords();
    setPayments(response);
  }
  fetchPayments();
}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 padding dark:bg-gray-900 md:p-8"
    >
      <div className="mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-900 dark:text-white max-md:text-2xl">Payment Records</h1>
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Listing</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Amount</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Status</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Payment Method</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{payment.title}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{payment.amount}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{payment.status}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{payment.payment_method}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{formatDate(payment.paid_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UserPaymentRecords;
