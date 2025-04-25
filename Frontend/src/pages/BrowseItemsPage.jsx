import React, { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage'; // For translation
import ItemCard from '../components/features/ItemCard'; // The card component we created

// Placeholder data - replace with API call later
const allItemsData = [
   { id: 1, name: 'Modern Sedan Car', price: 50, imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', location: 'Addis Ababa' },
   { id: 2, name: 'Cozy Downtown Apartment', price: 120, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', location: 'Bole' },
   { id: 3, name: 'Professional DSLR Camera', price: 40, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', location: 'Piassa' },
   { id: 4, name: 'Mountain Bike - Advanced', price: 25, imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', location: 'CMC' },
   { id: 5, name: 'Camping Tent for 4 Persons', price: 30, imageUrl: 'https://images.unsplash.com/photo-1478827554211-a86990ade468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', location: 'Lebu' },
   { id: 6, name: 'Electric Drill Set with Bits', price: 15, imageUrl: 'https://images.unsplash.com/photo-1621905251911-a7e10b09b9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', location: 'Kazanchis' },
   { id: 7, name: 'Spacious Family House', price: 250, imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', location: 'Old Airport' },
   { id: 8, name: 'Portable Bluetooth Speaker', price: 10, imageUrl: 'https://images.unsplash.com/photo-1589256469067-ea9c14617511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', location: 'Ayat' },
];

// Simulate fetching data (replace with actual API call later)
const fetchItems = async () => {
  console.log("Simulating fetch items...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay
  console.log("Simulated fetch complete.");
  // In a real app, handle potential errors here
  return allItemsData;
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