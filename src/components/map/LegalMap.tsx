"use client";

import { useCallback } from 'react';
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

const nodeTypes = {
    custom: CustomNode,
};

export function LegalMap() {
    const router = useRouter();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
                <Controls showInteractive={false} className="dark:bg-neutral-900 dark:border-neutral-800 dark:fill-white" />
                <MiniMap
                    nodeStrokeWidth={3}
                    zoomable
                    pannable
                    className="dark:bg-neutral-900 dark:border-neutral-800"
                    nodeColor={(n) => {
                        const data = n.data as CustomNodeData;
                        if (data.color === 'accent') return '#fbbf24';
                        if (data.color === 'primary') return '#818cf8';
                        if (data.color === 'secondary') return '#2dd4bf';
                        return '#a3a3a3';
                    }}
                />

                <Panel position="top-left" className="m-4 max-w-xs md:max-w-sm">
                    <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800">
                        <h2 className="font-serif font-bold text-lg mb-1">Guida alla Mappa</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                            L'ordinamento giuridico è piramidale. <strong className="text-neutral-900 dark:text-white font-semibold">Trascina</strong> la mappa per esplorare e usa la <strong className="text-neutral-900 dark:text-white font-semibold">rotellina</strong> per lo zoom.
                        </p>
                        <div className="flex gap-2">
                            <span className="inline-flex w-full justify-center items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[13px] font-semibold shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                                <MousePointer2 className="w-4 h-4" />
                                Fai clic sulle schede per aprirle!
                            </span>
                        </div>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}
