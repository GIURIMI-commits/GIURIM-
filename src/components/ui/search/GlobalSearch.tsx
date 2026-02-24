import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { Search, Book, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/Modal';

export type SearchResult = {
    id: string;
    type: 'lesson' | 'glossary';
    title: string;
    description: string;
    url: string;
    area?: string;
    module?: string;
};

interface GlobalSearchProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchResult[]>([]);
    const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if (open && index.length === 0) {
            setLoading(true);
            fetch('/api/search')
                .then(res => res.json())
                .then(data => {
                    const searchData = data.index || [];
                    setIndex(searchData);
                    setFuse(new Fuse(searchData, {
                        keys: [
                            { name: 'title', weight: 3 },
                            { name: 'description', weight: 2 },
                            { name: 'area', weight: 1 },
                            { name: 'module', weight: 1 }
                        ],
                        threshold: 0.3,
                        includeMatches: true
                    }));
                })
                .catch(err => console.error("Failed to load search index", err))
                .finally(() => setLoading(false));
        }
    }, [open, index.length]);

    useEffect(() => {
        if (fuse && query) {
            const fuseResults = fuse.search(query).map(r => r.item);
            setResults(fuseResults.slice(0, 10)); // limit to top 10
        } else if (!query) {
            setResults([]);
        }
    }, [query, fuse]);

    const handleSelect = useCallback((url: string) => {
        onOpenChange(false);
        router.push(url);
    }, [onOpenChange, router]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl sm:rounded-2xl">
                {/* Adding DialogTitle to resolve the warning */}
                <DialogTitle className="sr-only">Ricerca Globale</DialogTitle>
                <DialogDescription className="sr-only">Cerca lezioni, termini o argomenti.</DialogDescription>

                <Command
                    className="flex h-full w-full flex-col overflow-hidden bg-transparent"
                    shouldFilter={false} // We use fuse.js for filtering
                    value="" // Optional, manage selected item if needed
                >
                    <div className="flex items-center border-b px-4">
                        <Search className="mr-3 h-5 w-5 opacity-50 text-muted-foreground" />
                        <Command.Input
                            value={query}
                            onValueChange={setQuery}
                            className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                            placeholder="Cerca lezioni, glossario, argomenti..."
                            autoFocus
                        />
                        {loading && <div className="animate-spin text-primary opacity-50 h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />}
                    </div>

                    <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-muted">
                        <Command.Empty className="py-14 text-center text-sm">
                            {loading ? (
                                <span className="text-muted-foreground">Caricamento indice di ricerca...</span>
                            ) : query ? (
                                <span className="text-muted-foreground">Nessun risultato trovato per "{query}"</span>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-70">
                                    <Search className="h-8 w-8 mb-2 opacity-50" />
                                    <p>Inizia a digitare per cercare.</p>
                                    <p className="text-xs">Prova con "Licenziamento" o "Costituzione"</p>
                                </div>
                            )}
                        </Command.Empty>

                        {results.length > 0 && (
                            <Command.Group heading="Risultati" className="text-xs font-medium text-muted-foreground mb-1 px-2 pt-2 pb-1">
                                {results.map((result) => (
                                    <Command.Item
                                        key={result.id}
                                        value={result.id}
                                        onSelect={() => handleSelect(result.url)}
                                        className="flex flex-col gap-1 rounded-xl px-4 py-3 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                {result.type === 'lesson' ? <FileText className="h-4 w-4" /> : <Book className="h-4 w-4" />}
                                            </div>
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <span className="font-semibold text-foreground truncate">{result.title}</span>
                                                <span className="text-xs text-muted-foreground truncate">{result.description}</span>
                                            </div>
                                            <div className="hidden sm:block">
                                                <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground uppercase tracking-wider">
                                                    {result.type === 'lesson' ? 'Lezione' : 'Glossario'}
                                                </span>
                                            </div>
                                        </div>
                                        {result.type === 'lesson' && result.area && (
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1 ml-11">
                                                <span>{result.area}</span>
                                                {result.module && (
                                                    <>
                                                        <span className="opacity-50">•</span>
                                                        <span className="truncate">{result.module}</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        )}
                    </Command.List>
                    <div className="border-t p-3 text-xs text-muted-foreground/60 flex justify-between items-center bg-muted/20">
                        <span>
                            <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-background border border-border mr-1 shadow-sm">↑</kbd>
                            <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-background border border-border mr-2 shadow-sm">↓</kbd>
                            per navigare
                        </span>
                        <span>
                            <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-background border border-border mr-1 shadow-sm">Invio</kbd>
                            per selezionare
                        </span>
                        <span className="hidden sm:inline">
                            <kbd className="font-sans px-1.5 py-0.5 rounded-md bg-background border border-border mr-1 shadow-sm">Esc</kbd>
                            per chiudere
                        </span>
                    </div>
                </Command>
            </DialogContent>
        </Dialog>
    );
}

