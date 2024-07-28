import teamPhoto from '../assets/h2.jpeg';
import { FaAward, FaRegHandshake, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="relative min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="p-8 bg-gray-100 md:p-16 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h1 className="mb-4 text-4xl max-md:text-2xl font-bold text-center text-gray-900 dark:text-white">
              About Us
            </h1>
            <p className="mb-8 text-lg text-center text-gray-800 dark:text-gray-300">
              We are a passionate team dedicated to providing exceptional rental experiences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-center max-md:text-2xl text-3xl font-bold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <img
                  src={teamPhoto}
                  alt="Team Member 1"
                  className="mx-auto mb-4 rounded-full"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h3 className="mb-2 text-xl font-semibold dark:text-white">John Doe</h3>
                <p className="text-gray-600 dark:text-gray-300">Co-founder & CEO</p>
              </div>
              <div className="text-center">
                <img
                  src={teamPhoto}
                  alt="Team Member 2"
                  className="mx-auto mb-4 rounded-full"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h3 className="mb-2 text-xl font-semibold dark:text-white">Jane Smith</h3>
                <p className="text-gray-600 dark:text-gray-300">Co-founder & CTO</p>
              </div>
              <div className="text-center">
                <img
                  src={teamPhoto}
                  alt="Team Member 3"
                  className="mx-auto mb-4 rounded-full"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h3 className="mb-2 text-xl font-semibold dark:text-white">Emily Brown</h3>
                <p className="text-gray-600 dark:text-gray-300">Head of Marketing</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 max-md:text-2xl text-3xl font-bold text-gray-900 dark:text-white">
              Our History
            </h2>
            <div className="flex items-center mb-4">
              <FaHistory className="mr-4 text-3xl text-primary dark:text-secondary" />
              <p className="text-lg text-gray-800 dark:text-gray-300">
                Established in 2020, we began with a vision to redefine rental experiences.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 max-md:text-2xl text-3xl font-bold text-gray-900 dark:text-white">
              Our Achievements
            </h2>
            <div className="flex items-center mb-4">
              <FaAward className="mr-4 text-3xl text-primary dark:text-secondary" />
              <p className="text-lg text-gray-800 dark:text-gray-300">
                Recognized for innovation and customer satisfaction in the rental industry.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-3xl max-md:text-2xl font-bold text-gray-900 dark:text-white">
              Community Involvement
            </h2>
            <div className="flex items-center mb-4">
              <FaRegHandshake className="mr-4 text-3xl text-primary dark:text-secondary" />
              <p className="text-lg text-gray-800 dark:text-gray-300">
                Actively contributing to local communities through partnerships and initiatives.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 max-md:text-2xl text-3xl font-bold text-gray-900 dark:text-white">
              Contact Us
            </h2>
            <div className="flex items-center mb-4">
              <p className="text-lg text-gray-800 dark:text-gray-300">
                Have questions or feedback? Reach out to us at contact@yourcompany.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;
