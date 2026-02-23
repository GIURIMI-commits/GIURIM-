# Guida alla Scrittura delle Lezioni (GIURIMì - Advanced MDX)

Questo documento contiene le linee guida ufficiali per la stesura delle lezioni di GIURIMì, utilizzando i componenti grafici avanzati creati in Next.js + Tailwind + Radix UI + Framer Motion.

L'obiettivo è abbandonare il semplice testo "a cascata" del markdown tradizionale, in favore di una struttura a blocchi visivi, ariosa, interattiva e tipograficamente perfetta.

## 1. Regole di Base e "Do's & Don'ts"

### ✅ Da Fare (BEST PRACTICES)
- **Usa `<SectionTitle>`** invece dei normali titoli Markdown (`## 1. Titolo`).
- **Incapsula i concetti ostici** in box dedicati (`<Concept>`).
- **Scomponi gli elenchi testuali lunghi** in griglie di carte (`<CardBlock>` in `grid`).
- **Usa le metafore visive:** se devi spiegare un flusso, usa le animazioni (es. `<AnimatedTimeline />`).
- **Mostra il Codice Civile** sempre dentro a un `<Technical>` espandibile.
- **Evidenzia Parole Chiave:** Usa sempre `<Highlight>` per termini importanti dentro le card.
- **Cita i termini tecnici** usando il `<GlossaryTerm id="...">` per il tooltip.

### ❌ Da Evitare
- **NO Muri di Testo:** Evita paragrafi più lunghi di 4-5 righe.
- **NO Titoli Markdown nudi (`##` , `###`)**: Fanno sembrare la piattaforma amatoriale.
- **NO grassetti casuali:** Usa il grassetto solo per 1 max 2 parole pivotali per frase.
- **NO `<div className="mt-4">` isolati dentro le Card o nel testo libero:** Causa un *Hydration Error* critico su Next.js (perché MDX lo avvolgerà in un `<p>`). Usa sempre `<span className="block mt-4">` al suo posto.

---

## 2. Struttura Tipo di un File `.mdx`

Ogni file `.mdx` deve rispettare rigorosamente questo ordine logico e visivo:

### A) Frontmatter (Metadati Iniziali)
Deve trovarsi alla riga 1 del file.
```yaml
---
slug: "lez-X.Y.Z"
title: "Titolo della lezione"
area: "area-..."
module: "mod-..."
order: 1
duration_minutes: 15
prerequisites: ["lez-X.Y.V"]
next_lesson: "lez-X.Y.K"
prev_lesson: "lez-X.Y.V"     # [NOVITÀ] Ora tracciamo anche la prev_lesson
last_verified: "YYYY-MM-DD"
verified_by: "[Nome]"
disclaimer_level: "standard" # [NOVITÀ] "standard" oppure "elevated" (per temi penali/finanziari)
... (tutti gli altri campi standard)
---
```

### B) Il Gancio (Hook) & Obiettivo
Subito sotto il frontmatter, cattura l'attenzione e spiega cosa impareremo.
```mdx
<HookBlock>
Frase a effetto, domanda o scenario pratico per far immedesimare lo studente nel problema.
</HookBlock>

<Objective>
Cosa andremo a capire in questa lezione e perché è fondamentale rispetto alla lezione precedente.
</Objective>
```

### C) Sviluppo del Corpo (Titoli di Sezione)
Per dividere i paragrafi, usa il componente `SectionTitle`.
```mdx
<SectionTitle step={1} title="Il Primo Argomento Principale">
  (Opzionale) Breve sottotitolo o riassunto di questa sezione es: "Definiamo cos'è un contratto..."
</SectionTitle>
```

### D) Concetti Fondamentali e Definizioni
Quando presenti la definizione giuridica chiave della lezione:
```mdx
<Concept title="Definizione di [Argomento]">
Il **[Termine]** è un istituto giuridico che...
</Concept>
```

### E) Mappe Concettuali a Griglia (Sostituiscono i Bullet Point testuali)
Per elenchi di 3+ elementi (es. "le 3 fonti", "i 4 requisiti"). Se devi andare a capo e spaziare l'Highlight, ricordati di usare *sempre* lo `<span>` e non il `<div>`.
```mdx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <CardBlock title="1️⃣ Primo Punto">
    Spiegazione breve.
    <span className="block mt-4"><Highlight color="blue">Es. Testo evidenziato</Highlight></span>
  </CardBlock>
  <CardBlock title="2️⃣ Secondo Punto">...</CardBlock>
  <CardBlock title="3️⃣ Terzo Punto">...</CardBlock>
</div>
```

### F) Citazione Normativa
Tutti gli articoli di legge vanno in box compattati.
```mdx
<Technical>
**Art. 1321. Nozione.**
Il contratto è l'accordo di due o più parti per costituire, regolare o estinguere tra loro un rapporto giuridico patrimoniale.
</Technical>
```

### G) Confronti (Es. Nullo vs Annullabile)
```mdx
<Compare 
    aTitle="Nullo" aBody="Non produce effetti ab origine."
    bTitle="Annullabile" bBody="Produce effetti finché non viene impugnato."
/>
```

### H) Regole di Comportamento e Step
Se c'è una scaletta di procedimenti logici o principi.
```mdx
<Steps>
  <Step number="1" title="Correttezza">Spiegazione 1...</Step>
  <Step number="2" title="Diligenza">Spiegazione 2...</Step>
</Steps>
```

