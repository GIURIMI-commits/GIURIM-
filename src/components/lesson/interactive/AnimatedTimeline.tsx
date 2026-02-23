"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FileText, Zap, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineItems = [
    {
        icon: FileText,
        title: "Il Contratto",
        desc: "L'accordo volontario tra le parti.",
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-200 dark:border-blue-800"
    },
    {
        icon: Zap,
        title: "Il Fatto Illecito",
        desc: "Un danno ingiusto causato ad altri.",
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-900/30",
        border: "border-red-200 dark:border-red-800"
    },
    {
        icon: BookOpen,
        title: "Ogni Atto o Fatto",
        desc: "Altre situazioni previste dall'ordinamento.",
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        border: "border-emerald-200 dark:border-emerald-800"
    }
];

export function AnimatedTimeline() {
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
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="my-12 relative max-w-3xl mx-auto pl-4 md:pl-0"
        >
            {/* Linea centrale Desktop, laterale Mobile */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2" />

            <div className="space-y-12">
                {timelineItems.map((item, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            key={i}
                            variants={itemAnim}
                            className={cn(
                                "relative flex items-center",
                                isEven ? "md:justify-start" : "md:justify-end"
                            )}
                        >
                            {/* Box di Contenuto */}
                            <div className={cn(
                                "w-full ml-16 md:ml-0 md:w-[45%] bg-white dark:bg-neutral-900 p-6 rounded-2xl border shadow-sm relative z-10",
                                item.border
                            )}>
                                <h4 className={cn("font-bold text-lg mb-2 flex items-center gap-2", item.color)}>
                                    {item.title}
                                </h4>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Pallino Centrale */}
                            <div className={cn(
                                "absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-neutral-950 flex items-center justify-center z-20 shadow-sm",
                                item.bg,
                                item.color
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
