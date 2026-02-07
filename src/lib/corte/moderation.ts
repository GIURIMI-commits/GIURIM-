
// Basic list of bad words (Italian) - MVP
const BANNED_WORDS = [
    "cazzo", "merda", "vaffanculo", "strronzo", "stronzo", "coglione", "idiota", "stupido",
    "scemo", "bastardo", "troia", "puttana", "zoccola", "frocio", "finocchio", "negro"
];

const AGGRESSIVE_PATTERNS = [
    /!!!{3,}/, // Too many exclamations
    /\?{3,}/,   // Too many question marks
    /[A-Z]{10,}/, // Caps lock abuse (10+ chars)
];

export type ModerationResult = {
    valid: boolean;
    reason?: "banned_words" | "aggressive_tone" | "too_short";
    message?: string;
    warning?: boolean; // If true, it's just a warning, not a block
};

export function checkModeration(text: string, title?: string): ModerationResult {
    const content = ((title || "") + " " + text).toLowerCase();

    // 1. Block List
    for (const word of BANNED_WORDS) {
        if (content.includes(word)) {
            return {
                valid: false,
                reason: "banned_words",
                message: "Il messaggio contiene termini non idonei per la CORTE. Riformula in modo rispettoso.",
            };
        }
    }

    // 2. Length check
    if (text.trim().length < 20) {
        return {
            valid: false,
            reason: "too_short",
            message: "Il testo è troppo breve. Elabora meglio il tuo pensiero per favorire il confronto.",
        };
    }

    // 3. Tone Warning (Heuristics)
    // Check Caps Lock ratio or repeated punctuation
    const originalContent = (title || "") + " " + text;
    for (const pattern of AGGRESSIVE_PATTERNS) {
        if (pattern.test(originalContent)) {
            return {
                valid: true,
                warning: true,
                reason: "aggressive_tone",
                message: "Suggerimento: il testo sembra aggressivo (troppi maiuscoli o punteggiatura). Un tono neutro aiuta a ricevere risposte migliori.",
            };
        }
    }

    return { valid: true };
}
