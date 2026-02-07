"use client";

import { useState } from 'react';

// Simple hook to manage glossary interaction state if needed
// For now, mostly used to control the modal or tooltip state
export function useGlossary() {
    const [selectedTermId, setSelectedTermId] = useState<string | null>(null);

    const openGlossaryTerm = (termId: string) => {
        setSelectedTermId(termId);
    };

    const closeGlossaryTerm = () => {
        setSelectedTermId(null);
    };

    return { selectedTermId, openGlossaryTerm, closeGlossaryTerm };
}
