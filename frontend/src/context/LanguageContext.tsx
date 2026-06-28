import React, { createContext, useState, useContext } from 'react';

interface LanguageContextType {
  isTelugu: boolean;
  setIsTelugu: (value: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  isTelugu: false,
  setIsTelugu: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTelugu, setIsTelugu] = useState(false);
  return (
    <LanguageContext.Provider value={{ isTelugu, setIsTelugu }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
