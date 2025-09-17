// src/context/LanguageContext.jsx

import React, { createContext, useState, useContext } from 'react';
import { translations } from './translation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
    }
  };

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);