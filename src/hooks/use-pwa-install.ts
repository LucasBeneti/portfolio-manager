import { useEffect, useRef, useState, useCallback } from 'react';

let capturedPrompt: Event | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    capturedPrompt = e;
  });
}

export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(() => capturedPrompt !== null);
  const [isStandalone, setIsStandalone] = useState(false);
  const deferredPromptRef = useRef<Event | null>(capturedPrompt);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsStandalone(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      capturedPrompt = e;
      deferredPromptRef.current = e;
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      capturedPrompt = null;
      deferredPromptRef.current = null;
      setCanInstall(false);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = useCallback(async () => {
    const event = deferredPromptRef.current;
    if (!event) return;

    const promptEvent = event as Event & {
      prompt: () => Promise<void>;
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    };

    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    capturedPrompt = null;
    deferredPromptRef.current = null;
    setCanInstall(false);

    return outcome;
  }, []);

  return { canInstall, isStandalone, installApp };
}
