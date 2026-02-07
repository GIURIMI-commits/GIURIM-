export type Room = {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name
};

export type Thread = {
    id: string;
    roomId: string; // Foreign key to Room.id
    title: string;
    excerpt: string;
    body: string; // Rich text or markdown
    tags: string[];
    author: {
        name: string;
        avatar?: string;
        role?: "student" | "tutor" | "admin";
    };
    stats: {
        upvotes: number;
        comments: number;
        views: number;
    };
    createdAt: string; // ISO date
};

// Mock Rooms
export const ROOMS: Room[] = [
    {
        id: "penale",
        slug: "penale",
        name: "Aula Penale",
        description: "Reati, pene e procedura penale.",
        icon: "gavel",
    },
    {
        id: "civile",
        slug: "civile",
        name: "Aula Civile",
        description: "Contratti, famiglia e successioni.",
        icon: "users",
    },
    {
        id: "costituzionale",
        slug: "costituzionale",
        name: "Dir. Costituzionale",
        description: "Libertà fondamentali e ordinamento.",
        icon: "landmark",
    },
    {
        id: "ue",
        slug: "ue",
        name: "Diritto UE",
        description: "Istituzioni e normative europee.",
        icon: "globe",
    },
    {
        id: "digital",
        slug: "digital",
        name: "AI & Digital",
        description: "Privacy, copyright e nuove tecnologie.",
        icon: "cpu",
    },
    {
        id: "cafe",
        slug: "cafe",
        name: "Caffè Giuridico",
        description: "Chiacchiere, consigli esami e supporto.",
        icon: "coffee",
    },
];

// Mock Threads
export const MOCK_THREADS: Thread[] = [
    {
        id: "th-1",
        roomId: "penale",
        title: "Differenza tra dolo eventuale e colpa cosciente: esempi pratici?",
        excerpt: "Sto preparando l'esame e mi confondo sempre sul caso Thyssen...",
        body: "Ciao a tutti, sto studiando per Penale 1. Il manuale spiega la teoria dell'accettazione del rischio, ma fatico ad applicarla ai casi limite. Qualcuno ha uno schema o esempi recenti oltre alla sentenza Thyssen?",
        tags: ["Dolo", "Colpa", "Esame"],
        author: { name: "Giulia R.", role: "student" },
        stats: { upvotes: 12, comments: 4, views: 156 },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
        id: "th-2",
        roomId: "digital",
        title: "L'AI Act e la responsabilità dei sistemi High-Risk",
        excerpt: "Come cambia la responsabilità civile per i danni causati da AI?",
        body: "Ho letto che l'AI Act impone obblighi severi, ma non capisco se introduce una responsabilità oggettiva o se si resta nel 2050 cc. Pareri?",
        tags: ["AI Act", "Responsabilità", "News"],
        author: { name: "Marco L.", role: "tutor" },
        stats: { upvotes: 45, comments: 18, views: 890 },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
        id: "th-3",
        roomId: "cafe",
        title: "Metodo di studio per Privato: meglio manuale o compendio?",
        excerpt: "Ho poco tempo e il Torrente mi sembra infinito...",
        body: "Lavoro full time e devo preparare privato. Consigliate di integrare con schemi o basta il manuale? Grazie!",
        tags: ["Consigli", "Metodo"],
        author: { name: "Luca B.", role: "student" },
        stats: { upvotes: 8, comments: 12, views: 340 },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
];
