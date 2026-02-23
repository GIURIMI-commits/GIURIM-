"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Key, Hand, Brain, Ban, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
    {
        id: "proprieta",
        title: "Proprietà (Diritto Pieno)",
        icon: Crown,
        desc: "Hai il titolo formale. Eccoti lo 'Ius utendi', 'fruendi' e 'abutendi'.",
        color: "text-amber-600 dark:text-amber-400",
        bgIcon: "bg-amber-100 dark:bg-amber-900/30",
        tabColor: "data-[active=true]:bg-amber-50 data-[active=true]:border-amber-500 dark:data-[active=true]:bg-amber-900/20"
    },
    {
        id: "possesso",
        title: "Possesso (Fatto)",
        icon: Key,
        desc: "Hai il bene materialmente in mano e ti comporti come se fosse tuo.",
        color: "text-purple-600 dark:text-purple-400",
        bgIcon: "bg-purple-100 dark:bg-purple-900/30",
        tabColor: "data-[active=true]:bg-purple-50 data-[active=true]:border-purple-500 dark:data-[active=true]:bg-purple-900/20"
    },
    {
        id: "detenzione",
        title: "Detenzione (Fatto limitato)",
        icon: Hand,
        desc: "Usi la cosa, ma riconosci che il vero padrone è un altro.",
        color: "text-blue-600 dark:text-blue-400",
        bgIcon: "bg-blue-100 dark:bg-blue-900/30",
        tabColor: "data-[active=true]:bg-blue-50 data-[active=true]:border-blue-500 dark:data-[active=true]:bg-blue-900/20"
    }
];

export function AnimatedProprietaPossesso() {
    const [activeTab, setActiveTab] = useState(roles[0].id);

    return (
        <div className="w-full max-w-4xl mx-auto my-12 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm flex flex-col md:flex-row">

            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                {roles.map((r) => (
                    <button
                        key={r.id}
                        data-active={activeTab === r.id}
                        onClick={() => setActiveTab(r.id)}
                        className={cn(
                            "flex items-start gap-3 p-4 text-left border-l-4 border-transparent transition-all",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                            activeTab !== r.id && "opacity-70",
                            r.tabColor
                        )}
                    >
                        <div className={cn("p-2 rounded-lg flex-shrink-0 mt-1", r.bgIcon, r.color)}>
                            <r.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className={cn("font-bold text-sm", activeTab === r.id ? r.color : "text-neutral-700 dark:text-neutral-300")}>
                                {r.title}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                                {r.desc}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Animation Viewer */}
            <div className="w-full md:w-2/3 p-8 flex items-center justify-center min-h-[350px] bg-neutral-50/30 dark:bg-neutral-900/10 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === "proprieta" && <Proprieta key="prop" />}
                    {activeTab === "possesso" && <Possesso key="poss" />}
                    {activeTab === "detenzione" && <Detenzione key="det" />}
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- Specific Animations ---

function Proprieta() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">

                {/* Il Certificato / Il Titolo */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="absolute w-32 h-40 bg-amber-50 border-2 border-amber-400 rounded-lg shadow-xl flex flex-col items-center p-4 z-20"
                >
                    <Crown className="w-12 h-12 text-amber-500 mb-2 mt-2" />
                    <div className="w-16 h-1 bg-amber-300 rounded mb-1"></div>
                    <div className="w-20 h-1 bg-amber-300 rounded mb-1"></div>
                    <div className="w-12 h-1 bg-amber-300 rounded"></div>
                    <span className="text-[10px] font-bold text-amber-700 mt-auto uppercase tracking-wider">Titolo<br />Ufficiale</span>
                </motion.div>

                {/* Poteri orbitanti */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-56 h-56 rounded-full border border-amber-200 border-dashed z-10"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded text-[10px] font-bold text-amber-600 border border-amber-200">Usare</div>
                    <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-[10px] font-bold text-amber-600 border border-amber-200">Godere Frutti</div>
                    <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-[10px] font-bold text-amber-600 border border-amber-200">Alienare (Vendere)</div>
                </motion.div>

            </div>
            <p className="text-sm text-center text-neutral-500 font-medium">È il diritto "pieno". Non importa chi abbia materialmente il bene in mano, il proprietario ha l'Atto Ufficiale.</p>
        </motion.div>
    )
}

function Possesso() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="flex gap-8 mb-8 mt-4">

                {/* Corpus (Disponibilità Materiale) */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 bg-white border-2 border-purple-300 rounded-2xl shadow-md flex items-center justify-center mb-2 relative"
                    >
                        <Hand className="w-10 h-10 text-purple-500" />
                        <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center border border-purple-200 shadow-sm"
                        >
                            <Key className="w-4 h-4 text-purple-600" />
                        </motion.div>
                    </motion.div>
                    <span className="font-bold text-purple-700 text-sm">Corpus</span>
                    <span className="text-[10px] text-neutral-500">Potere di fatto</span>
                </div>

                <div className="flex items-center justify-center pt-8">
                    <span className="text-2xl text-neutral-300 font-bold">+</span>
                </div>

                {/* Animus (Intenzione) */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-24 bg-white border-2 border-purple-300 rounded-2xl shadow-md flex items-center justify-center mb-2 relative"
                    >
                        <Brain className="w-10 h-10 text-purple-500" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center border border-amber-200 shadow-sm"
                        >
                            <Crown className="w-4 h-4 text-amber-500" />
                        </motion.div>
                    </motion.div>
                    <span className="font-bold text-purple-700 text-sm">Animus</span>
                    <span className="text-[10px] text-neutral-500">Mi comporto da padrone</span>
                </div>

            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm"
            >
                = Situazione di Fatto Protetta (Art. 1140)
            </motion.div>

        </motion.div>
    )
}

function Detenzione() {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full"
        >
            <div className="flex gap-8 mb-8 mt-4">

                {/* Corpus (Presente) */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white border-2 border-blue-300 rounded-2xl shadow-md flex items-center justify-center mb-2 relative">
                        <Hand className="w-10 h-10 text-blue-500" />
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200 shadow-sm">
                            <Key className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                    <span className="font-bold text-blue-700 text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Corpus</span>
                    <span className="text-[10px] text-neutral-500 text-center leading-tight mt-1">Ho in mano<br />le chiavi</span>
                </div>

                <div className="flex items-center justify-center pt-8">
                    <span className="text-2xl text-neutral-300 font-bold">+</span>
                </div>

                {/* Animus (Assente/Rifiutato) */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-neutral-100 border-2 border-neutral-300 rounded-2xl shadow-inner flex items-center justify-center mb-2 relative opacity-50">
                        <Brain className="w-10 h-10 text-neutral-400" />
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center border border-red-200 shadow-sm">
                            <Crown className="w-4 h-4 text-neutral-400" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute inset-0 flex items-center justify-center text-red-600"
                            >
                                <Ban className="w-8 h-8" strokeWidth={3} />
                            </motion.div>
                        </div>
                    </div>
                    <span className="font-bold text-neutral-500 text-sm flex items-center gap-1"><Ban className="w-4 h-4 text-red-500" /> No Animus</span>
                    <span className="text-[10px] text-neutral-500 text-center leading-tight mt-1">So che il padrone<br />è un altro</span>
                </div>

            </div>

            <p className="text-sm text-center text-neutral-500 font-medium">Esempio: L'inquilino o chi prende in prestito un'auto.<br />Usa la cosa (Corpus) ma riconosce il diritto altrui (Niente Animus).</p>

        </motion.div>
    )
}
