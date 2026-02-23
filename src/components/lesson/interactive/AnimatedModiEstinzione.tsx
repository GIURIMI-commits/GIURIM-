"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, FileSignature, Trash2, Users, ArrowRightLeft, User, FileText, Ban, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
    {
        id: "compensazione",
        title: "Compensazione",
        icon: ArrowRightLeft,
        desc: "Finché sei mio debitore, e io tuo creditore...",
        color: "text-blue-600 dark:text-blue-400",
        bgIcon: "bg-blue-100 dark:bg-blue-900/30",
        borderColor: "border-blue-500",
        tabColor: "data-[active=true]:bg-blue-50 data-[active=true]:border-blue-500 dark:data-[active=true]:bg-blue-900/20"
    },
    {
        id: "novazione",
        title: "Novazione",
        icon: FileSignature,
        desc: "Cancelliamo il vecchio accordo, ne facciamo uno nuovo.",
        color: "text-purple-600 dark:text-purple-400",
        bgIcon: "bg-purple-100 dark:bg-purple-900/30",
        borderColor: "border-purple-500",
        tabColor: "data-[active=true]:bg-purple-50 data-[active=true]:border-purple-500 dark:data-[active=true]:bg-purple-900/20"
    },
    {
        id: "remissione",
        title: "Remissione",
        icon: Trash2,
        desc: "Non mi devi più nulla, te lo abbuono.",
        color: "text-emerald-600 dark:text-emerald-400",
        bgIcon: "bg-emerald-100 dark:bg-emerald-900/30",
        borderColor: "border-emerald-500",
        tabColor: "data-[active=true]:bg-emerald-50 data-[active=true]:border-emerald-500 dark:data-[active=true]:bg-emerald-900/20"
    },
    {
        id: "confusione",
        title: "Confusione",
        icon: Users,
        desc: "Erediti dall'azienda verso cui eri in debito.",
        color: "text-amber-600 dark:text-amber-400",
        bgIcon: "bg-amber-100 dark:bg-amber-900/30",
        borderColor: "border-amber-500",
        tabColor: "data-[active=true]:bg-amber-50 data-[active=true]:border-amber-500 dark:data-[active=true]:bg-amber-900/20"
    }
];

