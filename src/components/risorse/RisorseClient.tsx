"use client";

import { useState } from "react";
import { AreaMeta } from "@/types/content";
import { Book, freeResources, LivelloLettura } from "@/content/risorse";
import { LevelFilter } from "@/components/risorse/LevelFilter";
import { AreaResourceSection } from "@/components/risorse/AreaResourceSection";
import { ExternalLink, Library } from "lucide-react";

interface RisorseClientProps {
    areas: AreaMeta[];
    allBooks: Book[];
}

export function RisorseClient({ areas, allBooks }: RisorseClientProps) {
    const [selectedLevel, setSelectedLevel] = useState<LivelloLettura | "tutti">("tutti");

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <Library className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-serif font-extrabold text-neutral-900 dark:text-white">
                        Risorse e Letture
                    </h1>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                    Sia che tu stia partendo da zero, che stia preparando un esame universitario o che tu voglia strumenti professionali,
                    qui trovi i riferimenti bibliografici e le risorse essenziali divisi per Area e Livello di difficoltà.
                </p>
            </header>

            {/* In-page filter */}
            <LevelFilter selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />

            <div className="mt-8 space-y-12">
                {/* Render one section per area */}
                {areas.map(area => {
                    const areaBooks = allBooks.filter(b => b.area === area.slug);
                    if (areaBooks.length === 0) return null;
                    return (
                        <AreaResourceSection
                            key={area.slug}
                            areaId={area.slug}
                            areaTitle={area.title}
                            books={areaBooks}
                            selectedLevel={selectedLevel}
                        />
                    );
                })}
            </div>

            {/* Free Resources Section (at the end) */}
            <section className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-6">
                    Risorse Online Gratuite
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {freeResources.map((res, idx) => (
                        <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all group block"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {res.name}
                                </h3>
                                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-500" />
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                {res.description}
                            </p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
