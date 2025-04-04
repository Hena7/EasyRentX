// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json'; // Check path
import translationAM from './locales/am/translation.json'; // Check path

console.log("i18n.js: File executing..."); // Log 1

const resources = {
  en: {
    translation: translationEN
  },
  am: {
    translation: translationAM
  }
};

console.log("i18n.js: Resources object created:", resources); // Log 2

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // Keep debug true for more console output from i18next itself
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    }
  })
  .then(() => {
      console.log("i18n.js: Initialization successful (Promise Resolved)"); // Log 3 SUCCESS
  })
  .catch((error) => {
      console.error("i18n.js: Initialization FAILED (Promise Rejected):", error); // Log 4 FAILURE
  });

console.log("i18n.js: File execution finished (init is async)."); // Log 5

export default i18n;    