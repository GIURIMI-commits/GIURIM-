"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Copy, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
    {
        icon: Copy,
        title: "Condotte reiterate",
        desc: "Non basta un singolo episodio. Il reato nasce dalla ripetizione di molestie o minacce nel tempo.",
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-100 dark:bg-rose-900/30",
        border: "border-rose-200 dark:border-rose-800/40"
    },
    {
        icon: AlertCircle,
        title: "Eventi tipici (Danno)",
        desc: "L'insistenza deve causare uno stato d'ansia grave, timore per l'incolumità, o costringere a cambiare abitudini di vita.",
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-100 dark:bg-orange-900/30",
        border: "border-orange-200 dark:border-orange-800/40"
    },
    {
        icon: ShieldAlert,
        title: "La Tutela",
        desc: "Strumenti come l'Ammonimento del Questore o le misure cautelari puntano a interrompere la catena prima che peggiori.",
        color: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        border: "border-indigo-200 dark:border-indigo-800/40"
    }
];

export function AnimatedStalkingSchema() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemAnim: Variants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="my-10 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm"
        >
            <div className="mb-8">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Anatomia degli Atti Persecutori (Stalking)
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                    La norma non punisce il singolo comportamento in sé, ma la sequenza che altera la vita della vittima.
                </p>
            </div>

            <div className="flex flex-col gap-6 relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-neutral-100 dark:bg-neutral-800 z-0 hidden md:block" />

                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={itemAnim}
                        className={cn(
                            "relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center p-4 rounded-xl border",
                            item.border,
                            "bg-white dark:bg-neutral-950"
                        )}
                    >
                        <div className={cn(
                            "flex-shrink-0 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full z-10",
                            item.bg,
                            item.color
                        )}>
                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h4 className={cn("font-semibold text-base md:text-lg", item.color)}>
                                {item.title}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-1 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
