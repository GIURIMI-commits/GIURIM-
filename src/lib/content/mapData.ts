import { Node, Edge } from '@xyflow/react';

export type CustomNodeData = {
    label: string;
    description?: string;
    icon?: string;
    link?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'neutral';
    completed?: boolean;
};

export const initialNodes: Node<CustomNodeData>[] = [
    // --- VERTICE (FONTI SUPREME E INTERNAZIONALI) ---
    {
        id: 'costituzione',
        type: 'custom',
        position: { x: 500, y: 50 },
        data: {
            label: 'Costituzione Italiana',
            description: 'La legge fondamentale dello Stato (1948).',
            icon: 'landmark',
            link: '/learn/area-2-costituzionale/mod-2.1-costituzione-italiana/lez-2.1.1-cos-e-la-costituzione-e-come-e-nata',
            color: 'accent'
        }
    },
    {
        id: 'diritto-ue',
        type: 'custom',
        position: { x: 800, y: 50 },
        data: {
            label: 'Diritto dell\'Unione Europea',
            description: 'Trattati, Regolamenti e Direttive UE.',
            icon: 'globe',
            color: 'secondary'
        }
    },

    // --- FONTI PRIMARIE (LEGGI E ATTI AVENTI FORZA DI LEGGE) ---
    {
        id: 'leggi-ordinarie',
        type: 'custom',
        position: { x: 500, y: 250 },
        data: {
            label: 'Leggi Ordinarie',
            description: 'Approvate dal Parlamento (Art. 70 Cost.).',
            icon: 'file-text',
            link: '/learn/area-2-costituzionale/mod-2.2-organi-dello-stato/lez-2.2.1-il-parlamento-come-si-fanno-le-leggi',
            color: 'primary'
        }
    },
    {
        id: 'decreti',
        type: 'custom',
        position: { x: 200, y: 250 },
        data: {
            label: 'Atti aventi forza di legge',
            description: 'Decreti Legge e Decreti Legislativi (Governo).',
            icon: 'briefcase',
            link: '/learn/area-1-fondamenta/mod-1.2-fonti-del-diritto/lez-1.2.3-leggi-decreti-e-regolamenti-le-differenze',
            color: 'primary'
        }
    },
    {
        id: 'leggi-regionali',
        type: 'custom',
        position: { x: 800, y: 250 },
        data: {
            label: 'Leggi Regionali',
            description: 'Legiferate dalle Regioni (Competenze Art. 117).',
            icon: 'map',
            link: '/learn/area-2-costituzionale/mod-2.3-autonomie-territoriali/lez-2.3.1-regioni-province-e-comuni',
            color: 'primary'
        }
    },

    // --- FONTI SECONDARIE E TERZIARIE ---
    {
        id: 'regolamenti',
        type: 'custom',
        position: { x: 500, y: 450 },
        data: {
            label: 'Regolamenti dell\'Esecutivo',
            description: 'Dettagliano come applicare le leggi.',
            icon: 'settings',
            link: '/learn/area-5-amministrativo/mod-5.1-pubblica-amministrazione/lez-5.1.1-cos-e-la-pubblica-amministrazione',
            color: 'secondary'
        }
    },
    {
        id: 'consuetudini',
        type: 'custom',
        position: { x: 500, y: 600 },
        data: {
            label: 'Usi e Consuetudini',
            description: 'Comportamenti ripetuti nel tempo con convinzione di obbligatorietà.',
            icon: 'users',
            color: 'neutral'
        }
    },

    // --- RAMI DEL DIRITTO (APPLICAZIONE) ---
    {
        id: 'diritto-civile',
        type: 'custom',
        position: { x: 150, y: 800 },
        data: {
            label: 'Diritto Privato / Civile',
            description: 'Rapporti tra i cittadini. Codice Civile.',
            icon: 'users',
            link: '/learn/area-3-privato-civile',
            color: 'primary'
        }
    },
    {
        id: 'diritto-penale',
        type: 'custom',
        position: { x: 400, y: 800 },
        data: {
            label: 'Diritto Penale',
            description: 'Reati e sanzioni punitive. Codice Penale.',
            icon: 'gavel',
            link: '/learn/area-4-penale',
            color: 'primary'
        }
    },
    {
        id: 'diritto-amministrativo',
        type: 'custom',
        position: { x: 650, y: 800 },
        data: {
            label: 'Diritto Amministrativo',
            description: 'Cittadino vs Pubblica Amministrazione.',
            icon: 'building',
            link: '/learn/area-5-amministrativo',
            color: 'primary'
        }
    },
    {
        id: 'diritto-lavoro',
        type: 'custom',
        position: { x: 900, y: 800 },
        data: {
            label: 'Diritto del Lavoro',
            description: 'Contratti, tutele, licenziamenti.',
            icon: 'briefcase',
            link: '/learn/area-5-amministrativo/mod-5.3-diritto-lavoro/lez-5.3.1-il-contratto-di-lavoro-diritti-e-doveri',
            color: 'primary'
        }
    },

    // --- SISTEMA GIUDIZIARIO (TUTELA DEI DIRITTI) ---
    {
        id: 'corte-costituzionale',
        type: 'custom',
        position: { x: 100, y: 50 },
        data: {
            label: 'Corte Costituzionale',
            description: 'Verifica la conformità delle leggi alla Costituzione.',
            icon: 'scale',
            link: '/learn/area-2-costituzionale/mod-2.2-organi-dello-stato/lez-2.2.3-la-corte-costituzionale',
            color: 'accent'
        }
    },
    {
        id: 'cassazione',
        type: 'custom',
        position: { x: 275, y: 1000 },
        data: {
            label: 'Corte di Cassazione',
            description: 'Massimo grado civile e penale.',
            icon: 'scale',
            link: '/learn/area-6-sistema-giudiziario',
            color: 'secondary'
        }
    },
    {
        id: 'consiglio-di-stato',
        type: 'custom',
        position: { x: 650, y: 1000 },
        data: {
            label: 'Consiglio di Stato',
            description: 'Massimo grado per la giustizia amministrativa.',
            icon: 'building',
            color: 'secondary'
        }
    },
];

