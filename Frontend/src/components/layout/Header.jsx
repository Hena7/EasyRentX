import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import useTheme from "../../hooks/useTheme";
import useLanguage from "../../hooks/useLanguage";

// Hamburger Icon SVG
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// Close Icon SVG
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

// Moon Icon SVG (from your original code)
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

// Sun Icon SVG (from your original code)
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z"
    />
  </svg>
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const location = useLocation(); // Hook to get current location

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]); // Dependency on location object

  // Helper function to close menu, used by links
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      {" "}
      {/* Increased z-index */}
      <nav className="container w-full max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center relative">
        {" "}
        {/* Added relative positioning */}
        {/* App Logo/Name */}
        <Link
          to="/"
          onClick={closeMobileMenu} // Close menu if logo is clicked
          className="text-xl font-bold text-blue-600 hover:scale-110 dark:text-blue-400 transition-transform duration-200"
        >
          {t("appName")}
        </Link>
        {/* Mobile Menu Button (Visible below md breakpoint) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
        {/* Navigation Links & Controls Container */}
        {/* Hidden below md, Flex row on md and up */}
        {/* Absolute positioned dropdown on mobile when open */}
        <div
          className={`
             ${
               isMobileMenuOpen ? "flex" : "hidden"
             } md:flex flex-col md:flex-row md:items-center md:space-x-4
             absolute md:relative top-full left-0 w-full md:w-auto
             bg-white dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent
             shadow-lg md:shadow-none rounded-b-lg md:rounded-none
             p-4 md:p-0 mt-1 md:mt-0 space-y-3 md:space-y-0
             items-stretch md:items-center z-10 md:z-auto
           `}
        >
          <Link
            to="/"
            onClick={closeMobileMenu} // Close menu on click
            className="block md:inline-block px-3 py-2 rounded-md text-gray-700 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base text-center md:text-left"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/browse"
            onClick={closeMobileMenu}
            className="block md:inline-block px-3 py-2 rounded-md text-gray-700 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base text-center md:text-left"
          >
            {t("nav.browse")}
          </Link>
          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="block md:inline-block px-3 py-2 rounded-md text-gray-700 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base text-center md:text-left"
          >
            {t("about.title")}
          </Link>

          <Link to="/register">
            <img
              src="/login.png"
              className="max-w-8 p-1.5 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={t("login.demo")}
              alt="Login"
            />
          </Link>

          {/* Separator (only needed in mobile dropdown for visual clarity) */}
          <hr className="border-gray-200 dark:border-gray-700 md:hidden my-2" />

          {/* Language & Theme Toggles (Group them for mobile) */}
          <div className="flex items-center justify-center md:justify-start space-x-4 pt-2 md:pt-0 md:border-l md:border-gray-300 md:dark:border-gray-600 md:pl-4">
            {/* Language Switcher (Simpler version) */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => changeLanguage("en")}
                title={t("language.switchToEnglish")}
                className={`px-2 py-1 rounded text-xs sm:text-sm ${
                  language === "en"
                    ? "font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-700"
                    : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
                disabled={language === "en"}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("am")}
                title={t("language.switchToAmharic")}
                className={`px-2 py-1 rounded text-xs sm:text-sm ${
                  language === "am"
                    ? "font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-700"
                    : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                }`}
                disabled={language === "am"}
              >
                አማ
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                theme === "light"
                  ? t("theme.toggleDark")
                  : t("theme.toggleLight")
              }
              title={
                theme === "light"
                  ? t("theme.toggleDark")
                  : t("theme.toggleLight")
              }
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>

          {/* --- Menu Items End --- */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
