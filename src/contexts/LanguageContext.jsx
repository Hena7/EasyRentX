import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations'; // Import translations

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // The translation function 't'
  // It takes a key (like 'nav.home') and returns the string
  // in the currently selected language.
  // Basic version for now: Doesn't handle dot notation deeply or replacements.
  const t = (key) => {
    const keys = key.split('.'); // e.g., 'nav.home' -> ['nav', 'home']
    let result = translations[language];
    try {
        for (const k of keys) {
             result = result[k];
             if (result === undefined) throw new Error(); // Key not found
        }
        return result || key; // Return the translation or the key itself if not found
    } catch (error) {
        console.warn(`Translation key "${key}" not found for language "${language}".`);
        return key; // Return the key as fallback
    }
  };

  // Function to explicitly change the language
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    } else {
      console.warn(`Language "${lang}" not found in translations.`);
    }
  };


  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;