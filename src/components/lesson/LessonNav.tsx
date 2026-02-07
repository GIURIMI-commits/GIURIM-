import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LessonNavProps {
    prevSlug?: string | null;
    nextSlug?: string | null;
    areaSlug: string;
    moduleSlug: string;
}

export function LessonNav({ prevSlug, nextSlug, areaSlug, moduleSlug }: LessonNavProps) {
    // Logic to build hrefs
    // Assumes structure /learn/[area]/[module]/[lesson]
    // Ideally we should look up if prev/next are in same module or cross-module.
    // For MVP scaffold, assumes same module or full path in slug?
    // Actually content loader returns next_lesson slug. We probably need to know its module too if it changes.
    // BUT: for MVP, let's assume next_lesson is just the slug. 
    // We need to find where it lives or pass the full URL.
    // Simplification: In this scaffold, let's assume valid relative navigation if in same module,
    // or simple slug navigation if we handle routing by slug globally or by context.
    // Given structure /learn/[area]/[module]/[lesson], we need area/module.

    // NOTE: This implementation assumes navigation within the same module for simplicity
    // or that the parent component resolves the full path.
    // Let's rely on parent passing full paths or handled logic. 
    // Wait, the props are just slugs.

    // Quick fix: user standard path construction.
    const baseUrl = `/learn/${areaSlug}/${moduleSlug}`;

    return (
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
            {prevSlug ? (
                <Link href={`${baseUrl}/${prevSlug}`}>
                    <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="h-4 w-4" />
                        Lezione Precedente
                    </Button>
                </Link>
            ) : (
                <div />
            )}

            {nextSlug ? (
                <Link href={`${baseUrl}/${nextSlug}`}>
                    <Button className="gap-2 pr-0 hover:pr-2 transition-all">
                        Lezione Successiva
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            ) : (
                <Link href={`/learn/${areaSlug}`}>
                    <Button variant="outline">Torna all'Area</Button>
                </Link>
            )}
        </div>
    );
}
