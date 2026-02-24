"use client";

import { Handle, Position, NodeProps } from '@xyflow/react';
import { CustomNodeData } from '@/lib/content/mapData';
import { cn } from '@/lib/utils';
import {
    Landmark, FileText, Briefcase, Map, Settings, Users,
    Gavel, Building, Scale, Globe, ChevronRight, Check
} from 'lucide-react';

const iconMap: Record<string, any> = {
    landmark: Landmark,
    'file-text': FileText,
    briefcase: Briefcase,
    map: Map,
    settings: Settings,
    users: Users,
    gavel: Gavel,
    building: Building,
    scale: Scale,
    globe: Globe,
};

export function CustomNode({ data }: NodeProps) {
    const nodeData = data as CustomNodeData;
    const Icon = nodeData.icon ? iconMap[nodeData.icon] || Landmark : Landmark;

    const colorClasses = {
        primary: "border-indigo-500 dark:border-indigo-500",
        secondary: "border-teal-500 dark:border-teal-500",
        accent: "border-amber-500 dark:border-amber-500",
        neutral: "border-neutral-400 dark:border-neutral-600",
    };

    const iconColorClasses = {
        primary: "text-indigo-600 dark:text-indigo-400",
        secondary: "text-teal-600 dark:text-teal-400",
        accent: "text-amber-600 dark:text-amber-400",
        neutral: "text-neutral-600 dark:text-neutral-400",
    }

    const buttonColorClasses = {
        primary: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
        secondary: "bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300",
        accent: "bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300",
        neutral: "bg-neutral-100 dark:bg-neutral-500/15 text-neutral-700 dark:text-neutral-300",
    }

    const theme = nodeData.color || 'neutral';

    return (
        <div className={cn(
            "p-3.5 shadow-md rounded-xl border-2 min-w-[220px] max-w-[280px] transition-all group relative",
            "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white",
            nodeData.link ? "hover:scale-[1.02] cursor-pointer hover:shadow-xl active:scale-95" : "opacity-95",
            colorClasses[theme],
            nodeData.completed && "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-neutral-950 border-emerald-500/50"
        )}>
            {nodeData.completed && (
                <div className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-white rounded-full p-1 shadow-sm border-2 border-white dark:border-neutral-900 z-10 transition-transform hover:scale-110">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
            )}

            {/* Top Handle for incoming connections */}
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-neutral-300 border-2 border-white dark:border-black" />

            <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0")}>
                    <Icon className={cn("w-5 h-5", iconColorClasses[theme])} />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-[13px] tracking-tight leading-snug">{nodeData.label}</div>
                    {nodeData.description && (
                        <div className="text-[11px] mt-1 text-neutral-500 dark:text-neutral-400 leading-tight">
                            {nodeData.description}
                        </div>
                    )}
                    {nodeData.link && (
                        <div className={cn(
                            "mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase opacity-90 group-hover:opacity-100 transition-opacity px-2 py-1 rounded",
                            buttonColorClasses[theme]
                        )}>
                            <span>Apri Contenuto</span>
                            <ChevronRight className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Handle for outgoing connections */}
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-neutral-300 border-2 border-white dark:border-black" />
        </div>
    );
}