export function AnimatedModiEstinzione() {
    const [activeTab, setActiveTab] = useState(modes[0].id);

    return (
        <div className="w-full max-w-4xl mx-auto my-12 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm flex flex-col md:flex-row">

            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        data-active={activeTab === m.id}
                        onClick={() => setActiveTab(m.id)}
                        className={cn(
                            "flex items-start gap-3 p-4 text-left border-l-4 border-transparent transition-all",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                            activeTab !== m.id && "opacity-70",
                            m.tabColor
                        )}
                    >
                        <div className={cn("p-2 rounded-lg flex-shrink-0 mt-1", m.bgIcon, m.color)}>
                            <m.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className={cn("font-bold text-sm", activeTab === m.id ? m.color : "text-neutral-700 dark:text-neutral-300")}>
                                {m.title}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                                {m.desc}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Animation Viewer */}
            <div className="w-full md:w-2/3 p-8 flex items-center justify-center min-h-[350px] bg-neutral-50/30 dark:bg-neutral-900/10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === "compensazione" && <Compensazione key="comp" />}
                    {activeTab === "novazione" && <Novazione key="nov" />}
                    {activeTab === "remissione" && <Remissione key="rem" />}
                    {activeTab === "confusione" && <Confusione key="conf" />}
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- Specific Animations ---

function Compensazione() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-sm"
        >
            <div className="flex justify-between w-full mb-8 relative">
                {/* Person A */}
                <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full border-2 border-neutral-200 shadow flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-neutral-400" />
                    </div>
                    <span className="text-xs font-bold text-neutral-500">Soggetto A</span>
                </div>

                {/* Person B */}
                <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full border-2 border-neutral-200 shadow flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-neutral-400" />
                    </div>
                    <span className="text-xs font-bold text-neutral-500">Soggetto B</span>
                </div>

                {/* Debts flying */}
                <motion.div
                    initial={{ x: 0, y: 10, opacity: 1 }}
                    animate={{ x: 100, y: 10, opacity: [1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute left-8 top-0 px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full border border-red-200"
                >
                    Deve 100€
                </motion.div>

                <motion.div
                    initial={{ x: 200, y: 50, opacity: 1 }}
                    animate={{ x: 100, y: 50, opacity: [1, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute left-8 top-0 px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full border border-blue-200"
                >
                    Deve 100€
                </motion.div>

                {/* Big Zero appearing in middle */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1.5 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg z-20"
                >
                    <CheckCircle className="w-8 h-8" />
                </motion.div>
            </div>
            <p className="text-sm text-center text-neutral-500 font-medium">I due debiti reciproci si annullano automaticamente ("si compensano").</p>
        </motion.div>
    )
}

function Novazione() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                {/* Old Obligation */}
                <motion.div
                    animate={{
                        opacity: [1, 1, 0, 0, 1],
                        scale: [1, 1, 0.5, 0.5, 1],
                        rotate: [0, -10, -20, 0, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-32 h-40 bg-white dark:bg-neutral-800 border-2 border-neutral-300 border-dashed rounded-lg flex flex-col items-center justify-center p-4 shadow-sm"
                >
                    <FileText className="w-10 h-10 text-neutral-400 mb-2" />
                    <span className="text-xs font-bold text-neutral-500 text-center">Vecchio<br />Contratto<br />(1000€)</span>
                    <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Ban className="w-12 h-12 text-red-500" />
                    </div>
                </motion.div>

                {/* New Obligation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0, 0, 1, 1, 0],
                        scale: [0.5, 0.5, 1.1, 1, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-32 h-40 bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-400 rounded-lg flex flex-col items-center justify-center p-4 shadow-md z-10"
                >
                    <FileSignature className="w-10 h-10 text-purple-600 mb-2" />
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 text-center">Nuovo<br />Contratto<br />(Pittura Casa)</span>
                </motion.div>
            </div>
            <p className="text-sm text-center text-neutral-500 font-medium">L'obbligazione originaria viene estinta e sostituita da una nuova, diversa per oggetto o titolo.</p>
        </motion.div>
    )
}

function Remissione() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-sm"
        >
            <div className="flex justify-between w-full mb-8 relative items-center h-32">
                <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full border-2 border-emerald-500 shadow flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Creditore</span>
                </div>

                {/* Debt paper flying to trash */}
                <motion.div
                    initial={{ x: 120, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                    animate={{
                        x: [120, 60, 0],
                        y: [0, -20, 20],
                        scale: [1, 0.8, 0],
                        rotate: [0, -45, -90],
                        opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute top-8 w-12 h-16 bg-red-50 border border-red-200 rounded text-red-500 flex items-center justify-center shadow-sm"
                >
                    <span className="text-[10px] font-bold">DEBITO</span>
                </motion.div>

                {/* Trash Can appearing from Creditor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute left-6 top-8 w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center"
                >
                    <Trash2 className="w-6 h-6 text-neutral-500" />
                </motion.div>


                <div className="flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full border-2 border-red-300 shadow flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-red-400" />
                    </div>
                    <span className="text-xs font-bold text-red-500">Debitore</span>
                </div>
            </div>
            <p className="text-sm text-center text-neutral-500 font-medium">Il creditore comunica al debitore di non volere più la prestazione. Il debito è cancellato.</p>
        </motion.div>
    )
}

function Confusione() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="relative w-64 h-32 flex items-center justify-center mb-8">
                {/* Person 1 (Creditor) */}
                <motion.div
                    animate={{ x: [-60, 0, 0, -60], opacity: [1, 0, 0, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-16 h-16 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-lg z-10"
                >
                    <User className="w-8 h-8 text-emerald-600" />
                </motion.div>

                {/* Person 2 (Debtor) */}
                <motion.div
                    animate={{ x: [60, 0, 0, 60], opacity: [1, 0, 0, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-16 h-16 bg-red-100 border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg z-10"
                >
                    <User className="w-8 h-8 text-red-600" />
                </motion.div>

                {/* Merged Person */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-20 h-20 bg-amber-100 border-4 border-amber-500 rounded-full flex items-center justify-center shadow-xl z-20"
                >
                    <Users className="w-10 h-10 text-amber-600" />
                </motion.div>
            </div>
            <p className="text-sm text-center text-neutral-500 font-medium max-w-xs">Quando le qualità di creditore e debitore si riuniscono nella stessa persona (es. per eredità o fusione aziendale).</p>
        </motion.div>
    )
}