export const initialEdges: Edge[] = [
    // Gerarchia primaria
    { id: 'e-cost-ue', source: 'costituzione', target: 'diritto-ue', animated: true, style: { strokeDasharray: '5 5' }, label: 'Art. 11/117' },
    { id: 'e-cost-leggi', source: 'costituzione', target: 'leggi-ordinarie' },
    { id: 'e-cost-decreti', source: 'costituzione', target: 'decreti' },
    { id: 'e-cost-regionali', source: 'costituzione', target: 'leggi-regionali' },

    // Decreti <-> Leggi (conversione / delega)
    { id: 'e-decreti-leggi', source: 'leggi-ordinarie', target: 'decreti', animated: true, style: { strokeDasharray: '5 5' }, label: 'Delega / Conversione' },

    // Gerarchia secondaria
    { id: 'e-leggi-regolamenti', source: 'leggi-ordinarie', target: 'regolamenti' },
    { id: 'e-regolamenti-cons', source: 'regolamenti', target: 'consuetudini' },

    // Rapporto Leggi -> Rami del Diritto
    { id: 'e-leggi-civile', source: 'leggi-ordinarie', target: 'diritto-civile' },
    { id: 'e-leggi-penale', source: 'leggi-ordinarie', target: 'diritto-penale' },
    { id: 'e-leggi-amm', source: 'leggi-ordinarie', target: 'diritto-amministrativo' },
    { id: 'e-leggi-lav', source: 'leggi-ordinarie', target: 'diritto-lavoro' },

    // Giurisdizione Suprema (Controllo)
    { id: 'e-corte-leggi', source: 'corte-costituzionale', target: 'leggi-ordinarie', animated: true, style: { stroke: '#eab308' }, label: 'Annullamento (Art. 134)' },
    { id: 'e-corte-decreti', source: 'corte-costituzionale', target: 'decreti', animated: true, style: { stroke: '#eab308' } },
    { id: 'e-corte-reg', source: 'corte-costituzionale', target: 'leggi-regionali', animated: true, style: { stroke: '#eab308' } },

    // Cassazione e Consiglio di Stato (Appelli)
    { id: 'e-civ-cass', source: 'diritto-civile', target: 'cassazione', animated: true },
    { id: 'e-pen-cass', source: 'diritto-penale', target: 'cassazione', animated: true },
    { id: 'e-amm-cons', source: 'diritto-amministrativo', target: 'consiglio-di-stato', animated: true },
];
