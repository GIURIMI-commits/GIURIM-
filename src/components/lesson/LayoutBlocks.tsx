import { cn } from "@/lib/utils";
import React from "react";

// --- Layout Grid ---

export function Row({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 my-8", className)}>
            {children}
        </div>
    );
}

export function Col({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    );
}

// --- Visual Elements ---

export function Highlight({ children, color = "yellow" }: { children: React.ReactNode; color?: "yellow" | "blue" | "green" | "red" | "purple" }) {
    const colors = {
        yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200",
        blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
        green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
        red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200",
        purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
    };

    return (
        <span className={cn("px-1.5 py-0.5 rounded font-medium mx-0.5", colors[color] || colors.yellow)}>
            {children}
        </span>
    );
}

export function CardBlock({ children, title, className }: { children: React.ReactNode; title?: string; className?: string }) {
    return (
        <div className={cn("p-6 rounded-xl border bg-card text-card-foreground shadow-sm", className)}>
            {title && <h4 className="font-semibold text-lg mb-3">{title}</h4>}
            <div className="text-sm leading-relaxed text-muted-foreground">
                {children}
            </div>
        </div>
    );
}

export function Steps({ children }: { children: React.ReactNode }) {
    // This expects <Step> children or Li
    return (
        <div className="space-y-4 my-8 pl-2">
            {children}
        </div>
    );
}

export function Step({ number, title, children }: { number: string | number; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-neutral-950">
                {number}
            </div>
            <div>
                <h5 className="font-bold text-base mb-1">{title}</h5>
                <div className="text-muted-foreground text-sm">{children}</div>
            </div>
        </div>
    );
}
