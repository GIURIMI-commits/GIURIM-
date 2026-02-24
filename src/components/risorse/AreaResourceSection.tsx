"use client";

import { Book as BookType, LivelloLettura } from "@/content/risorse";
import { BookCard } from "./BookCard";
import { BookOpen } from "lucide-react";

interface AreaResourceSectionProps {
    areaId: string;
    areaTitle: string;
    books: BookType[];
    selectedLevel: LivelloLettura | "tutti";
}

export function AreaResourceSection({ areaTitle, books, selectedLevel }: AreaResourceSectionProps) {
    // Filter books based on the selected level
    const filteredBooks = selectedLevel === "tutti"
        ? books
        : books.filter(b => b.level === selectedLevel);

    if (filteredBooks.length === 0) return null;

    return (
        <section className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">
                    {areaTitle}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, idx) => (
                    <BookCard key={`${book.title}-${idx}`} book={book} />
                ))}
            </div>
        </section>
    );
}
