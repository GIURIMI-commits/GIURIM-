# PROMPT: Scaffold Tecnico GUIRIMì

Sei un senior full-stack developer. Devi creare lo scaffold tecnico completo di **GUIRIMì**, una piattaforma di educazione legale italiana.

## CONTESTO PROGETTO

GUIRIMì è un'academy digitale che trasforma il diritto italiano in percorsi di apprendimento chiari, strutturati e verificati. Non è un manuale, non è consulenza legale — è la "rampa di lancio" per capire come funziona la legge in Italia.

**Target**: cittadini, studenti, liceali, concorsisti, professionisti non-legali, content creator, insegnanti.

## TECH STACK (non negoziabile)

| Layer | Tecnologia |
|-------|-----------|
| Frontend | **Next.js 14** (App Router) + TypeScript |
| Stile | **Tailwind CSS** |
| Auth + DB | **Supabase** (PostgreSQL + Auth + RLS) |
| Contenuti | **MDX** (Markdown + JSX) — lezioni come file, dati dinamici in DB |
| Deploy | **Vercel** |
| Email | **Resend** |
| Analytics | **PostHog** (privacy-first) |

Dipendenze chiave: `next-mdx-remote`, `gray-matter`, `rehype-slug`, `remark-gfm`, `lucide-react`, `clsx`, `tailwind-merge`, `@supabase/ssr`.

## ARCHITETTURA: "CONTENUTI COME FILE, DATI COME DATABASE"

- Le **lezioni** vivono in file MDX su filesystem (versionabili su Git, revisionabili come testo)
- Tutto ciò che è **dinamico** (progresso utente, quiz attempts, survey) vive in Supabase
- Rendering: **SSG per lezioni** (indicizzabili SEO), **SSR per dashboard** (personalizzata)

## STRUTTURA CARTELLE DA CREARE

