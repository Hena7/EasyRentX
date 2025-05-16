import React from 'react';
import DashboardLayout, { DashboardCard } from '../components/layout/DashboardLayout';
import useLanguage from '../hooks/useLanguage';
import useAuth from '../hooks/useAuth'; // Using mock auth for now

function OwnerDashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const dashboardTranslations = {
    title: t('dashboard.owner.title') || "Owner Dashboard",
    welcome: t('dashboard.welcome', { name: user?.name || "User" }) || `Welcome, ${user?.name || "User"}!`,
    myListingsTitle: t('dashboard.owner.myListingsTitle') || "My Listings",
    bookingRequestsTitle: t('dashboard.owner.bookingRequestsTitle') || "Booking Requests",
    earningsTitle: t('dashboard.owner.earningsTitle') || "Earnings",
    profileSettingsTitle: t('dashboard.profileSettingsTitle') || "Profile Settings",
    noListings: t('dashboard.owner.noListings') || "You haven't listed any items yet.",
    addNewListing: t('dashboard.owner.addNewListing') || "Add New Listing",
    pendingRequests: t('dashboard.owner.pendingRequests', { count: 2 }) || "You have 2 pending booking requests.",
    currentBalance: t('dashboard.owner.currentBalance', { amount: '$150.00' }) || "Current Balance: $150.00",
    editProfile: t('dashboard.editProfile') || "Edit Profile",
  };

  return (
    <DashboardLayout title={dashboardTranslations.title}>
      <DashboardCard title={dashboardTranslations.welcome} className="md:col-span-2 lg:col-span-3">
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.owner.intro') || "Manage your listed items, bookings, and earnings."}</p>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.myListingsTitle}>
        <p className="text-gray-600 dark:text-gray-400">{dashboardTranslations.noListings}</p>
        {/* Example listing: */}
        {/* <div className="mt-2 p-3 border dark:border-gray-700 rounded-md">
          <h3 className="font-semibold">Modern Sedan Car</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Status: Active</p>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1">Edit Listing</button>
        </div> */}
        <button className="mt-4 text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded">
          {dashboardTranslations.addNewListing}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.bookingRequestsTitle}>
        <p className="text-gray-600 dark:text-gray-400">{dashboardTranslations.pendingRequests}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.owner.viewRequests') || "View Requests"}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.earningsTitle}>
        <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{dashboardTranslations.currentBalance}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.owner.viewPayouts') || "View Payout History"}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.profileSettingsTitle}>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.manageAccount') || "Update your personal information and bank details."}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {dashboardTranslations.editProfile}
        </button>
      </DashboardCard>
    </DashboardLayout>
  );
}

export default OwnerDashboardPage;