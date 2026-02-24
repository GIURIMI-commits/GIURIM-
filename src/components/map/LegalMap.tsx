"use client";

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    NodeMouseHandler,
    Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges, CustomNodeData } from '@/lib/content/mapData';
import { CustomNode } from './CustomNode';
import { Button } from '@/components/ui/Button';
import { Maximize2, MousePointer2 } from 'lucide-react';

import { AreaMeta } from '@/types/content';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const nodeTypes = {
    custom: CustomNode,
};

export function LegalMap({ curriculum }: { curriculum: AreaMeta[] }) {
    const router = useRouter();
    const { isCompleted, progressMap, getGlobalStats } = useCourseProgress(curriculum);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Calculate global stats for the panel
    const { completed, total } = getGlobalStats();

    // Update nodes with completion status when progress map loads or updates
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    completed: node.data.link ? isCompleted(node.data.link as string) : false,
                },
            }))
        );
    }, [progressMap, isCompleted, setNodes]);

    const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
        const data = node.data as CustomNodeData;
        if (data.link) {
            router.push(data.link);
        }
    }, [router]);

    return (
        <div className="w-full h-full min-h-[600px] border rounded-2xl overflow-hidden bg-neutral-50/50 dark:bg-neutral-950 shadow-sm relative relative-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.2}
                maxZoom={2}
                className="dark:bg-neutral-950"
            >
                <Background color="#ababab" gap={16} size={1} />
                <Controls
                    showInteractive={false}
                    className="shadow-xl rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 [&>button]:!bg-transparent [&>button]:!border-neutral-200 dark:[&>button]:!border-neutral-700 dark:[&>button_svg]:!fill-neutral-300 hover:[&>button]:!bg-neutral-100 dark:hover:[&>button]:!bg-neutral-800 transition-colors"
                />
                <MiniMap
                    nodeStrokeWidth={3}
                    zoomable
                    pannable
                    maskColor="var(--minimap-mask, rgba(0,0,0,0.15))"
                    className="hidden md:block shadow-xl rounded-xl border border-neutral-200 dark:border-neutral-700 !bg-white dark:!bg-neutral-900 transition-colors"
                    nodeColor={(n) => {
                        const data = n.data as CustomNodeData;
                        if (data.color === 'accent') return '#fbbf24';
                        if (data.color === 'primary') return '#818cf8';
                        if (data.color === 'secondary') return '#2dd4bf';
                        return '#a3a3a3';
                    }}
                />

                <Panel position="top-left" className="m-4 max-w-xs md:max-w-sm">
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h2 className="font-serif font-bold text-lg">Guida alla Mappa</h2>
                                <div className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                                    {completed} su {total}
                                </div>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                                L'ordinamento giuridico è piramidale. <strong className="text-neutral-900 dark:text-white font-semibold">Trascina</strong> la mappa per esplorare e usa la <strong className="text-neutral-900 dark:text-white font-semibold">rotellina</strong> per lo zoom.
                            </p>
                            <span className="inline-flex w-full justify-center items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[13px] font-semibold shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                                <MousePointer2 className="w-4 h-4" />
                                Fai clic sulle schede per aprirle!
                            </span>
                        </div>

                        {/* Legend */}
                        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-x-4 gap-y-2 mt-1">
                            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                Costituzionale / Supremo
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                                Aree Disciplinari / Civile / Penale
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                                Processi / Giudiziario
                            </div>
                        </div>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}
