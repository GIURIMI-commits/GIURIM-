"use client";

import { useConsent } from "@/lib/consent";
import { useEffect } from "react";

export function Analytics() {
    const { consent } = useConsent();

    useEffect(() => {
        if (consent.analytics) {
            console.log("[Analytics] Consent granted. Initializing tracking...");
            // Initialize GA/PostHog here
        } else {
            console.log("[Analytics] Consent denied or revoked.");
        }
    }, [consent.analytics]);

    return null;
}
