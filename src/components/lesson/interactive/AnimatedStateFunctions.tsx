"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Landmark, Scale, FileSignature, ArrowRight } from "lucide-react";

export function AnimatedStateFunctions() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemAnim: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="my-10 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
        >
            <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Le 3 Funzioni dello Stato
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Dalla regola generale (astratta) all'applicazione, fino al controllo.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">

                {/* 1. Legislativa */}
                <motion.div variants={itemAnim} className="flex-1 w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl p-5 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                        <Landmark className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">Parlamento</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-500/80 mb-2">Legislativa</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">Crea le norme generali e astratte per tutti.</p>
                </motion.div>

                <motion.div variants={itemAnim} className="hidden md:flex text-neutral-300 dark:text-neutral-700">
                    <ArrowRight className="w-6 h-6" />
                </motion.div>

                {/* 2. Amministrativa (Highlighted) */}
                <motion.div variants={itemAnim} className="flex-1 w-full bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-400 dark:border-emerald-500 rounded-xl p-5 text-center flex flex-col items-center relative shadow-sm">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap border border-emerald-200 dark:border-emerald-800">
                        Focus Area 5
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 mt-2">
                        <FileSignature className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">P.A.</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-500/80 mb-2">Amministrativa</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">Applica concretamente le leggi ai casi specifici.</p>
                </motion.div>

                <motion.div variants={itemAnim} className="hidden md:flex text-neutral-300 dark:text-neutral-700">
                    <ArrowRight className="w-6 h-6" />
                </motion.div>

                {/* 3. Giurisdizionale */}
                <motion.div variants={itemAnim} className="flex-1 w-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 rounded-xl p-5 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                        <Scale className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-1">Giudici</h4>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-500 dark:text-purple-500/80 mb-2">Giurisdizionale</p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">Risolvono le liti e puniscono chi viola la legge.</p>
                </motion.div>

            </div>
        </motion.div>
    );
}
