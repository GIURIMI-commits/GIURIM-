
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

const areas = [
    {
        slug: 'area-1-fondamenta',
        title: 'Fondamenta del Diritto',
        description: 'Le basi essenziali per capire le regole del gioco.',
        order: 1,
        icon: 'scale',
        modules: [
            {
                slug: 'mod-1.1-cose-il-diritto',
                title: "Cos'è il diritto",
                description: 'Perché esistono le regole e come funzionano.',
                order: 1
            },
            {
                slug: 'mod-1.2-fonti-del-diritto',
                title: 'Le Fonti del Diritto',
                description: 'Da dove nasce la legge e la gerarchia delle fonti.',
                order: 2
            },
            {
                slug: 'mod-1.3-leggere-una-norma',
                title: 'Leggere una norma',
                description: 'Come interpretare il testo di legge.',
                order: 3
            }
        ]
    },
    {
        slug: 'area-2-costituzionale',
        title: 'Diritto Costituzionale',
        description: 'La legge fondamentale e l’organizzazione dello Stato.',
        order: 2,
        icon: 'landmark',
        modules: [
            { slug: 'mod-2.1-costituzione-italiana', title: 'La Costituzione Italiana', description: 'Principi fondamentali e diritti.', order: 1 },
            { slug: 'mod-2.2-organi-dello-stato', title: 'Organi dello Stato', description: 'Parlamento, Governo, Presidente, Magistratura.', order: 2 },
            { slug: 'mod-2.3-autonomie-territoriali', title: 'Autonomie Territoriali', description: 'Regioni, Comuni e Città Metropolitane.', order: 3 },
            { slug: 'mod-2.4-elezioni-partecipazione', title: 'Elezioni e Partecipazione', description: 'Il voto e i referendum.', order: 4 },
        ]
    },
    {
        slug: 'area-3-privato-civile',
        title: 'Diritto Privato e Civile',
        description: 'I rapporti tra cittadini: contratti, famiglia, proprietà.',
        order: 3,
        icon: 'users',
        modules: [
            { slug: 'mod-3.1-persone-capacita', title: 'Persone e Capacità', description: 'Capacità giuridica e di agire.', order: 1 },
            { slug: 'mod-3.2-contratto', title: 'Il Contratto', description: 'Come funziona un accordo vincolante.', order: 2 },
            { slug: 'mod-3.3-obbligazioni', title: 'Le Obbligazioni', description: 'Debiti, crediti e doveri.', order: 3 },
            { slug: 'mod-3.4-responsabilita-civile', title: 'Responsabilità Civile', description: 'I danni e il risarcimento.', order: 4 },
            { slug: 'mod-3.5-proprieta-diritti-reali', title: 'Proprietà e Diritti Reali', description: 'Il possesso e i beni.', order: 5 },
            { slug: 'mod-3.6-famiglia-successioni', title: 'Famiglia e Successioni', description: 'Matrimonio, filiazione ed eredità.', order: 6 },
        ]
    },
    {
        slug: 'area-4-penale',
        title: 'Diritto Penale',
        description: 'Reati, pene e garanzie dell’imputato.',
        order: 4,
        icon: 'gavel',
        modules: [
            { slug: 'mod-4.1-reato-struttura', title: 'Struttura del Reato', description: 'Quando un fatto è reato.', order: 1 },
            { slug: 'mod-4.2-pena-misure', title: 'Pene e Misure', description: 'Le conseguenze del reato.', order: 2 },
            { slug: 'mod-4.3-diritti-imputato', title: 'Diritti dell\'Imputato', description: 'Le garanzie nel processo penale.', order: 3 },
            { slug: 'mod-4.4-reati-comuni', title: 'Reati Comuni', description: 'I reati che tutti dovrebbero conoscere.', order: 4 },
        ]
    },
    {
        slug: 'area-5-amministrativo',
        title: 'Diritto Amministrativo',
        description: 'Il cittadino e la Pubblica Amministrazione.',
        order: 5,
        icon: 'building',
        modules: [
            { slug: 'mod-5.1-pubblica-amministrazione', title: 'La Pubblica Amministrazione', description: 'Come funziona la macchina statale.', order: 1 },
            { slug: 'mod-5.2-cittadino-e-pa', title: 'Cittadino e PA', description: 'Accesso agli atti e ricorsi.', order: 2 },
            { slug: 'mod-5.3-diritto-lavoro', title: 'Diritto del Lavoro', description: 'Fondamenti del rapporto di lavoro (pubblico e privato).', order: 3 },
        ]
    },
    {
        slug: 'area-6-sistema-giudiziario',
        title: 'Sistema Giudiziario e Pratica',
        description: 'Come funzionano i processi e quando serve un avvocato.',
        order: 6,
        icon: 'balance',
        modules: [
            { slug: 'mod-6.1-ordine-giudiziario', title: 'Ordine Giudiziario', description: 'Giudici e PM.', order: 1 },
            { slug: 'mod-6.2-processo-pratica', title: 'Il Processo in Pratica', description: 'Cosa succede in tribunale.', order: 2 },
            { slug: 'mod-6.3-quando-serve-avvocato', title: 'Quando serve un avvocato', description: 'Autocertificazioni, cause e costi.', order: 3 },
        ]
    }
];

