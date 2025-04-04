import React from 'react';
import { Link } from 'react-router-dom'; // To link to the register page
import useLanguage from '../hooks/useLanguage';

function LoginPage() {
  const { t } = useLanguage();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission for now
    // TODO: Add actual login logic here (call backend API)
    console.log('Login form submitted (placeholder)');
     alert('Login form submitted (placeholder) - Check console for details');
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div>
           {/* Optional: Add an icon/logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/path/to/logo.svg" alt="EasyRentX" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('login.needAccount')}{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              {t('login.registerLink')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Address */}
            <div>
              <label htmlFor="email-address" className="sr-only">{t('login.email')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('login.email')}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">{t('login.password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password" // Correct for login
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('login.password')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Remember me checkbox - Optional */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me {/* Add translation if needed */}
              </label>
            </div>

             {/* Forgot password link - Optional */}
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Forgot your password? {/* Add translation if needed */}
              </a>
            </div>
          </div>

           {/* Add space for error messages later */}
          {/* <div className="h-4 text-sm text-red-600"></div> */}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
            >
               {/* Optional: Add a lock icon or spinner */}
              {t('login.button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;