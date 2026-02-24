"use client";

import { Handle, Position, NodeProps } from '@xyflow/react';
import { CustomNodeData } from '@/lib/content/mapData';
import { cn } from '@/lib/utils';
import {
    Landmark, FileText, Briefcase, Map, Settings, Users,
    Gavel, Building, Scale, Globe, ChevronRight
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
        primary: "border-indigo-400 dark:border-indigo-600 bg-white dark:bg-neutral-900 text-indigo-800 dark:text-indigo-200",
        secondary: "border-teal-400 dark:border-teal-600 bg-white dark:bg-neutral-900 text-teal-800 dark:text-teal-200",
        accent: "border-amber-400 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 font-bold",
        neutral: "border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300",
    };

    const iconColorClasses = {
        primary: "text-indigo-500",
        secondary: "text-teal-500",
        accent: "text-amber-500",
        neutral: "text-neutral-500",
    }

    const theme = nodeData.color || 'neutral';

    return (
        <div className={cn(
            "p-3.5 shadow-md rounded-xl border-2 min-w-[220px] max-w-[280px] transition-all group",
            nodeData.link ? "hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer hover:-translate-y-1 hover:shadow-xl active:scale-95" : "opacity-90",
            colorClasses[theme]
        )}>
            {/* Top Handle for incoming connections */}
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-neutral-300 border-2 border-white dark:border-black" />

            <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex-shrink-0")}>
                    <Icon className={cn("w-5 h-5", iconColorClasses[theme])} />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-[13px] tracking-tight leading-snug">{nodeData.label}</div>
                    {nodeData.description && (
                        <div className="text-[11px] mt-1 opacity-75 leading-tight">
                            {nodeData.description}
                        </div>
                    )}
                    {nodeData.link && (
                        <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 opacity-90 group-hover:opacity-100 transition-opacity bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
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
