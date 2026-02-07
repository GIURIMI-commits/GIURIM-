import fs from 'fs';
import path from 'path';

const TERMS_PATH = path.join(process.cwd(), 'content/glossary/terms.json');

export interface GlossaryTerm {
    id: string;
    term: string;
    definition_simple: string;
    definition_technical: string;
    examples: string[];
    area: string;
}

export async function getGlossaryTerm(id: string): Promise<GlossaryTerm | null> {
    const terms = await getAllGlossaryTerms();
    return terms.find((t) => t.id === id) || null;
}

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
    if (!fs.existsSync(TERMS_PATH)) return [];
    const fileContent = fs.readFileSync(TERMS_PATH, 'utf8');
    return JSON.parse(fileContent);
}

export async function searchGlossaryTerms(query: string): Promise<GlossaryTerm[]> {
    const terms = await getAllGlossaryTerms();
    const lowerQuery = query.toLowerCase();
    return terms.filter((t) =>
        t.term.toLowerCase().includes(lowerQuery) ||
        t.definition_simple.toLowerCase().includes(lowerQuery)
    );
}
