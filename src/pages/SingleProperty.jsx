import { motion } from "framer-motion";
import { Link, NavLink, useParams,  } from "react-router-dom";
import { getListingById, views } from "../components/api/api";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SingleProperty() {
  const [listData, setListData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async function addViews() {
      await views(id);
    })();
    async function getListing() {
      const res = await getListingById(id);
      setListData(res);
    }
    getListing();
  }, [id]);

  console.log(listData);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: false,
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="relative max-w-3xl px-4 pt-5 pb-5 mx-auto sm:pt-16 sm:pb-5 sm:px-6 lg:px-8 lg:pt-4 lg:pb-4">
        <NavLink
          to="/rentals"
          className="block p-2 mb-3 text-xl text-white rounded-md max-w-fit sm:mb-10 bg-primary"
        >
          Back
        </NavLink>
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
            <Slider {...sliderSettings}>
              {listData?.imagelink?.map((image, index) => (
                <div key={index} className="focus:outline-none">
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className="object-cover w-full h-64 sm:h-96"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {listData.available ? "Available" : "Not Available"}
            </h2>
            <div className="flex justify-between mt-4 max-sm:flex-col">
              <div>
                <h1 className="text-xl font-semibold text-secondary dark:text-gray-100">
                  {listData.title}
                </h1>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {listData.location}
                </p>
              </div>
              <p className="text-2xl font-bold dark:text-white">
                ${listData.price}/mo
              </p>
            </div>
            <p className="my-4 text-gray-600 dark:text-gray-400">
              {listData.description}
            </p>
            <Link to="/create-booking" state={{ list: listData }}>
              <button className="px-4 py-2 my-4 font-bold text-white rounded bg-primary hover:bg-green-600 dark:bg-primary dark:hover:bg-green-600">
                Book
              </button>
            </Link>
          </div>
        </div>
        {/* reviews section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Reviews
          </h2>
          <div className="grid grid-cols-1 gap-4 mx-auto my-4 md:grid-cols-2 lg:grid-cols-2">
            {listData?.reviews && listData.reviews?.length > 0 ? (
              listData.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start max-w-lg p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                  <Avatar
                    name={review?.username || "User"}
                    size="40"
                    round={true}
                  />
                  <div className="w-full ml-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {review.username || "Anonymous"}
                      </h3>
                      <div className="flex items-center">
                        <span className="flex mr-1 text-yellow-500">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049.924a1 1 0 011.902 0l1.717 5.29a1 1 0 00.95.676h5.401a1 1 0 01.587 1.81l-4.276 3.114a1 1 0 00-.364 1.118l1.717 5.29a1 1 0 01-1.54 1.118l-4.276-3.114a1 1 0 00-1.175 0l-4.276 3.114a1 1 0 01-1.54-1.118l1.717-5.29a1 1 0 00-.364-1.118L.294 8.7a1 1 0 01.587-1.81h5.401a1 1 0 00.95-.676l1.717-5.29z" />
                            </svg>
                          ))}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {review.comment ? review.comment : "No comment provided"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleProperty;
