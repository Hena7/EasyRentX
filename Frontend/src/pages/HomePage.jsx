import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For Call to Action button
import useLanguage from "../hooks/useLanguage";

import ItemCard from "../components/features/ItemCard";
import Testimonials from "../components/features/Testimonials";
import api from "../api/axios";

function HomePage() {
  const { t } = useLanguage();
  const [featuredItems,setFeaturedItems] = useState([]);

  // Define placeholder data for featured items
  useEffect( ()=>{
    const getData = async () => {
      const featuredItemss = await api.get('http://localhost:5000/api/items');
      setFeaturedItems(featuredItemss.data)
      console.log(featuredItemss)
    }

    getData()
  },[]);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-r from-blue-50 dark:from-gray-800 to-indigo-100 dark:to-gray-900 rounded-lg mb-12 shadow-sm">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {t("home.heroTitle")}
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t("home.heroSubtitle")}
        </p>
        {/* Optional Search Bar Placeholder */}
        <div className="mt-8 mb-10 max-w-xl mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t("home.searchPlaceholder")}
              className="w-full p-3 pr-16 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-inner"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-semibold transition duration-300">
              {t("home.searchButton")}
            </button>
          </div>
        </div>
        {/* Call to Action Button */}
        <Link
          to="/browse" // Link to the browse page
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 shadow hover:shadow-lg"
        >
          {t("nav.browse")} {/* Use translation for button text */}
        </Link>
      </section>

      {/* How It Works Section (Optional but good for landing pages) */}
      <section className="py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          {t("home.howItWorks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4 md:px-10">
          {/* Step 1 */}
          <div className="p-4">
            {/* You could add icons here later */}
            <div className="text-blue-600 dark:text-blue-400 mb-3 text-5xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.step1")}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("home.step1Desc")}
            </p>
          </div>
          {/* Step 2 */}
          <div className="p-4">
            <div className="text-blue-600 dark:text-blue-400 mb-3 text-5xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.step2")}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("home.step2Desc")}
            </p>
          </div>
          {/* Step 3 */}
          <div className="p-4">
            <div className="text-blue-600 dark:text-blue-400 mb-3 text-5xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.step3")}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("home.step3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {t("home.featuredItemsTitle")}
        </h2>
        {/* Remove the placeholder text div */}
        {/* <div className="text-center text-gray-500 dark:text-gray-400">...</div> */}

        {/* Add the grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems?.map((item) => (
            <ItemCard key={item.id} item={item} /> // Use the ItemCard component
          ))}
        </div>
        <Testimonials/>
      </section>
    </div>
  );
}

export default HomePage;
