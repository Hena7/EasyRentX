import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Optional: Add a relevant graphic/icon later */}
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-yellow-500 dark:text-yellow-400 mb-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
       </svg>

      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {t('notFound.title')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {t('notFound.message')}
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 shadow hover:shadow-lg"
      >
        {t('notFound.goHome')}
      </Link>
    </div>
  );
}

export default NotFoundPage;