// Content for terms.json
const terms = [
    {
        id: "diritto-oggettivo",
        term: "Diritto Oggettivo",
        definition_simple: "L'insieme delle regole che valgono per tutti (le leggi).",
        definition_technical: "L'insieme delle norme giuridiche che regolano i rapporti sociali.",
        examples: ["Il Codice Civile è diritto oggettivo.", "La legge sul divieto di fumo."],
        area: "area-1-fondamenta"
    },
    {
        id: "diritto-soggettivo",
        term: "Diritto Soggettivo",
        definition_simple: "Il potere di agire per soddisfare un proprio interesse protetto dalla legge.",
        definition_technical: "Situazione giuridica attiva che attribuisce al titolare un potere per la tutela di un proprio interesse.",
        examples: ["Il diritto di proprietà sulla tua casa.", "Il diritto di credito verso chi ti deve soldi."],
        area: "area-1-fondamenta"
    },
    {
        id: "giurisprudenza",
        term: "Giurisprudenza",
        definition_simple: "L'insieme delle decisioni dei giudici (sentenze).",
        definition_technical: "La scienza del diritto e l'insieme delle pronunce degli organi giurisdizionali.",
        examples: ["La giurisprudenza della Cassazione ha chiarito questo punto."],
        area: "area-1-fondamenta"
    }
];


async function scaffold() {
    // 1. Write content/areas.json
    const areasList = areas.map(({ slug, title, description, order, icon }) => ({
        slug, title, description, order, icon
    }));
    fs.writeFileSync(path.join(contentDir, 'areas.json'), JSON.stringify(areasList, null, 2));
    console.log('Created content/areas.json');

    // 2. Write content/glossary/terms.json
    fs.mkdirSync(path.join(contentDir, 'glossary'), { recursive: true });
    fs.writeFileSync(path.join(contentDir, 'glossary', 'terms.json'), JSON.stringify(terms, null, 2));
    console.log('Created content/glossary/terms.json');

    // 3. Iterate areas and create _area.json and module folders/_module.json
    for (const area of areas) {
        const areaDir = path.join(contentDir, area.slug);

        // Ensure directory (created by shell command earlier, but safe to check)
        fs.mkdirSync(areaDir, { recursive: true });

        // _area.json
        fs.writeFileSync(path.join(areaDir, '_area.json'), JSON.stringify({
            slug: area.slug,
            title: area.title,
            description: area.description,
            order: area.order,
            icon: area.icon
        }, null, 2));
        console.log(`Created ${area.slug}/_area.json`);

        for (const mod of area.modules) {
            const modDir = path.join(areaDir, mod.slug);
            fs.mkdirSync(modDir, { recursive: true });

            // _module.json
            fs.writeFileSync(path.join(modDir, '_module.json'), JSON.stringify(mod, null, 2));
            console.log(`Created ${area.slug}/${mod.slug}/_module.json`);
        }
    }
}

scaffold();
