import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import { authService } from '../services/api';
import { toast } from 'react-toastify';

function RegisterPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('register.passwordMismatch'));
      return;
    }

    try {
      setLoading(true);
     const result =  await authService.register({
        username: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        toast.success(t('register.success'));
        navigate('/login');
      }
      
      
    } catch (error) {
      toast.error(error.message || t('register.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div>
          {/* Optional: Add an icon/logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/path/to/logo.svg" alt="EasyRentX" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('register.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              {t('register.loginLink')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Hidden input for CSRF or honeypot later if needed */}
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="sr-only">{t('register.name')}</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('register.name')}
              />
            </div>
            {/* Email Address */}
            <div>
              <label htmlFor="email-address" className="sr-only">{t('register.email')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('register.email')}
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">{t('register.password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('register.password')}
              />
            </div>
            {/* Confirm Password */}
             <div>
              <label htmlFor="confirm-password" className="sr-only">{t('register.confirmPassword')}</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={t('register.confirmPassword')}
              />
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
              {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                 <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" ... />
              </span> */}
              {loading ? t('register.loading') : t('register.button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;