// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import HomePage from './pages/HomePage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import RegisterPage from './pages/RegisterPage'; // <-- Import RegisterPage
import LoginPage from './pages/LoginPage';     // <-- Import LoginPage
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import Authorized from './contexts/Authorized';

function App() {
  console.log("App component rendering with Layout");

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseItemsPage />} />
          <Route path="/about" element={<AboutPage />} /> {/* <-- Add About Route */}
          <Route path="/item/:itemId" element={<ItemDetailPage />} />
          <Route path="/login" element={<Authorized><LoginPage /></Authorized>} />       {/* <-- Add Login Route */}
          <Route path="/register" element={<Authorized><RegisterPage /></Authorized>} /> {/* <-- Add Register Route */}

          {/* Protected Routes would go here later */}
          {/* e.g., <Route path="/list-item" element={<ProtectedRoute><ListItemPage /></ProtectedRoute>} /> */}

          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;