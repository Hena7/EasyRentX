import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hooks for URL params and navigation
import useLanguage from '../hooks/useLanguage'; // For translation

// Placeholder data store - In real app, API call needed
// Use the same data as BrowseItemsPage for consistency
const allItemsData = [
   { id: 1, name: 'Modern Sedan Car', price: 50, imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80', location: 'Addis Ababa', description: 'A reliable and comfortable sedan, perfect for city driving or short trips. Automatic transmission, AC, seats 5.', owner: 'Abebe T.' },
   { id: 2, name: 'Cozy Downtown Apartment', price: 120, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80', location: 'Bole', description: '1 bedroom apartment in a central location. Fully furnished with WiFi and kitchen amenities. Close to shops and restaurants.', owner: 'Sara G.' },
   { id: 3, name: 'Professional DSLR Camera', price: 40, imageUrl: 'https://images.unsplash.com/photo-1502982899975-893c9cf39028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80', location: 'Piassa', description: 'Canon EOS series DSLR with 18-55mm lens. Great for photography enthusiasts. Battery and charger included.', owner: 'John D.' },
   { id: 4, name: 'Mountain Bike - Advanced', price: 25, imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80', location: 'CMC', description: 'Lightweight aluminum frame mountain bike with front suspension. Suitable for trails and off-road.', owner: 'Bike Rentals Co.'},
   { id: 5, name: 'Camping Tent for 4 Persons', price: 30, imageUrl: 'https://images.unsplash.com/photo-1478827554211-a86990ade468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80', location: 'Lebu', description: 'Easy setup dome tent, waterproof and spacious enough for 4 people. Comes with carrying bag.', owner: 'Outdoor Gear Share'},
   { id: 6, name: 'Electric Drill Set with Bits', price: 15, imageUrl: 'https://images.unsplash.com/photo-1621905251911-a7e10b09b9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80', location: 'Kazanchis', description: 'Cordless electric drill with rechargeable battery and a set of common drill bits. Ideal for home projects.', owner: 'Tool Library'},
   { id: 7, name: 'Spacious Family House', price: 250, imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80', location: 'Old Airport', description: '3 bedroom house with garden, modern kitchen, and ample parking space. Suitable for families.', owner: 'Real Estate Agents'},
   { id: 8, name: 'Portable Bluetooth Speaker', price: 10, imageUrl: 'https://images.unsplash.com/photo-1589256469067-ea9c14617511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80', location: 'Ayat', description: 'Compact and loud Bluetooth speaker with long battery life. Connects easily to phones and laptops.', owner: 'Gadget Rentals'},
];

// Simulate fetching a single item by ID
const fetchItemById = async (id) => {
    console.log(`Simulating fetch for item ID: ${id}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // Shorter delay for detail fetch
    const item = allItemsData.find(item => item.id.toString() === id);
    console.log("Simulated fetch complete for ID:", id, "Found:", item);
    return item; // Returns the item object or undefined if not found
};


function ItemDetailPage() {
    const { t } = useLanguage();
    const { itemId } = useParams(); // Get the 'itemId' from the URL (e.g., /item/3 -> itemId is '3')
    const navigate = useNavigate(); // Hook to programmatically navigate

    const [item, setItem] = useState(null); // Holds the specific item's data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItem = async () => {
            if (!itemId) {
                setError(t("No item ID specified.")); // Add translation
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const fetchedItem = await fetchItemById(itemId);
                if (fetchedItem) {
                    setItem(fetchedItem);
                } else {
                    setError(t('itemDetail.notFound')); // Use existing translation key
                }
            } catch (err) {
                console.error(`Error fetching item ${itemId}:`, err);
                setError(t("Failed to load item details.")); // Add translation
            } finally {
                setLoading(false);
            }
        };

        loadItem();
    }, [itemId, t]); // Re-run if itemId changes (or language for error messages)

    const handleRentNow = () => {
        // Placeholder for booking logic
        // In a real app: check auth, navigate to booking/checkout, show modal etc.
        alert(`${t('Rent request submitted for')} "${item.name}" (${t('placeholder')})!`);
        // Example: navigate('/login?redirect=/checkout/' + itemId);
    };

    // Display loading state
    if (loading) {
        return <div className="text-center py-10"><p>{t('itemDetail.loading')}</p></div>;
    }

    // Display error state
    if (error) {
        return (
            <div className="text-center py-10 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-4 rounded">
                <p>{t('Error')}: {error}</p>
                <button
                    onClick={() => navigate('/browse')} // Go back to browse page
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    {t('Back to Browse')} {/* Add translation */}
                </button>
            </div>
        );
    }

    // Display item details (if loading is false and no error)
    // Added check for item just in case, though error state should catch item not found
    if (!item) {
         return <div className="text-center py-10"><p>{t('itemDetail.notFound')}</p></div>;
    }

    // Format price for display
    const priceDisplay = item.price !== undefined ? `$${item.price}` : t('Price N/A');

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden md:flex">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={item.imageUrl || `https://via.placeholder.com/600x400.png?text=${t('Image Not Available')}`}
              alt={item.name}
              className="w-full h-64 md:h-full object-cover" // Ensure consistent height
            />
          </div>

          {/* Details Section */}
          <div className="p-6 md:w-1/2 flex flex-col">
            {/* Top Details */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">{item.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {item.location && <span>{t('itemDetail.location')}: {item.location} | </span>}
                {item.owner && <span>{t('itemDetail.owner')}: {item.owner}</span>}
              </p>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                {priceDisplay} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t('itemDetail.perDay')}</span>
              </p>

              {/* Description */}
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('itemDetail.description')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  {item.description || t("No description available.")} {/* Add translation */}
              </p>
            </div>

            {/* Action Button - Pushed to bottom */}
            <div className="mt-auto">
              <button
                onClick={handleRentNow}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 shadow hover:shadow-lg"
              >
                {t('itemDetail.rentNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ItemDetailPage;