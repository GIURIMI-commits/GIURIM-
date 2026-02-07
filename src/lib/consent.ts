"use client";

import { useState, useEffect } from 'react';

export type ConsentState = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
};

export const DEFAULT_CONSENT: ConsentState = {
    essential: true, // Always required
    analytics: false,
    marketing: false,
};

const CONSENT_KEY = 'giurimi_consent';

export function getConsent(): ConsentState {
    if (typeof window === 'undefined') return DEFAULT_CONSENT;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return DEFAULT_CONSENT;

    try {
        return JSON.parse(stored);
    } catch {
        return DEFAULT_CONSENT;
    }
}

export function saveConsent(consent: ConsentState) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));

    // Set a cookie for server-side checking (optional, but good practice)
    // Max-age: 1 year (31536000)
    document.cookie = `${CONSENT_KEY}=${JSON.stringify(consent)}; path=/; max-age=31536000; SameSite=Lax`;

    // Dispatch event for components to react immediately
    window.dispatchEvent(new Event('consent-updated'));
}

export function useConsent() {
    const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
    const [hasConsented, setHasConsented] = useState<boolean>(false);

    useEffect(() => {
        const load = () => {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (stored) {
                setConsent(JSON.parse(stored));
                setHasConsented(true);
            }
        };

        load();

        const handleUpdate = () => load();
        window.addEventListener('consent-updated', handleUpdate);

        return () => window.removeEventListener('consent-updated', handleUpdate);
    }, []);

    const updateConsent = (newConsent: Partial<ConsentState>) => {
        const updated = { ...DEFAULT_CONSENT, ...consent, ...newConsent };
        saveConsent(updated);
        setConsent(updated);
        setHasConsented(true);
    };

    const acceptAll = () => {
        updateConsent({ analytics: true, marketing: true });
    };

    const rejectAll = () => {
        updateConsent({ analytics: false, marketing: false });
    };

    return { consent, hasConsented, updateConsent, acceptAll, rejectAll };
}
