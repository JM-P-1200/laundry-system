import React, { createContext, useState, useContext, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    shopName: 'BubbleWorks',
    pricePerKg: 2.00,
    currency: '$',
    deliveryFee: 5.00,
    address: '123 Bubbles Ave, Clean City'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shop_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('shop_settings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);