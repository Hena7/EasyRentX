import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import Hooks (needed for pages, but not directly in App anymore)
// import useTheme from './hooks/useTheme';
// import useLanguage from './hooks/useLanguage';

// We'll create separate page components soon
// For now, let's reuse the simple HomePageContent for the '/' route
import HomePageContent from './pages/HomePage'; // Assuming we move the test content here
import BrowseItemsPage from './pages/BrowseItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';

// Placeholder for other pages
const BrowsePagePlaceholder = () => <div className='p-10'>Browse Page Coming Soon...</div>;
const NotFoundPlaceholder = () => <div className='p-10'>404 - Page Not Found</div>;


function App() {
  console.log("App component rendering with Layout");

  return (
    <Router>
      {/* Use flex layout to push footer down */}
      <div className="flex flex-col min-h-screen">
        <Header /> {/* Header is always visible */}

        {/* Main content area - takes remaining height */}
        <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/" element={<HomePageContent />} />
            <Route path="/browse" element={<BrowseItemsPage />} /> 
            <Route path="/item/:itemId" element={<ItemDetailPage />} />
            {/* Add other routes (Login, Register, ItemDetail) later */}

            <Route path="*" element={<NotFoundPlaceholder />} />
          </Routes>
        </main>

        <Footer /> {/* Footer is always visible */}
      </div>
    </Router>
  );
}

// TEMPORARY: Let's move the test content into a HomePage component file
// Create src/pages/HomePage.jsx (explained below)

export default App;