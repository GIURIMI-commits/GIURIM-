"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, Briefcase, ShieldAlert, Crosshair, AlertOctagon, X } from "lucide-react";
import { cn } from "@/lib/utils";

const scriminanti = [
    {
        id: "consenso",
        art: "Art. 50 c.p.",
        title: "Consenso dell'avente diritto",
        icon: Handshake,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        border: "border-emerald-200 dark:border-emerald-800",
        desc: "Non c'è reato se chi ha il diritto disponibile accetta la lesione.",
        details: "Il consenso deve essere valido, prestato prima o durante il fatto, e deve riguardare diritti 'disponibili' (non la vita!).",
        example: "Consentire al chirurgo di amputare un arto malato per salvare la vita del paziente."
    },
    {
        id: "dovere",
        art: "Art. 51 c.p.",
        title: "Esercizio di un Diritto / Dovere",
        icon: Briefcase,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        border: "border-blue-200 dark:border-blue-800",
        desc: "Se agisci nell'esercizio di un diritto o compiendo un dovere imposto da una norma.",
        details: "L'adempimento di un dovere (es. ordine dell'Autorità) o l'uso di un diritto esclude la punibilità perché la legge stesa lo impone.",
        example: "Il poliziotto che esegue un ordine di arresto o il giornalista che esercita il diritto di cronaca (se veritiera e pertinente)."
    },
    {
        id: "difesa",
        art: "Art. 52 c.p.",
        title: "Legittima Difesa",
        icon: ShieldAlert,
        color: "text-rose-500",
        bg: "bg-rose-100 dark:bg-rose-900/30",
        border: "border-rose-200 dark:border-rose-800",
        desc: "Reazione proporzionata e necessaria contro un pericolo attuale.",
        details: "Non è un 'liberi tutti'. Serve un pericolo attuale di offesa ingiusta. La reazione deve essere indispensabile e proporzionata.",
        example: "Respingere fisicamente un malintenzionato che ti sta aggredendo in quel momento per strada."
    },
    {
        id: "armi",
        art: "Art. 53 c.p.",
        title: "Uso Legittimo delle Armi",
        icon: Crosshair,
        color: "text-amber-500",
        bg: "bg-amber-100 dark:bg-amber-900/30",
        border: "border-amber-200 dark:border-amber-800",
        desc: "Vale per il pubblico ufficiale costretto a usare armi.",
        details: "Serve per respingere una violenza o vincere una resistenza attiva ad un'attività dell'Autorità. Esiste un fortissimo requisito di proporzionalità.",
        example: "Le Forze dell'Ordine che sparano per fermare un terrorista armato in fuga."
    },
    {
        id: "necessita",
        art: "Art. 54 c.p.",
        title: "Stato di Necessità",
        icon: AlertOctagon,
        color: "text-purple-500",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        border: "border-purple-200 dark:border-purple-800",
        desc: "Fatto commesso per salvare sé o altri dal pericolo attuale di grave danno.",
        details: "A differenza della legittima difesa, il pericolo non deriva quasi mai da un'aggressione del soggetto che subisce la tua condotta.",
        example: "Rompere il finestrino di un'auto per salvare un cane o un bambino rimasto chiuso sotto il sole."
    }
];

export function AnimatedScriminanti() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="my-12">
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Le 5 Cause di Giustificazione (Scriminanti)
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-lg mx-auto">
                    Seleziona una carta per scoprire in quali contesti l'ordinamento "spegne" l'antigiuridicità di un fatto descritto dalla legge come reato.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {scriminanti.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                            "cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:scale-105",
                            item.bg,
                            item.border
                        )}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-xs font-semibold px-2 py-1 rounded-md bg-white/60 dark:bg-black/20 text-neutral-700 dark:text-neutral-300">
                                {item.art}
                            </span>
                            <item.icon className={cn("w-6 h-6", item.color)} />
                        </div>
                        <h4 className="font-bold text-lg leading-tight text-neutral-900 dark:text-white mb-2">
                            {item.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Modal */}
            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40"
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className={cn(
                                    "pointer-events-auto w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-2xl border",
                                    scriminanti.find(s => s.id === selectedId)?.border
                                )}
                            >
                                {scriminanti.map((item) => {
                                    if (item.id !== selectedId) return null;
                                    return (
                                        <div key={item.id} className="relative">
                                            <button
                                                onClick={() => setSelectedId(null)}
                                                className="absolute top-0 right-0 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={cn("p-3 rounded-xl", item.bg)}>
                                                    <item.icon className={cn("w-8 h-8", item.color)} />
                                                </div>
                                                <div>
                                                    <span className="font-mono text-xs font-semibold text-neutral-500">{item.art}</span>
                                                    <h3 className="font-bold text-xl text-neutral-900 dark:text-white leading-tight">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-6 border-l-2 pl-3 border-neutral-200 dark:border-neutral-800 font-medium">
                                                {item.desc}
                                            </p>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">Cosa comporta davvero</h4>
                                                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                                        {item.details}
                                                    </p>
                                                </div>

                                                <div className={cn("p-4 rounded-xl", item.bg, item.border, "border-l-4")}>
                                                    <h4 className={cn("text-xs uppercase tracking-widest font-bold mb-1", item.color)}>Esempio Pratico</h4>
                                                    <p className="text-sm text-neutral-800 dark:text-neutral-200 italic">
                                                        "{item.example}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
