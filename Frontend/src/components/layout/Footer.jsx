import React from 'react';
import useLanguage from '../../hooks/useLanguage'; // Need 't' for translation

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  // We need to manually replace {{year}} for now
  const footerText = t('footer.copy').replace('{{year}}', currentYear);

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mt-auto"> {/* mt-auto pushes footer down */}
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>
            {footerText}
        </p>
        {/* Add other footer links like About Us, Contact later if needed */}
      </div>
    </footer>
  );
};

export default Footer;