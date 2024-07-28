import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { uppdateAdminListing } from "../../components/api/api";

const EditListingPage = () => {
  const locationUse = useLocation();
  const listingData = locationUse.state?.list;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
    available: false,
  });
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (listingData) {
      setFormData({
        title: listingData.title,
        description: listingData.description,
        price: listingData.price,
        location: listingData.location,
        available: listingData.available,
      });
    }
  }, [listingData]);

  const handleChange = (e) => {
    setError(null);
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
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
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("available", formData.available.toString());
      
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formDataToSend.append(`images`, image);
        });
      }

      console.log(formDataToSend)
  
      await uppdateAdminListing(listingData.id, formDataToSend);
      navigate("/listing");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!listingData) {
    return <p>Loading...</p>;
  }

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
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
            Edit Listing
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
                name="title"
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
                name="description"
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
                name="price"
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
                name="location"
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
            <div className="mb-6">
              <label
                htmlFor="available"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Available
              </label>
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded text-primary dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
            >
              {isProcessing ? "Updating ..." : "  Update Listing"}
            </button>
          </form>
          {error && <p className="text-xl text-center text-red-600">{error}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default EditListingPage;