```
guirimi/
│
├── public/
│   ├── fonts/
│   └── images/
│       ├── diagrams/          # SVG diagrammi interattivi
│       ├── icons/
│       └── og/                # Open Graph images
│
├── content/                   # ◼ TUTTO IL CONTENUTO DIDATTICO
│   ├── areas.json             # Registry delle 6 aree disciplinari
│   │
│   ├── area-1-fondamenta/
│   │   ├── _area.json         # Metadata area
│   │   ├── mod-1.1-cose-il-diritto/
│   │   │   ├── _module.json   # Metadata modulo
│   │   │   ├── lez-1.1.1-perche-esistono-le-regole.mdx
│   │   │   ├── lez-1.1.2-diritto-oggettivo-soggettivo.mdx
│   │   │   └── lez-1.1.3-pubblico-vs-privato.mdx
│   │   ├── mod-1.2-fonti-del-diritto/
│   │   │   ├── _module.json
│   │   │   ├── lez-1.2.1-da-dove-viene-la-legge.mdx
│   │   │   ├── lez-1.2.2-gerarchia-delle-fonti.mdx
│   │   │   ├── lez-1.2.3-leggi-decreti-regolamenti.mdx
│   │   │   └── lez-1.2.4-fonti-europee-internazionali.mdx
│   │   └── mod-1.3-leggere-una-norma/
│   │       ├── _module.json
│   │       ├── lez-1.3.1-anatomia-articolo-legge.mdx
│   │       ├── lez-1.3.2-interpretazione.mdx
│   │       └── lez-1.3.3-giurisprudenza.mdx
│   │
│   ├── area-2-costituzionale/
│   │   ├── _area.json
│   │   ├── mod-2.1-costituzione-italiana/    (3 lezioni)
│   │   ├── mod-2.2-organi-dello-stato/       (3 lezioni)
│   │   ├── mod-2.3-autonomie-territoriali/   (2 lezioni)
│   │   └── mod-2.4-elezioni-partecipazione/  (3 lezioni)
│   │
│   ├── area-3-privato-civile/
│   │   ├── _area.json
│   │   ├── mod-3.1-persone-capacita/         (2 lezioni)
│   │   ├── mod-3.2-contratto/                (3 lezioni)
│   │   ├── mod-3.3-obbligazioni/             (3 lezioni)
│   │   ├── mod-3.4-responsabilita-civile/    (3 lezioni)
│   │   ├── mod-3.5-proprieta-diritti-reali/  (2 lezioni)
│   │   └── mod-3.6-famiglia-successioni/     (3 lezioni)
│   │
│   ├── area-4-penale/
│   │   ├── _area.json
│   │   ├── mod-4.1-reato-struttura/          (3 lezioni)
│   │   ├── mod-4.2-pena-misure/              (2 lezioni)
│   │   ├── mod-4.3-diritti-imputato/         (3 lezioni)
│   │   └── mod-4.4-reati-comuni/             (2 lezioni)
│   │
│   ├── area-5-amministrativo/
│   │   ├── _area.json
│   │   ├── mod-5.1-pubblica-amministrazione/ (3 lezioni)
│   │   ├── mod-5.2-cittadino-e-pa/           (3 lezioni)
│   │   └── mod-5.3-diritto-lavoro/           (2 lezioni)
│   │
│   ├── area-6-sistema-giudiziario/
│   │   ├── _area.json
│   │   ├── mod-6.1-ordine-giudiziario/       (3 lezioni)
│   │   ├── mod-6.2-processo-pratica/         (3 lezioni)
│   │   └── mod-6.3-quando-serve-avvocato/    (2 lezioni)
│   │
│   └── glossary/
│       └── terms.json          # Tutti i termini giuridici
│
├── src/
│   ├── app/                    # ◼ NEXT.JS APP ROUTER
│   │   ├── layout.tsx          # Root layout (font, theme)
│   │   ├── page.tsx            # Landing page
│   │   │
│   │   ├── (public)/           # Route group — pagine pubbliche
│   │   │   ├── glossario/page.tsx
│   │   │   └── chi-siamo/page.tsx
│   │   │
│   │   ├── (auth)/             # Route group — autenticazione
│   │   │   ├── login/page.tsx
│   │   │   ├── registrazione/page.tsx
│   │   │   └── onboarding/page.tsx       # Scelta profilo → percorso
│   │   │
│   │   ├── (app)/              # Route group — area autenticata
│   │   │   ├── layout.tsx      # Layout con sidebar/nav
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── percorso/page.tsx
│   │   │   ├── learn/
│   │   │   │   ├── page.tsx              # Elenco aree
│   │   │   │   ├── [areaSlug]/page.tsx   # Moduli dell'area
│   │   │   │   ├── [areaSlug]/[moduleSlug]/page.tsx
│   │   │   │   └── [areaSlug]/[moduleSlug]/[lessonSlug]/page.tsx  # ◼ LESSON PLAYER
│   │   │   │
│   │   │   └── profilo/page.tsx
│   │   │
│   │   ├── (admin)/admin/      # Route group — pannello admin
│   │   │   ├── page.tsx
│   │   │   ├── contenuti/page.tsx
│   │   │   ├── utenti/page.tsx
│   │   │   └── segnalazioni/page.tsx
│   │   │
│   │   └── api/                # API Routes
│   │       ├── quiz/submit/route.ts
│   │       ├── progress/update/route.ts
│   │       ├── survey/submit/route.ts
│   │       ├── glossary/search/route.ts
│   │       ├── reports/create/route.ts
│   │       └── retention/check/route.ts
│   │
│   ├── components/
│   │   ├── ui/                 # Primitivi design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── lesson/             # Componenti lezione
│   │   │   ├── LessonPlayer.tsx     # Renderer MDX completo
│   │   │   ├── LessonHeader.tsx     # Titolo + mappa posizione
│   │   │   ├── LessonNav.tsx        # Prev/Next
│   │   │   ├── HookBlock.tsx        # Blocco "perché ti importa"
│   │   │   ├── TechnicalBlock.tsx   # Versione tecnica (collapsibile)
│   │   │   ├── ExampleCard.tsx      # Card esempio reale (positivo/negativo)
│   │   │   └── ResourceFooter.tsx   # Link normativi + disclaimer
│   │   │
│   │   ├── quiz/
│   │   │   ├── QuizBlock.tsx        # Container quiz in lezione
│   │   │   ├── MCQuestion.tsx       # Domanda scelta multipla
│   │   │   ├── OpenQuestion.tsx     # Domanda aperta
│   │   │   ├── FeedbackPanel.tsx    # Feedback per errore
│   │   │   └── QuizResults.tsx      # Riepilogo risultati
│   │   │
│   │   ├── glossary/
│   │   │   ├── GlossaryTooltip.tsx  # Tooltip inline nella lezione
│   │   │   ├── GlossaryPage.tsx
│   │   │   └── GlossarySearch.tsx
│   │   │
│   │   ├── progress/
│   │   │   ├── ProgressMap.tsx      # Mappa visuale percorso
│   │   │   ├── StreakCounter.tsx
│   │   │   ├── ModuleProgress.tsx
│   │   │   └── CompletionBadge.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardHero.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   └── RecentActivity.tsx
│   │   │
│   │   └── diagrams/           # Diagrammi interattivi SVG/React
│   │       ├── HierarchyDiagram.tsx
│   │       ├── StateOrgans.tsx
│   │       ├── JudicialSystem.tsx
│   │       └── LegislativeProcess.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Client browser
│   │   │   ├── server.ts        # Client SSR
│   │   │   └── admin.ts         # Client service_role (solo server)
│   │   ├── content/
│   │   │   ├── loader.ts        # Carica/parsa MDX + metadata da filesystem
│   │   │   ├── paths.ts         # Genera percorsi personalizzati per ruolo
│   │   │   └── glossary.ts      # Carica e cerca termini
│   │   ├── quiz/
│   │   │   ├── engine.ts        # Valutazione risposte + scoring
│   │   │   └── retention.ts     # Logica retention test (scheduling +7gg)
│   │   ├── metrics/
│   │   │   ├── completion.ts
│   │   │   ├── retention.ts
│   │   │   └── efficacy.ts
│   │   ├── auth/
│   │   │   └── middleware.ts
│   │   └── utils/
│   │       ├── index.ts         # cn(), slugify(), formatDuration(), formatDate()
│   │       └── constants.ts     # SITE_NAME, LEARNING_PATHS, DISCLAIMER_TEXT, MVP_TARGETS
│   │
│   ├── hooks/
│   │   ├── useProgress.ts
│   │   ├── useQuiz.ts
│   │   ├── useGlossary.ts
│   │   └── useProfile.ts
│   │
│   ├── types/
│   │   ├── content.ts     # Area, ModuleMeta, LessonMeta, Lesson, Quiz, QuizQuestion, LearningPath
│   │   ├── user.ts        # UserRole, UserProfile, LessonProgress, QuizAttempt, RetentionTest, Report
│   │   ├── glossary.ts    # GlossaryTerm, LessonTermMap
│   │   ├── metrics.ts     # SurveyType, Survey, AggregateMetrics
│   │   └── index.ts       # Barrel export
│   │
│   ├── styles/
│   │   └── globals.css    # Tailwind + custom properties + .lesson-prose + .card + .glossary-term
│   │
│   └── middleware.ts       # Auth route protection
│
├── database/
│   ├── schema.sql          # Schema completo con enum, tabelle, indici, trigger
│   ├── seed.sql            # Dati iniziali
│   ├── rls-policies.sql    # Row Level Security
│   └── migrations/
│
├── scripts/
│   ├── validate-content.ts # Valida frontmatter MDX, quiz, glossary refs
│   └── generate-paths.ts   # Genera percorsi da content/
│
├── .env.example
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## DATA MODEL (Database Supabase)

Crea `database/schema.sql` con queste tabelle:

**`profiles`** — Profilo utente (FK → auth.users.id)
- id UUID PK, display_name TEXT, role ENUM(student/citizen/high_school/competitor/professional/creator/teacher), onboarding_completed BOOL, preferred_path TEXT[], streak_current INT, streak_best INT, last_active_at TIMESTAMPTZ, created_at, updated_at
- Trigger: crea profilo automaticamente su auth.users INSERT

**`lesson_progress`** — Progresso per lezione
- id UUID PK, user_id FK, lesson_slug TEXT, status ENUM(not_started/in_progress/completed), completed_at TIMESTAMPTZ, time_spent_seconds INT
- UNIQUE(user_id, lesson_slug)

**`quiz_attempts`** — Ogni tentativo quiz
- id UUID PK, user_id FK, lesson_slug TEXT, score DECIMAL(5,2), answers JSONB, created_at

**`surveys`** — Micro-survey self-efficacy
- id UUID PK, user_id FK, module_slug TEXT, type ENUM(self_efficacy/nps/content_feedback), score INT (1-10), comment TEXT

**`retention_tests`** — Quiz retention schedulati +7 giorni
- id UUID PK, user_id FK, lesson_slug TEXT, score DECIMAL, scheduled_at TIMESTAMPTZ, completed_at

**`reports`** — Segnalazioni utente
- id UUID PK, user_id FK, lesson_slug TEXT, type ENUM(inaccuracy/unclear/bug/suggestion), message TEXT, status ENUM(open/reviewing/resolved/dismissed)

**`glossary_terms`** — Dizionario giuridico
- id UUID PK, term TEXT UNIQUE, definition_simple TEXT, definition_technical TEXT, examples JSONB, area_slug TEXT

**`lesson_glossary_map`** — N:N lezione ↔ termine
- lesson_slug TEXT, term_id UUID FK → glossary_terms

Crea anche `database/rls-policies.sql`:
- profiles: utente legge/modifica solo il proprio
- lesson_progress, quiz_attempts, retention_tests: utente solo il proprio
- surveys, reports: utente scrive i propri, admin legge tutti
- glossary_terms: public read, admin write

## TEMPLATE LEZIONE MDX — I 7 BLOCCHI

Ogni lezione MDX ha questo frontmatter e struttura:

```mdx
---
slug: "lez-X.Y.Z"
title: "Titolo lezione"
area: "area-X-nome"
module: "mod-X.Y-nome"
order: 1
duration_minutes: 15
prerequisites: ["lez-X.Y.Z"]
next_lesson: "lez-X.Y.Z"
prev_lesson: "lez-X.Y.Z"
last_verified: "2026-02-01"
verified_by: "Avv. Rossi"
disclaimer_level: "standard"
source_refs:
  - label: "Art. X Codice Civile"
    url: "https://www.normattiva.it/..."
