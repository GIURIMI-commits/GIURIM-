"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Link as LinkIcon, Home, CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const formeData = [
    {
        id: "matrimonio",
        title: "Matrimonio",
        subtitle: "L'istituto tradizionale",
        icon: Landmark,
        color: "text-blue-500",
        bgLight: "bg-blue-50 dark:bg-blue-950/30",
        bgSolid: "bg-blue-500",
        border: "border-blue-200 dark:border-blue-900",
        description: "Status giuridico forte con regole patrimoniali e doveri coniugali predefiniti. Riconosciuto dall'art. 29 della Costituzione.",
        features: [
            { text: "Doveri coniugali inderogabili", type: "strong" },
            { text: "Regime patrimoniale automatico (Comunione)", type: "strong" },
            { text: "Pieni diritti successori", type: "strong" },
            { text: "Gestione rigorosa della crisi (Separazione + Divorzio)", type: "warning" },
        ]
    },
    {
        id: "unione",
        title: "Unione Civile",
        subtitle: "Legge 76/2016",
        icon: LinkIcon,
        color: "text-indigo-500",
        bgLight: "bg-indigo-50 dark:bg-indigo-950/30",
        bgSolid: "bg-indigo-500",
        border: "border-indigo-200 dark:border-indigo-900",
        description: "Forma strutturata per coppie dello stesso sesso con tutele e obblighi molto simili al matrimonio, tranne per l'obbligo di fedeltà e adozione.",
        features: [
            { text: "Doveri di assistenza morale e materiale", type: "strong" },
            { text: "Regime patrimoniale (Comunione o Separazione)", type: "strong" },
            { text: "Diritti successori equiparati", type: "strong" },
            { text: "Scioglimento diretto (senza separazione preliminare)", type: "warning" },
        ]
    },
    {
        id: "convivenza",
        title: "Convivenza di Fatto",
        subtitle: "Accordi e Flessibilità",
        icon: Home,
        color: "text-emerald-500",
        bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
        bgSolid: "bg-emerald-500",
        border: "border-emerald-200 dark:border-emerald-900",
        description: "Riconosce la vita comune ma lascia massima libertà economica. Le tutele automatiche sono limitate (es. casa, malattia).",
        features: [
            { text: "Nessun obbligo automatico di mantenimento", type: "neutral" },
            { text: "Patrimoni separati di default", type: "neutral" },
            { text: "Tutele in caso di malattia o casa in locazione", type: "strong" },
            { text: "Necessità di contratti di convivenza per regole extra", type: "warning" },
        ]
    }
];

export function AnimatedFormeFamiliari() {
    const [activeId, setActiveId] = useState("matrimonio");
    const activeData = formeData.find(f => f.id === activeId)!;

    return (
        <div className="my-10 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-center mb-8">Le Tre Cornici Giuridiche</h3>

            {/* Tabs */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                {formeData.map((forma) => {
                    const isActive = activeId === forma.id;
                    const Icon = forma.icon;
                    return (
                        <button
                            key={forma.id}
                            onClick={() => setActiveId(forma.id)}
                            className={cn(
                                "relative px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                                isActive ? "text-white shadow-md shadow-neutral-200 dark:shadow-none" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="forme-tabs-bg"
                                    className={cn("absolute inset-0 rounded-xl", forma.bgSolid)}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                            <Icon className={cn("w-4 h-4 relative z-10", isActive ? "text-white" : "")} />
                            <span className="relative z-10">{forma.title}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="relative min-h-[250px] overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "p-6 rounded-2xl border bg-white dark:bg-neutral-950 max-w-2xl mx-auto shadow-sm",
                            activeData.border
                        )}
                    >
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Icon large */}
                            <div className={cn("p-4 rounded-2xl shrink-0", activeData.bgLight)}>
                                <activeData.icon className={cn("w-8 h-8", activeData.color)} />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h4 className="text-xl font-bold text-foreground">{activeData.title}</h4>
                                    <p className="text-sm text-muted-foreground font-medium">{activeData.subtitle}</p>
                                </div>

                                <p className="text-sm leading-relaxed text-foreground/80">
                                    {activeData.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {activeData.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm">
                                            {feat.type === "strong" && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                                            {feat.type === "neutral" && <ArrowRight className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />}
                                            {feat.type === "warning" && <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                                            <span className={cn(
                                                "leading-snug",
                                                feat.type === "strong" ? "text-foreground font-medium" : "text-muted-foreground"
                                            )}>
                                                {feat.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
