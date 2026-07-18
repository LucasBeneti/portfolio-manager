import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pwa-install-banner::v1';

export function usePWAAlertDismiss() {
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage might be unavailable
    }
    setIsDismissed(true);
  }, []);

  return { isDismissed, dismiss };
}
