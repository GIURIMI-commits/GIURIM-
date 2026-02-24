"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "status" | "proof" | "standard" | "timeline";

const tabs: Array<{ key: TabKey; label: string; subtitle: string }> = [
    { key: "status", label: "Status", subtitle: "Indagato vs imputato" },
    { key: "proof", label: "Prova", subtitle: "Onere della prova" },
    { key: "standard", label: "Soglia", subtitle: "Oltre ragionevole dubbio" },
    { key: "timeline", label: "Tempo", subtitle: "Fino a condanna definitiva" },
];

export function AnimatedPresunzioneSchema() {
    const [active, setActive] = React.useState<TabKey>("status");

    return (
        <section className="my-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 md:p-6 shadow-sm">
            <header className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                    Presunzione di innocenza — schema interattivo
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Tocca un tab: ogni pezzo spiega una parte del principio senza slogan.
                </p>
            </header>

            <nav className="mt-4 flex flex-wrap gap-2" aria-label="Schema tabs">
                {tabs.map((t) => {
                    const isActive = t.key === active;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            onClick={() => setActive(t.key)}
                            className={[
                                "rounded-xl border px-3 py-2 text-left transition",
                                isActive
                                    ? "border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-900/20"
                                    : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                            ].join(" ")}
                            aria-pressed={isActive}
                        >
                            <span className={["block text-sm font-medium", isActive ? "text-indigo-700 dark:text-indigo-300" : "text-neutral-700 dark:text-neutral-300"].join(" ")}>
                                {t.label}
                            </span>
                            <span className={["block text-xs", isActive ? "text-indigo-500 dark:text-indigo-400" : "text-neutral-500 dark:text-neutral-500"].join(" ")}>
                                {t.subtitle}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-5">
                <AnimatePresence mode="wait">
                    {active === "status" && (
                        <motion.div
                            key="status"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">Indagato</p>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    Fase investigativa. È una posizione nel procedimento, non una
                                    “etichetta di colpa”.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">Imputato</p>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    Fase processuale davanti al giudice. Anche qui: non è colpevole
                                    finché non c’è condanna definitiva.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {active === "proof" && (
                        <motion.div
                            key="proof"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4"
                        >
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Onere della prova</p>
                            <div className="mt-3 flex items-center gap-3">
                                <motion.div
                                    className="h-2 flex-1 rounded-full bg-neutral-200 dark:bg-neutral-800"
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 1 }}
                                />
                                <motion.div
                                    className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-300 font-medium"
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                >
                                    Accusa (PM) → deve dimostrare
                                </motion.div>
                            </div>
                            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                                Il sistema non chiede all’imputato di “provare l’innocenza”.
                                Chiede all’accusa di provare la colpevolezza con standard elevato.
                            </p>
                        </motion.div>
                    )}

                    {active === "standard" && (
                        <motion.div
                            key="standard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4"
                        >
                            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Oltre ogni ragionevole dubbio</p>
                            <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                    <span>Probabile</span>
                                    <span>Molto probabile</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Oltre dubbio ragionevole</span>
                                </div>
                                <div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-indigo-500 dark:bg-indigo-400"
                                        initial={{ width: "15%" }}
                                        animate={{ width: "95%" }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                                    />
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                                La condanna richiede un livello di prova incompatibile con un dubbio
                                serio e ragionevole.
                            </p>
                        </motion.div>
                    )}

                    {active === "timeline" && (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            {[
                                { title: "Prima", body: "Indagini: si cercano elementi, non si ‘certifica’ colpa.", icon: "🔎" },
                                { title: "Durante", body: "Processo: contraddittorio e prova. Standard elevato per condannare.", icon: "⚖️" },
                                { title: "Dopo", body: "Solo con condanna definitiva si supera la presunzione.", icon: "🛑" },
                            ].map((c) => (
                                <div key={c.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 relative overflow-hidden">
                                    <div className="text-2xl mb-2 opacity-80">{c.icon}</div>
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">{c.title}</p>
                                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{c.body}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
