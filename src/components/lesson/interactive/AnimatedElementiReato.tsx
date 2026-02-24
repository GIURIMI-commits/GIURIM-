"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Scale, BrainCircuit, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = [
    {
        id: "tipico",
        title: "1. Fatto Tipico",
        icon: Filter,
        theme: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-200 dark:border-blue-800",
        shadow: "shadow-blue-500/20",
        shortDesc: "Il fatto rientra nella norma?",
        details: [
            "Condotta (Azione o Omissione)",
            "Evento dannoso o pericoloso",
            "Nesso causale tra condotta ed evento"
        ],
        failureDesc: "Se il fatto non è previsto da una legge come reato, l'analisi si ferma: non c'è reato.",
    },
    {
        id: "antigiuridico",
        title: "2. Antigiuridicità",
        icon: Scale,
        theme: "text-indigo-500",
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        border: "border-indigo-200 dark:border-indigo-800",
        shadow: "shadow-indigo-500/20",
        shortDesc: "Il fatto è giustificato?",
        details: [
            "Assenza di cause di giustificazione",
            "Nessuna legittima difesa presente",
            "Nessuno stato di necessità o consenso"
        ],
        failureDesc: "Se esiste una 'scriminante' (es. hai agito per legittima difesa), il fatto tipico diventa lecito.",
    },
    {
        id: "colpevolezza",
        title: "3. Colpevolezza",
        icon: BrainCircuit,
        theme: "text-rose-500",
        bg: "bg-rose-100 dark:bg-rose-900/30",
        border: "border-rose-200 dark:border-rose-800",
        shadow: "shadow-rose-500/20",
        shortDesc: "Il fatto è rimproverabile?",
        details: [
            "Dolo (volontà dell'evento)",
            "Colpa (negligenza, imprudenza)",
            "Imputabilità dell'autore"
        ],
        failureDesc: "Se l'autore non è imputabile (es. incapacità grave) o manca l'elemento psicologico, non c'è pena.",
    }
];

export function AnimatedElementiReato() {
    const [activeFilter, setActiveFilter] = useState<number>(0);

    return (
        <div className="my-10 w-full max-w-3xl mx-auto rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-xl dark:shadow-2xl flex flex-col items-center p-6 relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Filter size={200} />
            </div>

            <div className="text-center mb-8 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                    Il Reato come un "Imbuto a 3 Filtri"
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm max-w-md mx-auto">
                    Seleziona ogni filtro per capire come viene analizzato un caso penale. Se il fatto non supera **tutti e tre i livelli**, non si viene puniti.
                </p>
            </div>

            {/* Visual Funnel Graphic */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-2 mb-10 w-full relative z-10">
                {filters.map((filter, index) => {
                    const isActive = activeFilter === index;
                    const Icon = filter.icon;
                    return (
                        <React.Fragment key={filter.id}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveFilter(index)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 w-full md:w-1/3 relative overflow-hidden",
                                    isActive
                                        ? `border-${filter.theme.split('-')[1]}-500 ${filter.bg} shadow-lg ${filter.shadow}`
                                        : "border-transparent bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                                )}
                            >
                                <div className={cn("p-3 rounded-xl mb-3", isActive ? "bg-white dark:bg-neutral-800" : "bg-white/50 dark:bg-neutral-700/50")}>
                                    <Icon className={cn("w-6 h-6", isActive ? filter.theme : "text-neutral-500 dark:text-neutral-400")} />
                                </div>
                                <h4 className={cn("font-bold text-sm", isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400")}>
                                    {filter.title}
                                </h4>
                                <p className={cn("text-xs mt-1 text-center", isActive ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-500")}>
                                    {filter.shortDesc}
                                </p>
                            </motion.button>
                            {index < filters.length - 1 && (
                                <motion.div
                                    className="hidden md:flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <ChevronRight className="text-neutral-300 dark:text-neutral-600 w-6 h-6" />
                                </motion.div>
                            )}
                            {index < filters.length - 1 && (
                                <div className="md:hidden w-px h-6 bg-neutral-200 dark:bg-neutral-800" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Information Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full relative z-10"
                >
                    <div className={cn(
                        "rounded-2xl p-4 sm:p-6 border",
                        filters[activeFilter].bg,
                        filters[activeFilter].border
                    )}>
                        <h4 className="font-bold text-lg mb-3 sm:mb-4 text-neutral-900 dark:text-white">Cosa si valuta qui?</h4>
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            <ul className="space-y-3">
                                {filters[activeFilter].details.map((detail, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start text-sm text-neutral-700 dark:text-neutral-300"
                                    >
                                        <CheckCircle2 className={cn("w-5 h-5 mr-3 shrink-0", filters[activeFilter].theme)} />
                                        <span>{detail}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex flex-col justify-center p-4 bg-white/60 dark:bg-black/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-2 font-bold text-amber-600 dark:text-amber-500 text-sm">
                                    <AlertTriangle className="w-4 h-4" />
                                    Cosa succede se si blocca?
                                </div>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    {filters[activeFilter].failureDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
