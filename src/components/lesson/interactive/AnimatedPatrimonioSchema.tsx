"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ban, MessageSquareWarning, MonitorSmartphone } from "lucide-react";

type TabKey = "furto" | "truffa" | "frode";

export function AnimatedPatrimonioSchema() {
    const [active, setActive] = useState<TabKey>("furto");

    const data = {
        furto: {
            title: "Furto",
            icon: Ban,
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-900/20",
            border: "border-red-200 dark:border-red-800/40",
            buttonBg: "bg-red-100 dark:bg-red-900/30",
            mechanism: "Sottrazione (contro la tua volontà)",
            focus: "L'autore prende la cosa. Tu non partecipi all'azione, la subisci passivamente.",
            example: "Ti sfilano il portafoglio dalla tasca."
        },
        truffa: {
            title: "Truffa",
            icon: MessageSquareWarning,
            color: "text-amber-500",
            bg: "bg-amber-50 dark:bg-amber-900/20",
            border: "border-amber-200 dark:border-amber-800/40",
            buttonBg: "bg-amber-100 dark:bg-amber-900/30",
            mechanism: "Inganno (il consenso è viziato)",
            focus: "L'autore ti inganna (artifici/raggiri). Tu consegni il bene volontariamente, ma a causa dell'inganno.",
            example: "Fai un bonifico a un finto ente di beneficenza."
        },
        frode: {
            title: "Frode Informatica",
            icon: MonitorSmartphone,
            color: "text-indigo-500",
            bg: "bg-indigo-50 dark:bg-indigo-900/20",
            border: "border-indigo-200 dark:border-indigo-800/40",
            buttonBg: "bg-indigo-100 dark:bg-indigo-900/30",
            mechanism: "Manipolazione (intervento sul sistema)",
            focus: "L'autore aggira te agendo direttamente sul sistema informatico o sui dati per ottenere il profitto.",
            example: "Un malware trasferisce fondi dal tuo home banking."
        }
    };

    return (
        <div className="my-10 p-5 md:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                I tre meccanismi del danno patrimoniale
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
                Scegli il reato per visualizzare come l'ordinamento distingue le condotte:
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {(Object.keys(data) as TabKey[]).map((key) => {
                    const isActive = active === key;
                    const info = data[key];
                    const Icon = info.icon;
                    return (
                        <button
                            key={key}
                            onClick={() => setActive(key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${isActive
                                ? `${info.buttonBg} ${info.border} ${info.color}`
                                : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {info.title}
                        </button>
                    );
                })}
            </div>

            <div className="relative min-h-[160px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`p-5 rounded-xl border ${data[active].bg} ${data[active].border}`}
                    >
                        <div className="flex flex-col gap-3">
                            <div>
                                <h4 className={`text-xs uppercase tracking-wider font-bold mb-1 ${data[active].color} opacity-80`}>
                                    Meccanismo
                                </h4>
                                <p className="text-base font-bold text-neutral-900 dark:text-white">
                                    {data[active].mechanism}
                                </p>
                            </div>
                            <div className="w-full h-px bg-black/5 dark:bg-white/5 my-1" />
                            <div>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                                    {data[active].focus}
                                </p>
                            </div>
                            <div className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400">
                                <span className="font-semibold not-italic">Es: </span>
                                {data[active].example}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
