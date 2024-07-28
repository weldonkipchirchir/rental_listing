// ReviewForm.js
import { useState } from "react";
import { postReview } from "../components/api/api";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
const ReviewPage = () => {
    const location = useLocation();
    const {id} = location.state;
    const navigate = useNavigate();

  const [review, setReview] = useState({ rating: "", comment: "", listingId: id });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleRatingChange = (e) => {
      setError(null);
    setReview({ ...review, rating: e.target.value });
  };

  const handleCommentChange = (e) => {
      setError(null);
    setReview({ ...review, comment: e.target.value });
  };

  const handleSubmit = async (e) => {
    const data = {
        rating: parseFloat(review.rating),
        comment: review.comment,
        listingId: review.listingId,
    }
    e.preventDefault();
    try {
     const res = await postReview(data);   
      setStatus(res.message);
      setError(null);
      setTimeout(() => {
        setStatus(null);
        setReview({ rating: "", comment: "" });
        navigate("/bookings");
      }, 3000);
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
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-900">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleRatingChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</label>
        <textarea
          value={review.comment}
          onChange={handleCommentChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
        <button
          type="submit"
          className="block w-full px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
        >
          Submit Review
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
          {status && (
            <p className="mt-2 text-lg text-center text-green-600">{status}</p>
          )}
    </div>
    </motion.div>
  );
};

export default ReviewPage;