### I) Casistiche Pratiche (Esempi)
Metti sempre esempi Pratici a fine argomento.
```mdx
<Row className="lg:grid-cols-2">
    <Col>
        <Example type="positive" title="Caso Lecito / Corretto">
            Tizio fa questo e Caio risponde così...
        </Example>
    </Col>
    <Col>
        <Example type="negative" title="Fatto Illecito / Errore">
            Tizio omette questo documento...
        </Example>
    </Col>
</Row>
```

### L) Interactive / 3D Graphics
Se la lezione contiene concetti complessi, inserisci i componenti sviluppati custom in React/FramerMotion all'inizio o al centro.
```mdx
<AnimatedObbligazione />
<AnimatedTimeline />
```

### M) Sezione Video (Placeholder)
Aggiungi un suggerimento in fondo se pensi che al lettore gioverebbe una sintesi video istituzionale o accademica.
```mdx
<SectionTitle step={10} title="Video suggerito">
  Inserire solo se autore qualificato (docente universitario / ente istituzionale / ordine professionale), aggiornato e senza promozione.
</SectionTitle>

{/* VIDEO PLACEHOLDER:
  Search query: "[inserire chiavi di ricerca, es: successioni diritto civile apertura successione]"
  Criteri: docente universitario/ente istituzionale/ordine professionale; autore identificabile; no promozione; ecc.
*/}
```

### N) Chiusura (Quiz e Fonti)
In fondo assoluto al documento. (Il Quiz verrà comunque renderizzato automaticamente anche se omesso, ma è buona norma posizionarlo a mano prima delle fonti).
```mdx
---

<QuizBlock />

<ResourceFooter
  disclaimerLevel="standard"
  primarySources={[
    { label: "Brocardi — Art. X", url: "https://..." }
  ]}
>
Questa lezione ha finalità didattica e non costituisce consulenza legale.
</ResourceFooter>
```

---

## 3. PROMPT COMPLETO DA INVIARE ALL'IA PER SCRIVERE NUOVE LEZIONI

Se vuoi che un'intelligenza artificiale (Claude, ChatGPT, o questo stesso sistema) generi o traduca una nuova lezione nel formato GIURIMì Advanced, usa questo identico prompt copincollandolo:

```text
SEI IL CONTENT CREATOR GIURIDICO DI GIURIMì.
Devi scrivere una lezione di Diritto Civile/Privato mantenendo altissimo rigore accademico ma con uno stile comunicativo diretto, ingaggiante e "premium" (stile manuali Stripe/Vercel/Fintech).

REGOLE DI FORMATTAZIONE MDX (TASSOVITATIVE):
1. DEVI usare il frontmatter YAML completo all'inizio (includendo sempre anche `prev_lesson` e `disclaimer_level`).
2. Inizia SEMPRE con `<HookBlock>Testo ad effetto corto</HookBlock>` seguito da un `<Objective>Cosa impariamo</Objective>`.
3. NON usare MAI `## Titolo` o `### Sottotitolo`. Usa ESCUSIVAMENTE il componente: `<SectionTitle step={numero} title="Il Tuo Titolo">Sottotitolo opzionale testuale</SectionTitle>`.
4. Metti la definizione chiave dentro un `<Concept title="Definizione">Testo</Concept>`.
5. Se devi elencare 2 o 3 categorie o requisiti, NON usare un elenco puntato markdown, usa SEMPRE questo codice JSX per le griglie di card. ATTENZIONE: per staccare l'Highlight usa SEMPRE `<span className="block mt-4">` (NIENTE DIV ANNIDATI PER EVITARE HYDRATION ERROR!):
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
     <CardBlock title="Categoria 1">Descrizione.<br/><span className="block mt-4"><Highlight color="blue">Esempio</Highlight></span></CardBlock>
   </div>
6. Cita SEMPRE gli articoli del Codice Civile chiusi dentro il tag espandibile `<Technical> **Art. X.** Testo di legge.</Technical>`.
7. Fai sempre Esempi finali usando il layout a 2 colonne:
   <Row className="lg:grid-cols-2">
     <Col><Example type="positive" title="Caso">Testo</Example></Col>
     <Col><Example type="negative" title="Caso">Testo</Example></Col>
   </Row>
8. Prevedi sempre in coda un placeholder commentato in HTML (`{/* VIDEO PLACEHOLDER: ... */}`) in cui indichi la query di ricerca che si adatta meglio alla documentazione e al reperimento di un video di un docente o accademico per completare lo studio.
9. Cita nel testo i termini di glossario avvolgendoli in `<GlossaryTerm id="id-del-termine">termine</GlossaryTerm>`.
10. Inserire sempre un blocco quiz (`<QuizBlock />`) e alla fine il `<ResourceFooter>` con le primarySources.

11. Se includi il quiz, l'oggetto YAML *DEVE* avere ESATTAMENTE la struttura definita nell'interfaccia Typescript in questo modo:
    quiz:
      questions:
        - type: "mcq"
          prompt: "Domanda testuale:"
          choices:
            - "Opzione A"
            - "Opzione B"
            - "Opzione C"
          correctIndex: 1
          feedback:
            0: "Sbagliato perché..."
            1: "Corretto perché..."
            2: "Sbagliato perché..."
        - type: "open"
          prompt: "Domanda aperta testuale."
          expected_points:
            - "Punto chiave 1 che deve trattare"
            - "Punto chiave 2 che deve trattare"

L'ARGOMENTO DELLA LEZIONE È: [INSERISCI QUI IL TITOLO/ARGOMENTO]
Genera l'intero codice MDX.
```
