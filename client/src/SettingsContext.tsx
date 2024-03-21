import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Settings {
  notificationCount: number;
  notificationPosition: string;
  notificationTimeout: number;
}

const defaultSettings: Settings = {
  notificationCount: 5,
  notificationPosition: '1', // Changed from 'top-right' to '1'
  notificationTimeout: 5,
};

const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
