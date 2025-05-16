import React from 'react';
import DashboardLayout, { DashboardCard } from '../components/layout/DashboardLayout';
import useLanguage from '../hooks/useLanguage';
import useAuth from '../hooks/useAuth'; // Using mock auth for now

function AdminDashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const dashboardTranslations = {
    title: t('dashboard.admin.title') || "Admin Dashboard",
    welcome: t('dashboard.welcome', { name: user?.name || "Admin" }) || `Welcome, ${user?.name || "Admin"}!`,
    overviewTitle: t('dashboard.admin.overviewTitle') || "Platform Overview",
    userManagementTitle: t('dashboard.admin.userManagementTitle') || "User Management",
    itemManagementTitle: t('dashboard.admin.itemManagementTitle') || "Item Management",
    transactionManagementTitle: t('dashboard.admin.transactionManagementTitle') || "Transaction Management",
    totalUsers: t('dashboard.admin.totalUsers', { count: 1250 }) || "Total Users: 1,250",
    activeListings: t('dashboard.admin.activeListings', { count: 350 }) || "Active Listings: 350",
    pendingApprovals: t('dashboard.admin.pendingApprovals', { count: 15 }) || "Pending Item Approvals: 15",
  };

  return (
    <DashboardLayout title={dashboardTranslations.title}>
      <DashboardCard title={dashboardTranslations.welcome} className="md:col-span-2 lg:col-span-3">
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.admin.intro') || "Oversee platform activity and manage users, items, and transactions."}</p>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.overviewTitle}>
        <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">{dashboardTranslations.totalUsers}</p>
            <p className="text-gray-700 dark:text-gray-300">{dashboardTranslations.activeListings}</p>
            <p className="text-gray-700 dark:text-gray-300">{t('dashboard.admin.completedTransactions', {count: 500}) || "Completed Transactions: 500"}</p>
        </div>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.userManagementTitle}>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.admin.manageUserAccounts') || "View, verify, or suspend user accounts."}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.admin.viewUsers') || "View All Users"}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.itemManagementTitle}>
        <p className="text-gray-600 dark:text-gray-400">{dashboardTranslations.pendingApprovals}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.admin.viewItems') || "Manage Listings"}
        </button>
      </DashboardCard>

      <DashboardCard title={dashboardTranslations.transactionManagementTitle}>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.admin.overseeTransactions') || "Monitor ongoing rentals and facilitate payouts."}</p>
        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline">
          {t('dashboard.admin.viewTransactions') || "View All Transactions"}
        </button>
      </DashboardCard>
    </DashboardLayout>
  );
}

export default AdminDashboardPage;