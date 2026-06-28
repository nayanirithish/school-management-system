import React, { createContext, useState, useContext, ReactNode } from 'react';

type TextSize = 'Low' | 'Medium' | 'High';

interface FacultyPreferencesContextType {
  isFacultyDark: boolean;
  setIsFacultyDark: (val: boolean) => void;
  facultyTextSize: TextSize;
  setFacultyTextSize: (val: TextSize) => void;
  facultyNotifications: boolean;
  setFacultyNotifications: (val: boolean) => void;
  facultyEmail: string;
  setFacultyEmail: (val: string) => void;
  facultyPhone: string;
  setFacultyPhone: (val: string) => void;
}

const FacultyPreferencesContext = createContext<FacultyPreferencesContextType | undefined>(undefined);

export const FacultyPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [isFacultyDark, setIsFacultyDark] = useState(false);
  const [facultyTextSize, setFacultyTextSize] = useState<TextSize>('Medium');
  const [facultyNotifications, setFacultyNotifications] = useState(true);
  
  const [facultyEmail, setFacultyEmail] = useState('rahul.sharma@oryol.com');
  const [facultyPhone, setFacultyPhone] = useState('+91-98765-43210');

  return (
    <FacultyPreferencesContext.Provider value={{
      isFacultyDark, setIsFacultyDark,
      facultyTextSize, setFacultyTextSize,
      facultyNotifications, setFacultyNotifications,
      facultyEmail, setFacultyEmail,
      facultyPhone, setFacultyPhone,
    }}>
      {children}
    </FacultyPreferencesContext.Provider>
  );
};

export const useFacultyPreferences = () => {
  const context = useContext(FacultyPreferencesContext);
  if (!context) {
    throw new Error('useFacultyPreferences must be used within a FacultyPreferencesProvider');
  }
  return context;
};
