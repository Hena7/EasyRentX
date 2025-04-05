// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import useLanguage from '../../hooks/useLanguage';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerText = t('footer.copy').replace('{{year}}', currentYear);

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>
            {footerText}
        </p>
        {/* Add other footer links here */}
        <div className="flex justify-center space-x-4 mt-2">
            <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                {t('footer.about')} {/* Add 'footer.about' key to translations */}
            </Link>
            {/* Example for other links */}
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                {t('footer.contact')}
            </Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                {t('footer.terms')}
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;