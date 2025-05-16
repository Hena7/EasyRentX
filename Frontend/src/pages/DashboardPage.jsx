import React from 'react';
import useAuth from '../hooks/useAuth'; // Using MOCK hook
import useLanguage from '../hooks/useLanguage';

// Import the specific dashboard components
import AdminDashboardPage from './AdminDashboardPage';
import OwnerDashboardPage from './OwnerDashboardPage';
import RenterDashboardPage from './RenterDashboardPage';
import { Navigate } from 'react-router-dom'; // For redirecting if not logged in

function DashboardPage() {
  const { user, isLoggedIn, isLoading } = useAuth(); // Use mock hook
  const { t } = useLanguage();

  if (isLoading) {
    return <div className="p-10 text-center">{t('Loading user data...')}</div>; // Add translation
  }

  if (!isLoggedIn) {
    // In a real app, you might want to redirect to login with a message
    // For now, just show a message or redirect.
    // Using Navigate component for redirection:
    return <Navigate to="/login" state={{ message: t('Please login to view your dashboard.') }} replace />;
  }

  switch (user?.role) {
    case 'admin':
      return <AdminDashboardPage />;
    case 'owner':
      return <OwnerDashboardPage />;
    case 'renter':
      return <RenterDashboardPage />;
    default:
      // Fallback if role is unknown or user is somehow logged in without a role
      return (
        <div className="p-10 text-center">
          <h2 className="text-xl font-semibold">{t('dashboard.unknownRoleTitle') || "Dashboard Unavailable"}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('dashboard.unknownRoleMessage') || "Your user role is not recognized or you don't have access to a dashboard."}</p>
        </div>
      );
  }
}

export default DashboardPage;