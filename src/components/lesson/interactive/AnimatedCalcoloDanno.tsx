"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingDown, Clock, ShieldAlert, ArrowRight, ArrowDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
    {
        id: "danno_emergente",
        title: "Danno Emergente",
        icon: Wallet,
        desc: "La perdita patrimoniale immediata.",
        color: "text-red-600 dark:text-red-400",
        bgIcon: "bg-red-100 dark:bg-red-900/30",
        tabColor: "data-[active=true]:bg-red-50 data-[active=true]:border-red-500 dark:data-[active=true]:bg-red-900/20"
    },
    {
        id: "lucro_cessante",
        title: "Lucro Cessante",
        icon: TrendingDown,
        desc: "Il mancato guadagno futuro.",
        color: "text-orange-600 dark:text-orange-400",
        bgIcon: "bg-orange-100 dark:bg-orange-900/30",
        tabColor: "data-[active=true]:bg-orange-50 data-[active=true]:border-orange-500 dark:data-[active=true]:bg-orange-900/20"
    },
    {
        id: "nesso_causale",
        title: "Nesso Causale",
        icon: Activity,
        desc: "Il legame diretto con l'evento.",
        color: "text-blue-600 dark:text-blue-400",
        bgIcon: "bg-blue-100 dark:bg-blue-900/30",
        tabColor: "data-[active=true]:bg-blue-50 data-[active=true]:border-blue-500 dark:data-[active=true]:bg-blue-900/20"
    }
];

export function AnimatedCalcoloDanno() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="w-full max-w-4xl mx-auto my-12 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm flex flex-col md:flex-row">

            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        data-active={activeTab === t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={cn(
                            "flex items-start gap-3 p-4 text-left border-l-4 border-transparent transition-all",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                            activeTab !== t.id && "opacity-70",
                            t.tabColor
                        )}
                    >
                        <div className={cn("p-2 rounded-lg flex-shrink-0 mt-1", t.bgIcon, t.color)}>
                            <t.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className={cn("font-bold text-sm", activeTab === t.id ? t.color : "text-neutral-700 dark:text-neutral-300")}>
                                {t.title}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                                {t.desc}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Animation Viewer */}
            <div className="w-full md:w-2/3 p-8 flex items-center justify-center min-h-[350px] bg-neutral-50/30 dark:bg-neutral-900/10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === "danno_emergente" && <DannoEmergente key="emergente" />}
                    {activeTab === "lucro_cessante" && <LucroCessante key="cessante" />}
                    {activeTab === "nesso_causale" && <NessoCausale key="causale" />}
                </AnimatePresence>
            </div>
        </div>
    );
}

function DannoEmergente() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-sm"
        >
            <div className="relative w-48 h-48 flex flex-col items-center justify-center mb-6">

                {/* Il Patrimonio */}
                <div className="w-32 h-32 bg-emerald-100 border-4 border-emerald-500 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg z-10">
                    <span className="font-bold text-emerald-700 font-serif text-lg">Patrimonio <br /> 10.000€</span>

                    {/* Denaro che esce */}
                    <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: 150, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
                        className="absolute bottom-4 w-12 h-6 bg-red-500 text-white rounded flex items-center justify-center text-[10px] font-bold z-20"
                    >
                        -2.000€
                    </motion.div>
                </div>

                {/* Evento lesivo */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg z-30"
                >
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                </motion.div>

            </div>
            <p className="text-sm text-center text-neutral-500 font-medium">Cos'è: La perdita immediata.<br />Esempio: Spese mediche o di riparazione uscite dal portafoglio (art. 1223).</p>
        </motion.div>
    )
}

function LucroCessante() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-sm"
        >
            <div className="relative w-64 h-48 flex items-end mb-6 border-b-2 border-l-2 border-neutral-300 dark:border-neutral-700 p-4">

                {/* Grafico Andamento normale */}
                <svg className="absolute left-4 bottom-4 w-56 h-32 overflow-visible" viewBox="0 0 100 50">
                    {/* Linea trateggiata incasso previsto */}
                    <path d="M 0 50 L 30 30 L 60 10 L 100 0" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-emerald-500/50" />

                    {/* Linea reale incasso che crolla */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        d="M 0 50 L 30 30 L 40 45 L 80 40 L 100 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-orange-500"
                    />
                </svg>

                {/* Evento (incidente) */}
                <div className="absolute left-[35%] top-[40%] flex flex-col items-center">
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ShieldAlert className="w-6 h-6 text-red-500 mb-1" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1 rounded">Stop Lavoro</span>
                </div>

                {/* Area gap (mancato guadagno) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute right-4 top-4 flex items-center bg-orange-100 border border-orange-300 px-2 py-1 rounded shadow"
                >
                    <TrendingDown className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-[10px] font-bold text-orange-700">Mancato Incasso</span>
                </motion.div>

            </div>
            <p className="text-sm text-center text-neutral-500 font-medium max-w-xs">Cos'è: La ricchezza che NON è potuta entrare a causa del danno.<br />Esempio: I giorni di lavoro non retribuiti.</p>
        </motion.div>
    )
}

function NessoCausale() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="w-full flex items-center justify-between px-8 mb-8 mt-4">

                {/* L'Illecito */}
                <div className="flex flex-col items-center z-10 w-24">
                    <div className="w-16 h-16 bg-red-100 border-2 border-red-500 rounded-xl flex items-center justify-center shadow-lg relative">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                    </div>
                    <span className="text-xs font-bold text-red-600 mt-2 text-center">Fatto Illecito (A)</span>
                </div>

                {/* Freccia Nesso */}
                <div className="flex-1 px-4 relative flex items-center justify-center">
                    <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 absolute top-1/2 -translate-y-1/2"></div>
                    <motion.div
                        initial={{ left: 0, opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 -translate-y-1/2 -ml-3"
                    >
                        <ArrowRight className="text-blue-500" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-blue-500 bg-white dark:bg-neutral-900 px-2 py-1 relative -top-4 rounded-full border border-blue-200 shadow-sm z-10">
                        Nesso Causale
                    </span>
                </div>

                {/* Danno Diretto */}
                <div className="flex flex-col items-center z-10 w-24 relative">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 bg-orange-100 border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-lg relative"
                    >
                        <Activity className="w-8 h-8 text-orange-600" />
                    </motion.div>
                    <span className="text-xs font-bold text-orange-600 mt-2 text-center flex-shrink-0">Danno (B)</span>

                    {/* Danno Indiretto (vietato) espresso in grigio */}
                    <div className="absolute -bottom-16 w-32 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
                        <ArrowDown className="w-4 h-4 text-neutral-400 mb-1" />
                        <div className="w-10 h-10 border-2 border-neutral-300 border-dashed rounded bg-neutral-50 flex items-center justify-center">
                            <span className="text-[10px]">C</span>
                        </div>
                        <span className="text-[8px] text-center mt-1">Troppo lontano (art 1223)</span>
                    </div>
                </div>

            </div>
            <p className="text-sm text-center text-neutral-500 font-medium max-w-sm">Si paga solo ciò che è "conseguenza immediata e diretta" (da A a B).<br />Effetti troppo remoti nel tempo non sono risarcibili.</p>
        </motion.div>
    )
}
