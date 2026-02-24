"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Building2, Map, Users, GraduationCap, Hospital, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const entities = [
    { icon: Building2, label: "Ministeri", type: "Stato" },
    { icon: Map, label: "Regioni", type: "Enti Territoriali" },
    { icon: Users, label: "Comuni", type: "Enti Territoriali" },
    { icon: GraduationCap, label: "Università", type: "Enti Pubblici" },
    { icon: Hospital, label: "ASL", type: "Enti Pubblici" },
    { icon: ShieldAlert, label: "Autorità Garanti", type: "Indipendenti" }
];

export function AnimatedPAEcosystem() {
    return (
        <div className="my-10 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 shadow-sm overflow-hidden relative">

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(transparent 1px, #000 1px)', backgroundSize: '16px 16px' }} />

            <div className="text-center mb-10 relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
                >
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        La P.A. (Macro-Sistema)
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mt-1">Non solo Roma e i Ministeri</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                {entities.map((entity, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                        className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col items-center text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group cursor-default"
                        whileHover={{ y: -2 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                            <entity.icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm">{entity.label}</h4>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1 font-semibold">{entity.type}</span>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400 italic">
                Ciascuno di questi enti ha una propria autonomia (maggiore o minore) ma tutti agiscono secondo i principi dell'Art. 97 Cost.
            </div>
        </div>
    );
}
