import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import useTheme from '../../hooks/useTheme'; // To use theme context
import useLanguage from '../../hooks/useLanguage'; // To use language context

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();

   return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Logo/Name */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          {t('appName')}
        </Link>

        {/* Right Side: Navigation Links, Auth Links & Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Basic Nav Links */}
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base">
            {t('nav.home')}
          </Link>
          <Link to="/browse" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base">
            {t('nav.browse')}
          </Link>

           {/* Separator */}
           <div className="hidden sm:block border-l border-gray-300 dark:border-gray-600 h-6"></div>

           {/* Auth Links (Login/Register) - Will be conditional later */}
           {/* TODO: Replace these with conditional rendering based on auth status */}
           <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base">
              {t('nav.login')}
           </Link>
           <Link to="/register" className="px-3 py-1.5 text-sm sm:text-base bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 whitespace-nowrap">
              {t('nav.register')}
           </Link>
           {/* --- End of Auth Links Placeholder --- */}


          {/* Language Switcher */}
           <div className="flex border-l border-gray-300 dark:border-gray-600 pl-3 sm:pl-4">
             {/* ... language buttons ... */}
              <button
                   onClick={() => changeLanguage('en')}
                   title={t('language.switchToEnglish')} // Tooltip
                   className={`p-1 rounded text-xs sm:text-sm ${language === 'en' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
                   disabled={language === 'en'}
                 >
                   EN
                 </button>
                 <span className="text-gray-300 dark:text-gray-600 mx-1">|</span>
                 <button
                   onClick={() => changeLanguage('am')}
                    title={t('language.switchToAmharic')} // Tooltip
                   className={`p-1 rounded text-xs sm:text-sm ${language === 'am' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
                    disabled={language === 'am'}
                 >
                   አማ
                 </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'light' ? t('theme.toggleDark') : t('theme.toggleLight')}
            title={theme === 'light' ? t('theme.toggleDark') : t('theme.toggleLight')} // Tooltip
          >
             {/* ... theme icon svg ... */}
              {theme === 'light' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                   </svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" />
                   </svg>
                )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;