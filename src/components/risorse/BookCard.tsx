"use client";

import React, { useState } from "react";
import { Book as BookType, LivelloLettura } from "@/content/risorse";
import { BookOpen, ExternalLink } from "lucide-react";

export function BookCard({ book }: { book: BookType }) {
    const levelColors = {
        principiante: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        intermedio: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
        avanzato: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800"
    };

    const LevelIcon = ({ level }: { level: LivelloLettura }) => {
        if (level === "principiante") return <span className="mr-1">🟢</span>;
        if (level === "intermedio") return <span className="mr-1">🟡</span>;
        return <span className="mr-1">🔴</span>;
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-white leading-tight">
                    {book.title}
                </h3>
            </div>

            <div className="mb-4">
                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {book.author}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {book.publisher}
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${levelColors[book.level]}`}>
                        <LevelIcon level={book.level} />
                        <span className="capitalize">{book.level}</span>
                    </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
                    {book.note}
                </p>
                {book.url && (
                    <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Trova online <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
    );
}
