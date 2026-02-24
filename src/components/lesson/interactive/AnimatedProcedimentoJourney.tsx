"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PlayCircle, Search, Gavel, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
    {
        title: "Avvio",
        icon: PlayCircle,
        desc: "L'inizio del viaggio. Può partire su tua istanza (es. chiedi un permesso) o d'ufficio (es. multa).",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/40",
        border: "border-blue-200 dark:border-blue-800",
        lineColor: "bg-blue-300 dark:bg-blue-800"
    },
    {
        title: "Istruttoria",
        icon: Search,
        desc: "La fase centrale (il viaggio). La PA raccoglie i documenti, chiede pareri e valuta gli interessi.",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-100 dark:bg-amber-900/40",
        border: "border-amber-200 dark:border-amber-800",
        lineColor: "bg-amber-300 dark:bg-amber-800"
    },
    {
        title: "Decisione",
        icon: Gavel,
        desc: "L'arrivo. La PA adotta il provvedimento finale (accoglimento o rigetto) basato sull'istruttoria.",
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-100 dark:bg-rose-900/40",
        border: "border-rose-200 dark:border-rose-800",
        lineColor: "bg-rose-300 dark:bg-rose-800"
    },
    {
        title: "Comunicazione",
        icon: Mail,
        desc: "Integrazione dell'efficacia. La decisione viene comunicata formalmente al destinatario per diventare valida.",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-100 dark:bg-emerald-900/40",
        border: "border-emerald-200 dark:border-emerald-800",
        lineColor: "bg-transparent"
    }
];

export function AnimatedProcedimentoJourney() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="my-10 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
            <div className="mb-8 md:text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">L. 241/1990</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Il Viaggio del Procedimento Amministrativo
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                    Le quattro fasi obbligatorie che trasformano una richiesta (o un potere d'ufficio) in una decisione concreta con effetti giuridici.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="relative max-w-4xl mx-auto"
            >
                <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 justify-between items-start md:items-stretch h-full">
                    {phases.map((phase, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="relative flex-1 w-full min-h-[220px]"
                        >
                            {/* Connecting Line (Horizontal on Desktop, Vertical on Mobile) */}
                            {idx < phases.length - 1 && (
                                <>
                                    {/* Desktop Line */}
                                    <div className={cn(
                                        "hidden md:block absolute top-[28px] left-[50%] right-[-50%] h-[3px] z-0",
                                        phase.lineColor
                                    )} />
                                    {/* Mobile Line */}
                                    <div className={cn(
                                        "md:hidden absolute top-[40px] left-[19px] bottom-[-24px] w-[3px] z-0",
                                        phase.lineColor
                                    )} />
                                </>
                            )}

                            <div className="relative z-10 flex flex-row md:flex-col h-full gap-4 md:gap-0 items-start md:items-center text-left md:text-center">
                                {/* Icon */}
                                <div className={cn(
                                    "w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 border shadow-sm md:mb-4",
                                    phase.bg,
                                    phase.color,
                                    phase.border
                                )}>
                                    <phase.icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-start">
                                    <div className="flex items-center gap-2 md:justify-center mb-1">
                                        <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500">
                                            0{idx + 1}
                                        </span>
                                        <h4 className="font-bold text-base md:text-lg text-neutral-800 dark:text-neutral-100">
                                            {phase.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed md:px-2">
                                        {phase.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
