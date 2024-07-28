import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStats } from '../../components/api/api';

const StatsPage = () => {
  const [stats, setStats] = useState([]);

useEffect(() => {
  async function fetchStats() {
    const response = await getStats();
    setStats(response);
  }
  fetchStats();
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
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-900 dark:text-white max-md:text-2xl">Listing Statistics</h1>
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Listing</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Total Views</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Total Bookings</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Average Rating</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 uppercase dark:text-gray-300">Total Income</th>
              </tr>
            </thead>
            <tbody>
              {stats?.map((stat) => (
                <tr key={stat.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{stat.title}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{stat.total_views}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{stat.total_bookings}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{stat.average_rating}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-300">{stat.income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsPage;
