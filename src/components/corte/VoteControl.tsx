
"use client";

import { useState } from "react";
import { vote } from "@/lib/corte/actions";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteControlProps {
    targetId: string;
    targetType: "thread" | "comment";
    initialScore: number;
    initialVote?: number; // 1, -1, or 0/undefined
    orientation?: "vertical" | "horizontal";
}

export function VoteControl({
    targetId,
    targetType,
    initialScore,
    initialVote = 0,
    orientation = "vertical"
}: VoteControlProps) {
    const [score, setScore] = useState(initialScore);
    const [userVote, setUserVote] = useState(initialVote);
    const [loading, setLoading] = useState(false);

    const handleVote = async (value: 1 | -1) => {
        if (loading) return;

        // Optimistic update
        const previousVote = userVote;
        const previousScore = score;
        let newVote: number = value;
        let newScore = score;

        if (userVote === value) {
            // Toggle off (remove vote)
            newVote = 0;
            newScore = score - value; // subtract 1 or -1
        } else {
            // Change vote (e.g. from -1 to 1 means +2) or new vote
            const diff = value - userVote;
            newScore = score + diff;
        }

        setUserVote(newVote);
        setScore(newScore);
        setLoading(true);

        // Server call
        // We now support 0 to remove vote in the server action.
        const result = await vote(targetType, targetId, newVote as 0 | 1 | -1);

        setLoading(false);

        if (result?.error) {
            // Revert
            setUserVote(previousVote);
            setScore(previousScore);
        }
    };

    return (
        <div className={cn(
            "flex items-center gap-1",
            orientation === "vertical" ? "flex-col" : "flex-row"
        )} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVote(1); }}
                className={cn(
                    "p-1 rounded hover:bg-muted/50 transition-colors",
                    userVote === 1 ? "text-orange-500 bg-orange-500/10" : "text-muted-foreground"
                )}
                disabled={loading}
            >
                <ArrowBigUp className={cn("h-6 w-6", userVote === 1 && "fill-current")} />
            </button>

            <span className={cn(
                "font-bold text-sm min-w-[1.5ch] text-center",
                userVote === 1 ? "text-orange-500" :
                    userVote === -1 ? "text-indigo-500" : "text-foreground"
            )}>
                {score}
            </span>

            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVote(-1); }}
                className={cn(
                    "p-1 rounded hover:bg-muted/50 transition-colors",
                    userVote === -1 ? "text-indigo-500 bg-indigo-500/10" : "text-muted-foreground"
                )}
                disabled={loading}
            >
                <ArrowBigDown className={cn("h-6 w-6", userVote === -1 && "fill-current")} />
            </button>
        </div>
    );
}
