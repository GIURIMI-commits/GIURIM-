"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Wallet, ArrowRight } from "lucide-react";

export function AnimatedObbligazione() {
    const [step, setStep] = useState(0);

    const steps = [
        { title: "Due Soggetti Indipendenti", desc: "Questa è la situazione di partenza. Nessun legame." },
        { title: "Nasce l'Obbligazione", desc: "Un evento (es. contratto) crea il Vincolo Giuridico tra loro." },
        { title: "Esecuzione della Prestazione", desc: "Il Debitore esegue la prestazione (es. paga)." },
    ];

    return (
        <div className="my-10 p-6 md:p-10 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 shadow-sm overflow-hidden flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-12 relative max-w-lg mx-auto">

                {/* Debitore */}
                <motion.div
                    className="flex flex-col items-center z-10"
                    animate={{ scale: step > 0 ? 1.05 : 1 }}
                >
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 shadow-inner">
                        <User className="w-8 h-8" />
                    </div>
                    <span className="mt-3 font-semibold text-neutral-800 dark:text-neutral-200">Debitore</span>
                    {step === 2 && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-neutral-500 font-medium mt-1"
                        >
                            (Libero)
                        </motion.span>
                    )}
                </motion.div>

                {/* Vincolo Centrale (Corda) */}
                <div className="absolute left-[40px] right-[40px] top-[32px] h-1 md:h-2 flex items-center z-0">
                    {/* Base line */}
                    <div className="w-full h-[2px] border-b-2 border-dashed border-neutral-200 dark:border-neutral-800" />

                    {/* Active Bond Line */}
                    <motion.div
                        className="absolute left-0 top-0 h-[2px] md:h-1 bg-indigo-500 origin-left"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                            scaleX: step === 1 ? 1 : step === 2 ? 0 : 0,
                            opacity: step === 1 ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* Moving item (Prestazione) */}
                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3"
                        initial={{ x: 0, opacity: 0, scale: 0 }}
                        animate={{
                            x: step === 2 ? "100%" : 0,
                            opacity: step === 2 ? 1 : 0,
                            scale: step === 2 ? 1 : 0
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ left: step === 2 ? "calc(100% - 24px)" : "24px" }}
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg z-20">
                            <Wallet className="w-4 h-4" />
                        </div>
                    </motion.div>
                </div>

                {/* Creditore */}
                <motion.div
                    className="flex flex-col items-center z-10"
                    animate={{ scale: step > 0 ? 1.05 : 1 }}
                >
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                        <User className="w-8 h-8" />
                    </div>
                    <span className="mt-3 font-semibold text-neutral-800 dark:text-neutral-200">Creditore</span>
                    {step === 2 && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-neutral-500 font-medium mt-1"
                        >
                            (Soddisfatto)
                        </motion.span>
                    )}
                </motion.div>
            </div>

            {/* Control Testuale */}
            <div className="text-center max-w-sm mt-4 min-h-[80px]">
                <h4 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">
                    {steps[step].title}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {steps[step].desc}
                </p>
            </div>

            <button
                onClick={() => setStep((prev) => (prev + 1) % 3)}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-full font-medium transition-colors shadow-sm"
            >
                {step === 2 ? "Ricomincia" : "Fai evolvere il rapporto"}
                {step !== 2 && <ArrowRight className="w-4 h-4" />}
            </button>
        </div>
    );
}
