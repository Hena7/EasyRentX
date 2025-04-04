import { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext'; // Adjust path if needed

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  // The context value provides { language, changeLanguage, t }
  return context;
};

export default useLanguage;