glossary_terms: ["termine1", "termine2"]
quiz:
  questions:
    - type: "mcq"
      prompt: "Domanda..."
      choices: ["A", "B", "C"]
      correctIndex: 1
      feedback:
        0: "Feedback se sceglie A"
        1: "Feedback se sceglie B (corretta)"
        2: "Feedback se sceglie C"
    - type: "open"
      prompt: "Domanda aperta..."
      expected_points: ["punto 1", "punto 2"]
---

<HookBlock>
"Perché ti importa" — 2-3 righe che collegano il tema alla vita reale
</HookBlock>

## Titolo sezione

Spiegazione in linguaggio quotidiano con termini wrappati in
<GlossaryTerm id="termine">termine</GlossaryTerm>.

<TechnicalBlock>
Versione tecnica con articoli di legge. Collapsibile.
</TechnicalBlock>

<ExampleCard type="positive" title="Esempio positivo">
Caso dalla vita quotidiana che funziona.
</ExampleCard>

<ExampleCard type="negative" title="Esempio negativo">
Caso che non funziona e perché.
</ExampleCard>

{/* Il QuizBlock viene renderizzato automaticamente dal frontmatter quiz */}

<ResourceFooter />
```

## COMPONENTI CUSTOM MDX (registrati nel LessonPlayer)

| Componente | Rendering |
|-----------|-----------|
| `<HookBlock>` | Box evidenziato con icona lampadina — aggancio motivazionale |
| `<GlossaryTerm id="...">` | Testo sottolineato tratteggiato → tooltip al hover/tap |
| `<TechnicalBlock>` | Sezione collapsabile "Versione tecnica" sfondo grigio |
| `<ExampleCard type="positive/negative">` | Card bordo verde (positivo) o rosso (negativo) |
| `<Diagram src="...">` | Diagramma SVG interattivo |
| `<Warning>` | Banner giallo per avvertenze |
| `<ResourceFooter />` | Link normativi + disclaimer automatico |

## DESIGN SYSTEM

**Palette**: Monocromatica scura con accenti funzionali.
- Base: nero-50 (#fafafa) → nero-950 (#0a0a0a)
- Positivo: verde (#22c55e / #15803d)
- Negativo: rosso (#ef4444 / #b91c1c)
- Avviso: ambra (#f59e0b)

**Font**: DM Sans (body), Playfair Display (display/titoli), JetBrains Mono (codice/tecnico).

**Principi UI**: mobile-first, accessibilità (focus-visible, contrasto), animazioni sottili (fadeIn, slideUp), card con shadow-card/shadow-card-hover.

## RUOLI UTENTE E PERCORSI

All'onboarding l'utente sceglie il profilo → riceve percorso personalizzato (subset di lezioni):

| Profilo | Percorso | Lezioni | Ore |
|---------|----------|---------|-----|
| Liceale | Fondamenta + Costituzione + Ord. Giudiziario | ~18 | ~5h |
| Studente 1° anno | Fondamenta + Costituzione + Privato + Penale | ~38 | ~10h |
| Cittadino | Fondamenta + Contratto + PA + Sistema Pratico | ~22 | ~6h |
| Concorsista | Curriculum completo | 63+ | ~15h+ |
| Professionista | Fondamenta + Contratto + Lavoro + Pratica | ~12 | ~3.5h |
| Creator | Percorso Cittadino + template + fonti | ~22+ | ~6h+ |

## QUIZ SYSTEM

- **MCQ**: correzione automatica con `correctIndex`, feedback pre-scritto per ogni scelta
- **Open**: auto-valutazione con `expectedPoints` mostrati dopo risposta
- **Scoring**: `(risposte corrette MCQ / totale MCQ) × 100` — domande open non influenzano score
- **Retention test**: alla completion di una lezione → schedula test a +7 giorni con subset random delle domande

## API ROUTES

| Endpoint | Metodo | Funzione |
|----------|--------|----------|
| `/api/progress/update` | POST | Aggiorna status lezione |
| `/api/quiz/submit` | POST | Salva tentativo + schedula retention |
| `/api/survey/submit` | POST | Salva risposta survey |
| `/api/glossary/search` | GET | Cerca termini (?q=) — pubblico |
| `/api/reports/create` | POST | Crea segnalazione |
| `/api/retention/check` | GET | Retention test pending |

Tutte richiedono sessione autenticata tranne glossary/search.

## METRICHE MVP (non monetizzazione)

| Metrica | Calcolo | Target |
|---------|---------|--------|
| Retention comprensione | score_retention_7gg / score_post × 100 | ≥65% |
| Completion rate | utenti ≥1 modulo completo / registrati × 100 | ≥40% |
| Time-to-value | Tempo sign-up → primo modulo completato | <3 giorni |
| Self-efficacy | Media survey score dopo primo modulo | ≥7/10 |

## CONVENZIONI

- **Cartelle**: kebab-case
- **Componenti**: PascalCase
- **Hooks**: camelCase con prefisso `use`
- **Slug lezioni**: `lez-X.Y.Z`
- **Slug moduli**: `mod-X.Y-nome`
- **Slug aree**: `area-X-nome`

## ISTRUZIONI

1. Crea TUTTI i file della struttura sopra con codice funzionante
2. Popola `content/areas.json` con le 6 aree complete
3. Popola tutti i `_area.json` e `_module.json` con metadata reali
4. Crea UNA lezione MDX completa come modello: `lez-1.1.1-perche-esistono-le-regole.mdx` con tutti i 7 blocchi, quiz funzionante, glossary terms
5. Crea le altre lezioni MDX come stub (solo frontmatter + placeholder)
6. Popola `content/glossary/terms.json` con almeno 20 termini giuridici fondamentali
7. Il `LessonPlayer.tsx` deve renderizzare MDX con `next-mdx-remote` e registrare tutti i componenti custom
8. La landing page deve essere bella e funzionale
9. Il middleware deve proteggere le route autenticate
10. Lo schema database deve essere completo con RLS policies
11. Lo script `validate-content.ts` deve controllare frontmatter, quiz, e glossary refs

Produci codice production-ready, non placeholder. Dove un componente è complesso, implementalo. Dove è semplice, implementalo comunque — no `// TODO`.
