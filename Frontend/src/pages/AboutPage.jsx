import React from 'react';
import useLanguage from '../hooks/useLanguage';

function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl"> {/* Center content */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        {t('about.title')}
      </h1>

      {/* Mission Section */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
          {t('about.missionTitle')}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t('about.missionText')}
        </p>
      </section>

      {/* How It Works (Briefly) */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
          {t('about.howItWorksTitle')}
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t('about.howItWorksText')}
        </p>
      </section>

      {/* Optional: Add Team or Contact sections later */}
      {/* <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
          Our Team (Placeholder)
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Information about the team behind EasyRentX...
        </p>
      </section> */}

    </div>
  );
}

export default AboutPage;