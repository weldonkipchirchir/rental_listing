import { useState } from "react";
import { motion } from "framer-motion";
import { createListing } from "../../components/api/api";
import { useNavigate } from "react-router-dom";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
    available: true,
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setError(null);
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    setError(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    for (const key in formData) {
      if (formData[key] === "" && key !== "images") {
        setError(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        setIsProcessing(false);
        return;
      }
    }

    if (formData.images.length === 0) {
      setError("At least one image is required");
      setIsProcessing(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("available", formData.available.toString());
      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image);
      });
      const res = await createListing(formDataToSend);

      setStatus(res.message);
      setError(null);

      setTimeout(() => {
        setStatus(null);
        navigate("/dashboard");
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          images: null,
          available: true,
        });
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setStatus(null);
    }
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="mb-2 text-2xl font-bold text-center text-gray-900 sm:mb-6 dark:text-white">
            Create a New Listing
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter listing title"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter listing description"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter listing price"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter listing location"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="images"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Image
              </label>
              <input
                type="file"
                id="images"
                onChange={handleImageChange}
                multiple
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            >
              {isProcessing ? "Creating ..." : "  Create Listing"}
            </button>
          </form>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {status && (
            <p className="text-xl text-center text-green-600">{status}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CreateListingPage;
