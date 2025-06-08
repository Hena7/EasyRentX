import React from 'react';

const DashboardLayout = ({ title, children }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for a sidebar if needed later */}
        {/* <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">Sidebar Content</div> */}

        {/* Main content area */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// A generic Card component for dashboard widgets
export const DashboardCard = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h2>}
      {children}
    </div>
  );
};

export default DashboardLayout;