export type LivelloLettura = "principiante" | "intermedio" | "avanzato";

export interface Book {
    title: string;
    author: string;
    publisher: string;
    level: LivelloLettura;
    note: string;
    area: string;
    isbn?: string;
    url?: string;
}

export interface FreeResource {
    name: string;
    url: string;
    description: string;
}

export const books: Book[] = [
    // AREA 1
    {
        title: "La Costituzione per tutti",
        author: "M. Vespa",
        publisher: "Laterza",
        level: "principiante",
        note: "Articoli e principi della Costituzione spiegati in modo semplice",
        area: "area-1-fondamenta"
    },
    {
        title: "L'avvocato in tasca",
        author: "N. Trotta",
        publisher: "Newton Compton",
        level: "principiante",
        note: "L'ABC del diritto in 800 domande e risposte, molto pratico",
        area: "area-1-fondamenta"
    },
    {
        title: "Diritto ed economia",
        author: "M. Cattani",
        publisher: "Paravia",
        level: "principiante",
        note: "Pensato per le scuole superiori, ottima base per principianti assoluti",
        area: "area-1-fondamenta"
    },
    {
        title: "Istituzioni di diritto privato (o Diritto privato in pillole)",
        author: "P. Zatti, V. Colussi",
        publisher: "CEDAM/Giappichelli",
        level: "intermedio",
        note: "Introduzione sistematica alle basi del diritto — usato al primo anno di giurisprudenza",
        area: "area-1-fondamenta"
    },
    {
        title: "Introduzione al diritto",
        author: "G. Catanese",
        publisher: "Ed. Simone",
        level: "intermedio",
        note: "Compendio accessibile per chi vuole un quadro generale delle fonti e dell'ordinamento",
        area: "area-1-fondamenta"
    },
    {
        title: "Filosofia del diritto",
        author: "G. Pino, A. Schiavello, V. Villa",
        publisher: "Giappichelli",
        level: "avanzato",
        note: "Per chi vuole capire i fondamenti teorici — cos'è una norma, cos'è il diritto",
        area: "area-1-fondamenta"
    },
    {
        title: "Lineamenti di dottrina pura del diritto",
        author: "H. Kelsen (trad. it.)",
        publisher: "Einaudi",
        level: "avanzato",
        note: "Il classico assoluto della teoria del diritto — impegnativo ma fondamentale",
        area: "area-1-fondamenta"
    },

    // AREA 2
    {
        title: "La Costituzione italiana. Commento articolo per articolo",
        author: "F. Clementi, L. Cuocolo, F. Rosa, G.E. Vigevani (a cura di)",
        publisher: "Il Mulino",
        level: "principiante",
        note: "Due volumi molto chiari, commentario accessibile",
        area: "area-2-costituzionale"
    },
    {
        title: "Compendio di Diritto Costituzionale e Pubblico",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Trattazione chiara e sintetica, ideale per primo approccio",
        area: "area-2-costituzionale"
    },
    {
        title: "Diritto costituzionale",
        author: "R. Bin, G. Pitruzzella",
        publisher: "Giappichelli",
        level: "intermedio",
        note: "Il manuale di riferimento — XXVI edizione 2025, chiaro, con piattaforma digitale, quiz e mappe concettuali",
        area: "area-2-costituzionale"
    },
    {
        title: "Diritto pubblico",
        author: "T. Martines (agg. da Silvestri e altri)",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "Classico consolidato, più ampio del Bin-Pitruzzella",
        area: "area-2-costituzionale"
    },
    {
        title: "Schemi & Schede di Diritto Costituzionale",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "intermedio",
        note: "Ottimo sussidio visivo per il ripasso, da affiancare al manuale",
        area: "area-2-costituzionale"
    },
    {
        title: "Diritto costituzionale",
        author: "A. Barbera, C. Fusaro",
        publisher: "Il Mulino",
        level: "avanzato",
        note: "Approfondito, ottica comparatistica, usato in molte facoltà",
        area: "area-2-costituzionale"
    },
    {
        title: "Diritto costituzionale — Casi e materiali",
        author: "R. Bin, G. Pitruzzella",
        publisher: "Giappichelli",
        level: "avanzato",
        note: "Raccolta di sentenze e casi reali della Corte Costituzionale — per imparare a ragionare sul diritto vivo",
        area: "area-2-costituzionale"
    },
    {
        title: "Costituzione italiana (commentata)",
        author: "Brocardi.it",
        publisher: "Online gratuito",
        level: "avanzato",
        note: "Ogni articolo con spiegazione, massime giurisprudenziali e riferimenti normativi",
        area: "area-2-costituzionale"
    },

    // AREA 3
    {
        title: "Compendio di Istituzioni di Diritto Privato (Diritto Civile)",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Chiaro, essenziale, aggiornato — ideale per primo approccio",
        area: "area-3-civile"
    },
    {
        title: "La legge per tutti: Casa e condominio",
        author: "A.A.V.V.",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Guida pratica per chi ha problemi concreti di diritto civile quotidiano",
        area: "area-3-civile"
    },
    {
        title: "Manuale di diritto privato",
        author: "A. Torrente, P. Schlesinger (agg. F. Anelli, C. Granelli)",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "IL manuale per eccellenza — 27ª edizione, usato in quasi tutte le facoltà italiane. Chiaro, completo, aggiornato",
        area: "area-3-civile"
    },
    {
        title: "Diritto privato",
        author: "F. Gazzoni",
        publisher: "Edizioni Scientifiche Italiane",
        level: "intermedio",
        note: "Alternativa valida al Torrente, apprezzato per lo stile diretto e i numerosi esempi pratici",
        area: "area-3-civile"
    },
    {
        title: "Istituzioni di diritto privato",
        author: "M. Bessone (a cura di)",
        publisher: "Giappichelli",
        level: "intermedio",
        note: "Testo collettaneo, aggiornato, buona alternativa",
        area: "area-3-civile"
    },
    {
        title: "Diritto civile (3 voll.)",
        author: "P. Perlingieri",
        publisher: "Edizioni Scientifiche Italiane",
        level: "avanzato",
        note: "Opera monumentale — il diritto civile nella legalità costituzionale",
        area: "area-3-civile"
    },
    {
        title: "Il contratto",
        author: "V. Roppo",
        publisher: "Giuffrè",
        level: "avanzato",
        note: "Trattato sul contratto — il riferimento per la parte più importante del diritto civile",
        area: "area-3-civile"
    },
    {
        title: "Codice Civile commentato",
        author: "G. Bonilini, M. Confortini (diretto da)",
        publisher: "UTET",
        level: "avanzato",
        note: "Commentario articolo per articolo — strumento professionale",
        area: "area-3-civile"
    },

    // AREA 4
    {
        title: "Compendio di Diritto Penale – Parte Generale e Speciale",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Trattazione chiara senza approfondimenti dottrinari eccessivi, ideale per primo approccio",
        area: "area-4-penale"
    },
    {
        title: "Testimone inconsapevole",
        author: "G. Carofiglio",
        publisher: "Sellerio",
        level: "principiante",
        note: "Romanzo legal thriller ambientato in un tribunale penale italiano — avvincente e realistico nelle procedure",
        area: "area-4-penale"
    },
    {
        title: "Ad occhi chiusi",
        author: "G. Carofiglio",
        publisher: "Sellerio",
        level: "principiante",
        note: "Secondo romanzo dell'avv. Guerrieri — violenza domestica e stalking, temi attualissimi",
        area: "area-4-penale"
    },
    {
        title: "Manuale di diritto penale — Parte generale",
        author: "G. Marinucci, E. Dolcini, G.L. Gatta",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "Manuale universitario di riferimento, chiaro e rigoroso",
        area: "area-4-penale"
    },
    {
        title: "Diritto penale — Parte generale",
        author: "G. Fiandaca, E. Musco",
        publisher: "Zanichelli",
        level: "intermedio",
        note: "L'altro grande classico — più didattico, ottimo per studenti",
        area: "area-4-penale"
    },
    {
        title: "Schemi & Schede di Diritto Penale",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "intermedio",
        note: "Sussidio visivo per ripasso",
        area: "area-4-penale"
    },
    {
        title: "Manuale superiore di Diritto Penale",
        author: "R. Garofoli",
        publisher: "NelDiritto Editore",
        level: "avanzato",
        note: "Per concorso in magistratura e esame avvocato",
        area: "area-4-penale"
    },
    {
        title: "Diritto penale — Parte speciale (2 voll.)",
        author: "G. Fiandaca, E. Musco",
        publisher: "Zanichelli",
        level: "avanzato",
        note: "Analisi dettagliata dei singoli reati — necessario per la pratica",
        area: "area-4-penale"
    },
    {
        title: "Codice Penale commentato",
        author: "T. Padovani (diretto da)",
        publisher: "Giuffrè",
        level: "avanzato",
        note: "Commentario professionale articolo per articolo",
        area: "area-4-penale"
    },

    // AREA 5 - Amministrativo (uso lo slug area-5-amministrativo)
    {
        title: "Compendio di Diritto Amministrativo",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Trattazione chiara, focus sugli argomenti più richiesti",
        area: "area-5-amministrativo"
    },
    {
        title: "Compendio di Diritto del Lavoro, Sindacale e Previdenza",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Ottima panoramica per chi vuole capire i propri diritti sul lavoro",
        area: "area-5-amministrativo"
    },
    {
        title: "I diritti del lavoratore — Guida pratica",
        author: "CGIL/CISL/UIL (vari)",
        publisher: "Patronati",
        level: "principiante",
        note: "Guide gratuite scaricabili dai siti dei patronati — molto concrete",
        area: "area-5-amministrativo"
    },
    {
        title: "Manuale di diritto amministrativo",
        author: "M. Clarich",
        publisher: "Il Mulino",
        level: "intermedio",
        note: "Le migliori recensioni per studio universitario e concorsi, sistematico e aggiornato al PNRR",
        area: "area-5-amministrativo"
    },
    {
        title: "Manuale di diritto amministrativo",
        author: "E. Casetta (agg. F. Ferraris)",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "Classico consolidato, riferimento accademico",
        area: "area-5-amministrativo"
    },
    {
        title: "Diritto amministrativo",
        author: "F.G. Scoca",
        publisher: "Giappichelli",
        level: "intermedio",
        note: "Punto di riferimento nella dottrina universitaria",
        area: "area-5-amministrativo"
    },
    {
        title: "Manuale di diritto del lavoro",
        author: "P. Albi",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "Aggiornato, chiaro, adatto a studenti",
        area: "area-5-amministrativo"
    },
    {
        title: "Diritto del lavoro",
        author: "E. Ghera, A. Garilli, D. Garofalo",
        publisher: "Giappichelli",
        level: "intermedio",
        note: "Manuale universitario completo e aggiornato al Jobs Act",
        area: "area-5-amministrativo"
    },
    {
        title: "Diritto sindacale",
        author: "G. Giugni (agg. L. Bellardi e altri)",
        publisher: "Cacucci",
        level: "intermedio",
        note: "Classico per la parte sindacale",
        area: "area-5-amministrativo"
    },
    {
        title: "Manuale superiore di Diritto Amministrativo",
        author: "R. Garofoli",
        publisher: "NelDiritto Editore",
        level: "avanzato",
        note: "Per concorso in magistratura",
        area: "area-5-amministrativo"
    },
    {
        title: "Manuale di diritto amministrativo (2 voll.)",
        author: "V. Lopilato",
        publisher: "Giappichelli",
        level: "avanzato",
        note: "Parte generale + parte speciale + giustizia amministrativa — per concorsi",
        area: "area-5-amministrativo"
    },
    {
        title: "Diritto amministrativo",
        author: "F. Caringella, R. Giovagnoli",
        publisher: "Dike Giuridica",
        level: "avanzato",
        note: "Per esame avvocato e magistratura, pratico e ricco di giurisprudenza",
        area: "area-5-amministrativo"
    },

    // AREA 6
    {
        title: "Compendio di Diritto Processuale Civile",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Per capire come funziona un processo civile",
        area: "area-6-giustizia"
    },
    {
        title: "Compendio di Diritto Processuale Penale",
        author: "Ed. Simone",
        publisher: "Edizioni Simone",
        level: "principiante",
        note: "Come funziona un processo penale — trattazione completa e accessibile",
        area: "area-6-giustizia"
    },
    {
        title: "Manuale di diritto processuale civile",
        author: "C. Mandrioli, A. Carratta",
        publisher: "Giappichelli",
        level: "intermedio",
        note: "Riferimento accademico, aggiornato alla riforma Cartabia",
        area: "area-6-giustizia"
    },
    {
        title: "Manuale di diritto processuale penale",
        author: "P. Tonini",
        publisher: "Giuffrè",
        level: "intermedio",
        note: "Il manuale più usato nelle facoltà per la procedura penale",
        area: "area-6-giustizia"
    },
    {
        title: "Lineamenti di ordinamento giudiziario",
        author: "vari",
        publisher: "Simone/Giuffrè",
        level: "intermedio",
        note: "Panoramica del sistema giudiziario italiano",
        area: "area-6-giustizia"
    },
    {
        title: "Codice di Procedura Civile commentato",
        author: "C. Consolo",
        publisher: "Giuffrè",
        level: "avanzato",
        note: "Opera di riferimento per la pratica forense",
        area: "area-6-giustizia"
    },
    {
        title: "Codice di Procedura Penale commentato",
        author: "A. Giarda, G. Spangher",
        publisher: "IPSOA",
        level: "avanzato",
        note: "Commentario completo per professionisti",
        area: "area-6-giustizia"
    }
];

