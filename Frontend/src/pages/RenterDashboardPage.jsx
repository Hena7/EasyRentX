import React from 'react';
import DashboardLayout, { DashboardCard } from '../components/layout/DashboardLayout';
import useLanguage from '../hooks/useLanguage';
import useAuth from '../hooks/useAuth'; // Using mock auth for now

function RenterDashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth(); // Get user info (mocked)

  // Add 'dashboard' keys to translations.js
  const dashboardTranslations = {
    title: t('dashboard.renter.title') || "Renter Dashboard",
    welcome: t('dashboard.welcome', { name: user?.name || "User" }) || `Welcome, ${user?.name || "User"}!`,
    myRentalsTitle: t('dashboard.renter.myRentalsTitle') || "My Active Rentals",
    rentalHistoryTitle: t('dashboard.renter.rentalHistoryTitle') || "Rental History",
    messagesTitle: t('dashboard.renter.messagesTitle') || "Messages",
    profileSettingsTitle: t('dashboard.profileSettingsTitle') || "Profile Settings",
    noActiveRentals: t('dashboard.renter.noActiveRentals') || "You have no active rentals.",
    viewRentalHistory: t('dashboard.renter.viewRentalHistory') || "View all rental history",
    unreadMessages: t('dashboard.renter.unreadMessages', { count: 3 }) || "You have 3 unread messages.",
    editProfile: t('dashboard.editProfile') || "Edit Profile",
  };

  return (
    <DashboardLayout title={dashboardTranslations.title}>
      <DashboardCard title={dashboardTranslations.welcome} className="md:col-span-2 lg:col-span-3">
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.renter.intro') || "Manage your rentals and account details here."}</p>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.myRentalsTitle}>
        {/* Placeholder content for active rentals */}
        <p className="text-gray-600 dark:text-gray-400">{dashboardTranslations.noActiveRentals}</p>
        {/* Example item: */}
        {/* <div className="mt-2 p-3 border dark:border-gray-700 rounded-md">
          <h3 className="font-semibold">Mountain Bike</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rented until: 2024-12-31</p>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1">View Details</button>
        </div> */}
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.rentalHistoryTitle}>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.renter.noHistory') || "No past rentals yet."}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {dashboardTranslations.viewRentalHistory}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.messagesTitle}>
        <p className="text-gray-600 dark:text-gray-400">{dashboardTranslations.unreadMessages}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.viewMessages') || "View Messages"}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.profileSettingsTitle}>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.manageAccount') || "Update your personal information and preferences."}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {dashboardTranslations.editProfile}
        </button>
      </DashboardCard>
    </DashboardLayout>
  );
}

export default RenterDashboardPage;