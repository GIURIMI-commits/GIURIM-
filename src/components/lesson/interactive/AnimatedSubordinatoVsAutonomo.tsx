"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, ShieldCheck, Zap, UserCheck, TrendingUp, Handshake, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type ContractType = "subordinato" | "autonomo";

const data = {
    subordinato: {
        id: "subordinato",
        title: "Lavoro Subordinato",
        icon: ShieldCheck,
        color: "text-blue-600 dark:text-blue-500",
        bgActive: "bg-blue-50 dark:bg-blue-900/30",
        borderActive: "border-blue-500",
        bgHover: "hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
        subtitle: "Lavori 'sotto' qualcuno",
        points: [
            { icon: Clock, label: "Orario", desc: "Orari e turni imposti dal datore di lavoro." },
            { icon: Search, label: "Controllo", desc: "Soggetto al potere direttivo e disciplinare." },
            { icon: Zap, label: "Rischio", desc: "Nessun rischio d'impresa (paga fissa)." },
            { icon: ShieldCheck, label: "Tutele", desc: "Massime tutele (ferie, malattia, NASpI, TFR)." },
        ]
    },
    autonomo: {
        id: "autonomo",
        title: "Lavoro Autonomo",
        icon: UserCheck,
        color: "text-amber-600 dark:text-amber-500",
        bgActive: "bg-amber-50 dark:bg-amber-900/30",
        borderActive: "border-amber-500",
        bgHover: "hover:bg-amber-50/50 dark:hover:bg-amber-900/20",
        subtitle: "Lavori 'per' risultati",
        points: [
            { icon: Clock, label: "Orario", desc: "Totale autonomia nell'organizzazione del tempo." },
            { icon: Handshake, label: "Controllo", desc: "Accordo sul risultato, nessun 'capo' diretto." },
            { icon: Zap, label: "Rischio", desc: "Rischio d'impresa a proprio carico (es. clienti non pagano)." },
            { icon: TrendingUp, label: "Tutele", desc: "Minori tutele legali (più peso al contratto scritto)." },
        ]
    }
};

export function AnimatedSubordinatoVsAutonomo() {
    const [activeType, setActiveType] = useState<ContractType>("subordinato");

    return (
        <div className="my-10 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm relative">
            <div className="p-6 text-center border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Lo Spettro del Lavoro
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Scegli la tipologia per esplorare come cambiano libertà, rischi e tutele.
                </p>
            </div>

            <div className="flex flex-col md:flex-row border-b border-neutral-200 dark:border-neutral-800">
                {(Object.keys(data) as ContractType[]).map((key) => {
                    const item = data[key];
                    const isActive = activeType === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveType(key)}
                            className={cn(
                                "flex-1 p-4 md:p-6 flex flex-col items-center justify-center gap-3 transition-colors border-b-4 md:border-b-0 md:border-r-4 relative",
                                isActive ? cn("bg-neutral-50 dark:bg-neutral-800/50", item.borderActive) : cn("border-transparent", item.bgHover),
                                key === "subordinato" ? "border-r border-neutral-200 dark:border-neutral-800 md:border-r-4" : "border-r-0 md:border-r-0 md:border-b-0"
                            )}
                        >
                            {/* Selected Indicator for Mobile */}
                            {isActive && <div className={cn("absolute bottom-0 left-0 right-0 h-1 md:hidden", item.color.replace('text-', 'bg-').split(' ')[0])} />}
                            {/* Selected Indicator for Desktop */}
                            {isActive && <div className={cn("absolute top-0 bottom-0 right-0 w-1 hidden md:block", item.color.replace('text-', 'bg-').split(' ')[0])} />}

                            <div className={cn("p-3 rounded-2xl shadow-sm bg-white dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-700", item.color)}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <h4 className={cn("font-bold text-lg mb-1 transition-colors", isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400")}>
                                    {item.title}
                                </h4>
                                <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                                    {item.subtitle}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="p-6 md:p-8 relative min-h-[300px]">
                {/* Background active color tint */}
                <div className={cn("absolute inset-0 opacity-20 transition-colors duration-500 pointer-events-none", data[activeType].bgActive)} />

                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6 text-center relative z-10">
                    Caratteristiche Principali
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {data[activeType].points.map((pt, idx) => (
                        <motion.div
                            key={`${activeType}-${idx}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-start gap-4 shadow-sm"
                        >
                            <div className={cn("p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 shrink-0", data[activeType].color)}>
                                <pt.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                                    {pt.label}
                                </div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-snug">
                                    {pt.desc}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