export const freeResources: FreeResource[] = [
    {
        name: "Brocardi.it",
        url: "https://www.brocardi.it",
        description: "Codici commentati con massime, spiegazioni semplici, tutto gratuito",
    },
    {
        name: "Normattiva.it",
        url: "https://www.normattiva.it",
        description: "Testi ufficiali di tutte le leggi italiane — la fonte primaria",
    },
    {
        name: "Treccani — Enciclopedia Giuridica",
        url: "https://www.treccani.it/enciclopedia",
        description: "Voci autorevoli su tutti gli istituti giuridici",
    },
    {
        name: "Altalex",
        url: "https://www.altalex.com",
        description: "News giuridiche, commenti, codici aggiornati",
    },
    {
        name: "Sistema Penale",
        url: "https://www.sistemapenale.it",
        description: "Rivista scientifica di diritto penale contemporaneo (ex DPC)",
    },
    {
        name: "INPS",
        url: "https://www.inps.it",
        description: "Tutto su contributi, NASpI, maternità, pensioni",
    },
    {
        name: "Governo.it",
        url: "https://www.governo.it",
        description: "Normativa, procedure PA, modulistica",
    },
    {
        name: "Federica Web Learning",
        url: "https://www.federica.eu",
        description: "Corsi universitari gratuiti online (anche di diritto)",
    }
];
