"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, FileX, Scale, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type VizioType = "incompetenza" | "violazione" | "eccesso";

const viziData = {
    incompetenza: {
        id: "incompetenza",
        title: "Incompetenza",
        icon: UserX,
        color: "text-rose-600 dark:text-rose-400",
        bgHover: "hover:bg-rose-50 dark:hover:bg-rose-900/20",
        borderActive: "border-rose-400 dark:border-rose-500",
        bgActive: "bg-rose-50 dark:bg-rose-900/20",
        desc: "L'atto è firmato da chi NON aveva il potere legale di farlo.",
        example: "Il Sindaco firma un permesso di costruire (spetta invece al Dirigente Tecnico).",
        keyword: "Soggetto Sbagliato"
    },
    violazione: {
        id: "violazione",
        title: "Violazione di Legge",
        icon: FileX,
        color: "text-amber-600 dark:text-amber-400",
        bgHover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
        borderActive: "border-amber-400 dark:border-amber-500",
        bgActive: "bg-amber-50 dark:bg-amber-900/20",
        desc: "L'atto contrasta direttamente con una norma (sostanziale o procedurale).",
        example: "Manca la 'motivazione' obbligatoria ex art. 3 della L. 241/90.",
        keyword: "Regola Infranta"
    },
    eccesso: {
        id: "eccesso",
        title: "Eccesso di Potere",
        icon: Scale,
        color: "text-indigo-600 dark:text-indigo-400",
        bgHover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
        borderActive: "border-indigo-400 dark:border-indigo-500",
        bgActive: "bg-indigo-50 dark:bg-indigo-900/20",
        desc: "Il potere esiste ed è usato dalla persona giusta, ma per un fine distorto o in modo irragionevole.",
        example: "Un dipendente viene 'trasferito per esigenze di servizio', ma in realtà è una punizione mascherata.",
        keyword: "Uso Distorto"
    }
};

export function AnimatedViziAtto() {
    const [activeTab, setActiveTab] = useState<VizioType>("incompetenza");

    return (
        <div className="my-10 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
            <div className="p-6 md:p-8 text-center border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <div className="flex justify-center mb-3 text-neutral-400">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    I Trè Vizi di Legittimità
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Seleziona un vizio per scoprirne il significato pratico e l'esempio.
                </p>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Sidebar Menu */}
                <div className="md:w-1/3 flex flex-row md:flex-col p-4 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 gap-2 overflow-x-auto">
                    {(Object.keys(viziData) as VizioType[]).map((key) => {
                        const data = viziData[key];
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl min-w-[160px] md:min-w-0 text-left transition-all border-2",
                                    isActive
                                        ? cn(data.borderActive, data.bgActive)
                                        : cn("border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/50", data.bgHover)
                                )}
                            >
                                <div className={cn("p-2 rounded-lg bg-white dark:bg-neutral-800 shadow-sm", data.color)}>
                                    <data.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                                        {data.keyword}
                                    </div>
                                    <div className={cn(
                                        "font-semibold text-sm",
                                        isActive ? "text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-neutral-400"
                                    )}>
                                        {data.title}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="md:w-2/3 p-6 md:p-8 min-h-[250px] flex items-center justify-center relative bg-neutral-50/50 dark:bg-neutral-900/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-lg"
                        >
                            <div className={cn("inline-block mb-4 p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm", viziData[activeTab].color)}>
                                {React.createElement(viziData[activeTab].icon, { className: "w-8 h-8" })}
                            </div>

                            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                                {viziData[activeTab].title}
                            </h4>

                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-medium text-[15px]">
                                {viziData[activeTab].desc}
                            </p>

                            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl relative overflow-hidden">
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1", viziData[activeTab].bgActive.split(' ')[0])} style={{ backgroundColor: "currentColor" /* Fallback if utility classes fail for borders, but we just use the colored left border pattern */ }} />
                                {/* A simpler way: just inline style the border color based on theme, or use a known tailwind color text class */}
                                <div className={cn("absolute left-0 top-0 bottom-0 w-1 bg-current", viziData[activeTab].color)} />
                                <div className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-1 ml-2">Esempio Pratico</div>
                                <div className="text-sm text-neutral-800 dark:text-neutral-200 ml-2">
                                    {viziData[activeTab].example}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
