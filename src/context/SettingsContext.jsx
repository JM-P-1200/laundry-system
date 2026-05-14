import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { laundryService } from '../services/laundryService';

const SettingsContext = createContext({
  settings: null,
  updateSettings: () => {},
  loading: true
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initSettings = async () => {
      // Fail-safe: Don't let the spinner spin forever if Supabase is down
      const timeout = setTimeout(() => {
        if (loading && isMounted) {
          console.warn("Cloud handshake timed out. Using local defaults.");
          setSettings({
            shop_name: 'BubbleWorks (Local)',
            price_per_kg: 2.00,
            currency: '$',
            delivery_fee: 5.00
          });
          setLoading(false);
        }
      }, 5000);

      try {
        const data = await laundryService.getSettings();
        if (isMounted) {
          if (data) {
            setSettings(data);
          } else {
            // Default Fallback
            setSettings({
              shop_name: 'BubbleWorks',
              price_per_kg: 2.00,
              currency: '$',
              delivery_fee: 5.00
            });
          }
        }
      } catch (err) {
        console.error("RDBMS_INIT_ERROR:", err.message);
      } finally {
        if (isMounted) {
          clearTimeout(timeout);
          setLoading(false);
        }
      }
    };

    initSettings();
    return () => { isMounted = false; };
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      const updated = await laundryService.saveSettings(newSettings);
      setSettings(updated);
    } catch (err) {
      console.error("Save failed:", err);
      throw err;
    }
  };

  // Memoize value to prevent unnecessary re-renders of the entire App tree
  const value = useMemo(() => ({ settings, updateSettings, loading }), [settings, loading]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);