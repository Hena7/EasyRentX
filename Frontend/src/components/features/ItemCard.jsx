import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage'; // For translation

const ItemCard = ({ item }) => {
  const { t } = useLanguage();

  // Basic fallback if item data is missing or incomplete
  if (!item || !item.id) {
      console.warn("ItemCard received invalid item prop:", item);
      return null; // Don't render anything if item or id is missing
  }

  // Placeholder image if item.imageUrl is missing
  const imageUrl = item.imageUrl || `https://fakeimg.pl/600x400`; // Simple placeholder

  // Format price - basic version, doesn't handle currency symbols yet
  // We need to extract the number for potential formatting/replacement
  const priceDisplay = item.price !== undefined ? `$${item.price}` : t('Price N/A');
  const pricePerDayText = t('itemCard.pricePerDay').replace('{{price}}', priceDisplay);


  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-blue-900/40 transition-shadow duration-300 flex flex-col h-full">
      {/* Link wraps the image */}
      <Link to={`/item/${item.id}`} className="block">
        <img
          src={imageUrl}
          alt={item.name || t('Rental Item')}
          className="w-full h-48 object-cover" // Fixed height, object-cover prevents distortion
          loading="lazy" // Improve performance for lists
        />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow"> {/* flex-grow makes body take available space */}
        <h3 className="text-lg font-semibold mb-1 truncate" title={item.name || t('Unnamed Item')}> {/* truncate prevents long names from breaking layout */}
          {/* Link wraps the title */}
          <Link to={`/item/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
             {item.name || t('Unnamed Item')}
          </Link>
        </h3>
        {/* Location (Optional) */}
        {item.location && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate" title={item.location}>
                {item.location}
            </p>
        )}

        {/* Price and Action Button - Pushed to bottom */}
        <div className="mt-auto pt-2 flex justify-between items-center"> {/* mt-auto pushes this div down */}
             <p className="text-md font-bold text-blue-600 dark:text-blue-400">
                 {pricePerDayText}
             </p>
             <Link
                 to={`/item/${item.id}`}
                 className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap" // whitespace-nowrap prevents button text wrapping
             >
                 {t('browse.rentButton')}
             </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;