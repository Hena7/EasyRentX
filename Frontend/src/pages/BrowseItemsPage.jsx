import React, { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage'; // For translation
import ItemCard from '../components/features/ItemCard'; // The card component we created
import api from '../api/axios'; // Import the configured axios instance

// Fetch items from the API
const fetchItems = async () => {
  try {
    console.log('Fetching items from:', `${api.defaults.baseURL}/items`);
    const response = await api.get('/items');
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};


function BrowseItemsPage() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]); // Holds the list of items
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Holds potential errors

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const loadItems = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const fetchedItems = await fetchItems();
         if (Array.isArray(fetchedItems)) {
           setItems(fetchedItems);
         } else {
           console.error("Fetched data is not an array:", fetchedItems);
           setError("Failed to load items in the correct format.");
           setItems([]); // Set empty array on error
         }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(t('Failed to load items. Please try again later.')); // Use translated error later if needed
        setItems([]); // Ensure items is empty on error
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    loadItems();
  }, [t]); // Depend on 't' in case error messages need re-translation on language change

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        {t('browse.title')}
      </h1>

      {/* Add Filters/Search bar area placeholder here later */}
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm text-sm text-gray-600 dark:text-gray-400">
          Filters and search bar will go here...
      </div>


      {/* Conditional Rendering based on state */}
      {loading ? (
        // Loading State - Simple text or spinner
        <div className="text-center py-10">
            <p>{t('Loading items...')}</p> {/* Add this key to translations if needed */}
            {/* Optional: Add a spinner component here */}
        </div>

      ) : error ? (
         // Error State
         <div className="text-center py-10 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-4 rounded">
             <p>{t('Error')}: {error}</p> {/* Add 'Error' key to translations */}
         </div>

      ) : items.length > 0 ? (
        // Success State - Display Items
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

      ) : (
         // Empty State - No items found (after loading)
         <div className="text-center py-10">
             <p>{t('browse.noItems')}</p>
         </div>
      )}
    </div>
  );
}

export default BrowseItemsPage;