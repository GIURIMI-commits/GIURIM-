<p align="center">
  <img src="https://img.shields.io/badge/GUIRIM%C3%AC-Architettura_Tecnica-1a1a1a?style=for-the-badge&labelColor=000000&color=333333" alt="GUIRIMì Architecture" height="36"/>
</p>

<h1 align="center">STRUCTURE.md</h1>

<p align="center">
  <strong>Architettura tecnica del MVP</strong><br/>
  <sub>Struttura cartelle · Data model · Componenti · Content pipeline · Deploy</sub>
</p>

<br/>

---

<br/>

## Indice

```
 01 ─── Panoramica Architetturale
 02 ─── Struttura Cartelle
 03 ─── Data Model (Schema Database)
 04 ─── Componenti Principali
 05 ─── Content Pipeline (MDX)
 06 ─── Sistema Quiz
 07 ─── Glossario
 08 ─── Autenticazione e Sicurezza
 09 ─── Metriche e Survey
 10 ─── API Routes
 11 ─── Deploy e Infrastruttura
 12 ─── Convenzioni di Codice
```

<br/>

---

<br/>

## 01 — Panoramica Architetturale

GUIRIMì è una **web app mobile-first** costruita su Next.js App Router. L'architettura segue il principio "contenuti come file, dati come database": le lezioni vivono in MDX (versionabili su Git, revisionabili come testo), mentre tutto ciò che è dinamico (progresso utente, quiz, survey) vive in Supabase.

```
┌──────────────────────────────────────────────────────────────┐
│                        UTENTE                                │
│                          │                                   │
│                    ┌─────▼─────┐                             │
│                    │  Next.js  │                             │
│                    │  Frontend │                             │
│                    └─────┬─────┘                             │
│                          │                                   │
│          ┌───────────────┼───────────────┐                   │
│          │               │               │                   │
│   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐           │
│   │    MDX      │ │  Supabase   │ │   Resend    │           │
│   │  Content    │ │  (Postgres  │ │   (Email)   │           │
│   │  Engine     │ │   + Auth)   │ │             │           │
│   └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                              │
│   ┌─────────────┐ ┌─────────────┐                            │
│   │  PostHog    │ │   Vercel    │                            │
│   │  Analytics  │ │   Deploy    │                            │
│   └─────────────┘ └─────────────┘                            │
└──────────────────────────────────────────────────────────────┘
```

**Decisioni chiave:**

| Decisione | Scelta | Perché |
|:----------|:-------|:-------|
| Contenuti | MDX su filesystem | Versionabili, revisionabili, zero costo DB per testo statico |
| Dati dinamici | Supabase (PostgreSQL) | Auth + RLS + real-time gratis, scalabile |
| Rendering | SSG per lezioni, SSR per dashboard | Lezioni indicizzabili (SEO), dashboard personalizzata |
| Stile | Tailwind CSS | Design system rapido, coerente, utility-first |
| Deploy | Vercel | Zero-config con Next.js, preview per ogni PR |

<br/>

---

<br/>

## 02 — Struttura Cartelle

```
guirimi/
│
├── public/
│   ├── fonts/                        # Font locali (Inter, system)
│   ├── images/
│   │   ├── diagrams/                 # SVG diagrammi (gerarchia fonti, organi Stato...)
│   │   ├── icons/                    # Icone UI
│   │   └── og/                       # Open Graph images per social
│   └── favicon.ico
│
├── content/                          # ◼ TUTTO IL CONTENUTO DIDATTICO
│   │
│   ├── areas.json                    # Registry delle 6 aree disciplinari
│   │
│   ├── area-1-fondamenta/
│   │   ├── _area.json                # Metadata area (titolo, descrizione, prerequisiti)
│   │   │
│   │   ├── mod-1.1-cosè-il-diritto/
│   │   │   ├── _module.json          # Metadata modulo (titolo, ordine, descrizione)
│   │   │   ├── lez-1.1.1-perché-esistono-le-regole.mdx
│   │   │   ├── lez-1.1.2-diritto-oggettivo-soggettivo.mdx
│   │   │   └── lez-1.1.3-pubblico-vs-privato.mdx
│   │   │
│   │   ├── mod-1.2-fonti-del-diritto/
│   │   │   ├── _module.json
│   │   │   ├── lez-1.2.1-da-dove-viene-la-legge.mdx
│   │   │   ├── lez-1.2.2-gerarchia-delle-fonti.mdx
│   │   │   ├── lez-1.2.3-leggi-decreti-regolamenti.mdx
│   │   │   └── lez-1.2.4-fonti-europee-internazionali.mdx
│   │   │
│   │   └── mod-1.3-leggere-una-norma/
│   │       ├── _module.json
│   │       ├── lez-1.3.1-anatomia-articolo-legge.mdx
│   │       ├── lez-1.3.2-interpretazione.mdx
│   │       └── lez-1.3.3-giurisprudenza.mdx
│   │
│   ├── area-2-costituzionale/
│   │   ├── _area.json
│   │   ├── mod-2.1-costituzione-italiana/
│   │   ├── mod-2.2-organi-dello-stato/
│   │   ├── mod-2.3-autonomie-territoriali/
│   │   └── mod-2.4-elezioni-partecipazione/
│   │
│   ├── area-3-privato-civile/
│   │   ├── _area.json
│   │   ├── mod-3.1-persone-capacità/
│   │   ├── mod-3.2-contratto/
│   │   ├── mod-3.3-obbligazioni/
│   │   ├── mod-3.4-responsabilità-civile/
│   │   ├── mod-3.5-proprietà-diritti-reali/
│   │   └── mod-3.6-famiglia-successioni/
│   │
│   ├── area-4-penale/
│   │   ├── _area.json
│   │   ├── mod-4.1-reato-struttura/
│   │   ├── mod-4.2-pena-misure/
│   │   ├── mod-4.3-diritti-imputato/
│   │   └── mod-4.4-reati-comuni/
│   │
│   ├── area-5-amministrativo/
│   │   ├── _area.json
│   │   ├── mod-5.1-pubblica-amministrazione/
│   │   ├── mod-5.2-cittadino-e-pa/
│   │   └── mod-5.3-diritto-lavoro/
│   │
│   ├── area-6-sistema-giudiziario/
│   │   ├── _area.json
│   │   ├── mod-6.1-ordine-giudiziario/
│   │   ├── mod-6.2-processo-pratica/
│   │   └── mod-6.3-quando-serve-avvocato/
│   │
│   └── glossary/
│       └── terms.json                # Tutti i termini del glossario
│
├── src/
│   │
│   ├── app/                          # ◼ NEXT.JS APP ROUTER
│   │   │
│   │   ├── layout.tsx                # Root layout (font, theme, analytics)
│   │   ├── page.tsx                  # Landing page
│   │   │
│   │   ├── (public)/                 # Route group — pagine pubbliche
│   │   │   ├── glossario/
│   │   │   │   └── page.tsx          # Glossario consultabile A-Z
│   │   │   └── chi-siamo/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (auth)/                   # Route group — autenticazione
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── registrazione/
│   │   │   │   └── page.tsx
│   │   │   └── onboarding/
│   │   │       └── page.tsx          # Scelta profilo + percorso suggerito
│   │   │
│   │   ├── (app)/                    # Route group — area autenticata
│   │   │   ├── layout.tsx            # Layout con sidebar/nav
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Progresso, streak, prossimi passi
│   │   │   ├── percorso/
│   │   │   │   └── page.tsx          # Mappa del percorso personalizzato
│   │   │   ├── learn/
│   │   │   │   ├── page.tsx          # Elenco aree
│   │   │   │   ├── [areaSlug]/
│   │   │   │   │   ├── page.tsx      # Elenco moduli dell'area
│   │   │   │   │   └── [moduleSlug]/
│   │   │   │   │       ├── page.tsx  # Elenco lezioni del modulo
│   │   │   │   │       └── [lessonSlug]/
│   │   │   │   │           └── page.tsx  # ◼ LESSON PLAYER
│   │   │   │   └── quiz/
│   │   │   │       └── [lessonSlug]/
│   │   │   │           └── page.tsx  # Quiz standalone (retention test)
│   │   │   └── profilo/
│   │   │       └── page.tsx          # Impostazioni utente
│   │   │
│   │   ├── (admin)/                  # Route group — pannello admin
│   │   │   └── admin/
│   │   │       ├── page.tsx          # Dashboard admin
│   │   │       ├── contenuti/
│   │   │       │   └── page.tsx      # Gestione lezioni e moduli
│   │   │       ├── utenti/
│   │   │       │   └── page.tsx      # Statistiche utenti
│   │   │       └── segnalazioni/
│   │   │           └── page.tsx      # Feedback e segnalazioni
│   │   │
│   │   └── api/                      # API Routes
│   │       ├── quiz/
│   │       │   └── submit/route.ts   # Salva tentativo quiz
│   │       ├── progress/
│   │       │   └── update/route.ts   # Aggiorna progresso lezione
│   │       ├── survey/
│   │       │   └── submit/route.ts   # Salva survey self-efficacy
│   │       └── glossary/
│   │           └── search/route.ts   # Ricerca termini glossario
│   │
│   ├── components/                   # ◼ COMPONENTI UI
│   │   │
│   │   ├── ui/                       # Primitivi design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   ├── layout/                   # Struttura pagina
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── lesson/                   # Componenti lezione
│   │   │   ├── LessonPlayer.tsx      # Renderer MDX completo
│   │   │   ├── LessonHeader.tsx      # Titolo + mappa posizione
│   │   │   ├── LessonNav.tsx         # Prev/Next lezione
│   │   │   ├── HookBlock.tsx         # Blocco "perché ti importa"
│   │   │   ├── TechnicalBlock.tsx    # Versione tecnica con art. legge
│   │   │   ├── ExampleCard.tsx       # Card esempio reale
│   │   │   └── ResourceFooter.tsx    # Link + disclaimer
│   │   │
│   │   ├── quiz/                     # Componenti quiz
│   │   │   ├── QuizBlock.tsx         # Container quiz dentro lezione
│   │   │   ├── MCQuestion.tsx        # Domanda a risposta multipla
│   │   │   ├── OpenQuestion.tsx      # Domanda aperta
│   │   │   ├── FeedbackPanel.tsx     # Feedback per risposta sbagliata
│   │   │   └── QuizResults.tsx       # Riepilogo risultati
│   │   │
│   │   ├── glossary/                 # Componenti glossario
│   │   │   ├── GlossaryTooltip.tsx   # Tooltip inline nella lezione
│   │   │   ├── GlossaryPage.tsx      # Pagina glossario completa
│   │   │   └── GlossarySearch.tsx    # Ricerca termini
│   │   │
│   │   ├── progress/                 # Componenti progresso
│   │   │   ├── ProgressMap.tsx       # Mappa visuale del percorso
│   │   │   ├── StreakCounter.tsx     # Contatore giorni consecutivi
│   │   │   ├── ModuleProgress.tsx    # Barra progresso modulo
│   │   │   └── CompletionBadge.tsx   # Badge completamento
│   │   │
│   │   ├── dashboard/                # Componenti dashboard
│   │   │   ├── DashboardHero.tsx     # Welcome + next step
│   │   │   ├── StatsCards.tsx        # Lezioni completate, tempo, streak
│   │   │   └── RecentActivity.tsx    # Ultime attività
│   │   │
│   │   └── diagrams/                 # Diagrammi interattivi
│   │       ├── HierarchyDiagram.tsx  # Gerarchia fonti del diritto
│   │       ├── StateOrgans.tsx       # Organi dello Stato
│   │       ├── JudicialSystem.tsx    # Ordine giudiziario
│   │       └── LegislativeProcess.tsx # Iter legislativo
│   │
│   ├── lib/                          # ◼ LOGICA APPLICATIVA
│   │   ├── supabase/
│   │   │   ├── client.ts             # Client browser
│   │   │   ├── server.ts             # Client server (SSR)
│   │   │   └── admin.ts              # Client admin (service role)
│   │   ├── content/
│   │   │   ├── loader.ts             # Carica e parsa MDX + metadata
│   │   │   ├── paths.ts              # Genera percorsi personalizzati
│   │   │   └── glossary.ts           # Carica e cerca termini
│   │   ├── quiz/
│   │   │   ├── engine.ts             # Valutazione risposte + scoring
│   │   │   └── retention.ts          # Logica retention test (7gg)
│   │   ├── metrics/
│   │   │   ├── completion.ts         # Calcolo completion rate
│   │   │   ├── retention.ts          # Calcolo retention comprensione
│   │   │   └── efficacy.ts           # Calcolo self-efficacy score
│   │   ├── auth/
│   │   │   └── middleware.ts         # Protezione route autenticate
│   │   └── utils/
│   │       ├── dates.ts
│   │       ├── slugify.ts
│   │       └── constants.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useProgress.ts            # Hook per progress tracking
│   │   ├── useQuiz.ts                # Hook per stato quiz
│   │   ├── useGlossary.ts            # Hook per tooltip glossario
│   │   └── useProfile.ts             # Hook per profilo utente
│   │
│   ├── types/                        # TypeScript types
│   │   ├── content.ts                # Area, Module, Lesson, Quiz
│   │   ├── user.ts                   # Profile, Progress, QuizAttempt
│   │   ├── glossary.ts               # GlossaryTerm
│   │   └── metrics.ts                # Survey, MetricEvent
│   │
│   └── styles/
│       └── globals.css               # Tailwind base + custom properties
│
├── database/
│   ├── schema.sql                    # Schema completo Supabase
│   ├── seed.sql                      # Dati iniziali (moduli, glossario base)
│   ├── rls-policies.sql              # Row Level Security policies
│   └── migrations/                   # Migrazioni incrementali
│
├── scripts/
│   ├── generate-paths.ts             # Genera percorsi da content/
│   ├── validate-content.ts           # Valida MDX + quiz JSON
│   └── export-glossary.ts            # Esporta glossario per ricerca
│
├── .env.example                      # Template variabili ambiente
├── .env.local                        # Variabili locali (gitignored)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── STRUCTURE.md                      # ← Questo file
```

<br/>

---

<br/>

## 03 — Data Model (Schema Database)

Il database gestisce solo dati dinamici. I contenuti statici (lezioni, quiz) vivono in MDX/JSON su filesystem.

### Diagramma Relazioni

```
┌─────────────┐       ┌──────────────────┐       ┌──────────────┐
│   profiles   │       │ lesson_progress  │       │  quiz_attempts│
│─────────────│       │──────────────────│       │──────────────│
│ id (PK/FK)  │──┐    │ id (PK)          │       │ id (PK)      │
│ display_name│  │    │ user_id (FK)     │───┐   │ user_id (FK) │
│ role        │  ├───▶│ lesson_slug      │   │   │ lesson_slug  │
│ onboarding  │  │    │ status           │   │   │ score        │
│ created_at  │  │    │ completed_at     │   │   │ answers (JSON)│
│ updated_at  │  │    │ time_spent_sec   │   │   │ created_at   │
└─────────────┘  │    └──────────────────┘   │   └──────────────┘
                 │                            │
                 │    ┌──────────────────┐    │   ┌──────────────┐
                 │    │    surveys       │    │   │ glossary_    │
                 │    │──────────────────│    │   │ terms        │
                 ├───▶│ id (PK)          │    │   │──────────────│
                 │    │ user_id (FK)     │    │   │ id (PK)      │
                 │    │ module_slug      │    │   │ term         │
                 │    │ type             │    │   │ def_simple   │
                 │    │ score            │    │   │ def_technical│
                 │    │ created_at       │    │   │ examples     │
                 │    └──────────────────┘    │   │ area_slug    │
                 │                            │   └──────────────┘
                 │    ┌──────────────────┐    │
                 │    │   reports        │    │   ┌──────────────┐
                 └───▶│──────────────────│    │   │ lesson_terms │
                      │ id (PK)          │    │   │  (junction)  │
                      │ user_id (FK)     │    │   │──────────────│
                      │ lesson_slug      │    │   │ lesson_slug  │
                      │ type             │    │   │ term_id (FK) │
                      │ message          │    │   └──────────────┘
                      │ status           │    │
                      │ created_at       │    │
                      └──────────────────┘    │
                                              │
                      ┌──────────────────┐    │
                      │  retention_tests │    │
                      │──────────────────│    │
                      │ id (PK)          │◀───┘
                      │ user_id (FK)     │
                      │ lesson_slug      │
                      │ score            │
                      │ scheduled_at     │
                      │ completed_at     │
                      └──────────────────┘
```

### Tabelle Dettagliate

**`profiles`** — Profilo utente esteso (collegato a `auth.users` di Supabase)

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | FK → `auth.users.id` |
| `display_name` | `text` | Nome visualizzato |
| `role` | `enum` | `student` · `citizen` · `high_school` · `competitor` · `professional` · `creator` · `teacher` |
| `onboarding_completed` | `boolean` | Ha completato la scelta profilo |
| `preferred_path` | `text[]` | Array di lesson_slug del percorso suggerito |
| `streak_current` | `integer` | Giorni consecutivi di studio |
| `streak_best` | `integer` | Record personale |
| `last_active_at` | `timestamptz` | Ultimo accesso per streak |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

**`lesson_progress`** — Tracciamento progresso per lezione

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `user_id` | `uuid` FK | → `profiles.id` |
| `lesson_slug` | `text` | Slug univoco della lezione (es. `lez-1.2.1`) |
| `status` | `enum` | `not_started` · `in_progress` · `completed` |
| `completed_at` | `timestamptz` | Null se non completata |
| `time_spent_seconds` | `integer` | Tempo cumulativo sulla lezione |

**`quiz_attempts`** — Ogni tentativo di quiz

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `user_id` | `uuid` FK | → `profiles.id` |
| `lesson_slug` | `text` | Lezione a cui appartiene il quiz |
| `score` | `decimal` | Percentuale corrette (0-100) |
| `answers` | `jsonb` | `[{ questionId, selectedIndex, correct, timeMs }]` |
| `created_at` | `timestamptz` | |

**`surveys`** — Micro-survey di self-efficacy e feedback

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `user_id` | `uuid` FK | → `profiles.id` |
| `module_slug` | `text` | Modulo a cui si riferisce |
| `type` | `enum` | `self_efficacy` · `nps` · `content_feedback` |
| `score` | `integer` | Scala 1-10 |
| `comment` | `text` | Commento libero (opzionale) |
| `created_at` | `timestamptz` | |

**`retention_tests`** — Quiz di retention schedulati a 7 giorni

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `user_id` | `uuid` FK | → `profiles.id` |
| `lesson_slug` | `text` | Lezione da ri-testare |
| `score` | `decimal` | Null se non ancora fatto |
| `scheduled_at` | `timestamptz` | Data prevista (completamento + 7gg) |
| `completed_at` | `timestamptz` | Null se non ancora fatto |

**`reports`** — Segnalazioni utente (imprecisioni, bug, feedback)

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `user_id` | `uuid` FK | → `profiles.id` |
| `lesson_slug` | `text` | Lezione segnalata |
| `type` | `enum` | `inaccuracy` · `unclear` · `bug` · `suggestion` |
| `message` | `text` | Testo della segnalazione |
| `status` | `enum` | `open` · `reviewing` · `resolved` · `dismissed` |
| `created_at` | `timestamptz` | |

**`glossary_terms`** — Dizionario dei termini giuridici

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `id` | `uuid` PK | |
| `term` | `text` UNIQUE | Il termine (es. "giurisprudenza") |
| `definition_simple` | `text` | Definizione in linguaggio quotidiano |
| `definition_technical` | `text` | Definizione tecnica (opzionale) |
| `examples` | `jsonb` | `["esempio 1", "esempio 2"]` |
| `area_slug` | `text` | Area principale di appartenenza |

**`lesson_glossary_map`** — Associazione N:N lezione ↔ termine

| Campo | Tipo | Note |
|:------|:-----|:-----|
| `lesson_slug` | `text` | |
| `term_id` | `uuid` FK | → `glossary_terms.id` |

### RLS Policies

```
profiles         →  utente legge/modifica solo il proprio profilo
lesson_progress  →  utente legge/scrive solo il proprio progresso
quiz_attempts    →  utente legge/scrive solo i propri tentativi
surveys          →  utente scrive i propri; admin legge tutti
retention_tests  →  utente legge/scrive solo i propri
reports          →  utente crea i propri; admin legge tutti
glossary_terms   →  public read; admin write
```

<br/>

---

<br/>

## 04 — Componenti Principali

### LessonPlayer — Il cuore della piattaforma

Il `LessonPlayer` renderizza una lezione MDX completa, integrando tutti i 7 blocchi del template.

```
┌─────────────────────────────────────────────────────────┐
│ LessonPlayer                                            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ LessonHeader                                      │  │
│  │  Titolo · Durata · Mappa posizione                │  │
│  │  Area > Modulo > Lezione X di Y                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ HookBlock                                         │  │
│  │  "In questo momento hai almeno 3 contratti..."    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Contenuto MDX                                     │  │
│  │  Testo con GlossaryTooltip integrati              │  │
│  │  Termini evidenziati → hover/tap = definizione    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ TechnicalBlock (collapsibile)                     │  │
│  │  "Versione tecnica: Art. 1321 CC..."              │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────────────┐     │
│  │ ExampleCard #1   │  │ ExampleCard #2            │     │
│  │ Caso positivo    │  │ Caso negativo             │     │
│  └──────────────────┘  └──────────────────────────┘     │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ QuizBlock                                         │  │
│  │  3-5 domande · feedback per errore                │  │
│  │  MCQuestion · MCQuestion · OpenQuestion            │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ ResourceFooter                                    │  │
│  │  Link Normattiva · Treccani · Sportelli           │  │
│  │  ⚠ DISCLAIMER educativo                           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ LessonNav                                         │  │
│  │  ← Lezione precedente    Lezione successiva →     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### QuizBlock — Flow Interazione

```
Utente vede domanda
    │
    ├── Seleziona risposta
    │       │
    │       ├── ✓ Corretta → feedback positivo + "Bravo! Ecco perché..."
    │       │
    │       └── ✗ Sbagliata → FeedbackPanel:
    │               │   - Spiegazione dell'errore
    │               │   - Link al punto della lezione
    │               │   - Suggerimento mnemonico
    │               │
    │               └── Può riprovare (max 2 tentativi)
    │
    └── Completa tutte le domande
            │
            ├── QuizResults: punteggio + aree da rivedere
            │
            └── Salva quiz_attempt in DB
                    │
                    └── Schedula retention_test a +7 giorni
```

<br/>

---

<br/>

## 05 — Content Pipeline (MDX)

### Struttura di un File Lezione MDX

```mdx
---
# FRONTMATTER — Metadata della lezione
slug: "lez-3.2.1"
title: "Cos'è un contratto e quando è valido"
area: "area-3-privato-civile"
module: "mod-3.2-contratto"
order: 1
duration_minutes: 15
prerequisites:
  - "lez-1.2.2"          # Gerarchia delle fonti
next_lesson: "lez-3.2.2"
prev_lesson: "lez-3.1.2"
last_verified: "2026-02-01"
verified_by: "Avv. Rossi"
disclaimer_level: "standard"
source_refs:
  - label: "Art. 1321-1325 Codice Civile"
    url: "https://www.normattiva.it/..."
  - label: "Treccani — Contratto"
    url: "https://www.treccani.it/..."
glossary_terms:
  - "patrimoniale"
  - "consenso"
  - "causa"
  - "oggetto"
  - "forma"
  - "invalido"
  - "annullabile"
quiz:
  questions:
    - type: "mcq"
      prompt: "Se manca la forma richiesta dalla legge, il contratto è..."
      choices:
        - "Valido"
        - "Invalido"
        - "Sempre annullabile"
      correctIndex: 1
      feedback:
        0: "No: la forma può essere requisito essenziale."
        1: "Esatto: senza forma prescritta il contratto non produce effetti."
        2: "No: annullabile è diverso da invalido."
    - type: "mcq"
      prompt: "La differenza fra invalido e annullabile è..."
      choices:
        - "Sono la stessa cosa"
        - "Invalido = mai avuto effetto; Annullabile = ha effetto fino all'annullamento"
      correctIndex: 1
      feedback:
        0: "No: sono concetti giuridicamente distinti."
        1: "Perfetto: l'invalido è nullo dall'origine, l'annullabile nasce valido."
    - type: "open"
      prompt: "Immagina di vendere la tua bici a un amico. Dopo 5 giorni
        la catena si rompe e l'amico vuole restituirtela. Che diritti hai?
        Da quali requisiti dipende?"
      expected_points:
        - "Dipende se c'era garanzia concordata"
        - "Se verbale, più difficile provare cosa concordato"
        - "Forma scritta (anche WhatsApp) protegge entrambi"
---

<HookBlock>
In questo momento, probabilmente hai almeno tre contratti attivi senza saperlo:
il contratto del telefono, l'abbonamento alla palestra, il contratto di affitto o
di lavoro. Eppure se ti chiedessi "cos'è un contratto?", probabilmente esiteresti.
</HookBlock>

## Cos'è un contratto

Un contratto è un **accordo fra due o più persone** che crea diritti e doveri
riconosciuti dalla legge. Se uno non rispetta l'accordo, l'altro può chiedere
aiuto al tribunale.

La parola chiave è <GlossaryTerm id="patrimoniale">patrimoniale</GlossaryTerm>:
il contratto deve riguardare qualcosa che ha valore economico...

<!-- il resto della lezione continua con lo stesso pattern -->

<TechnicalBlock>
**Art. 1321 Codice Civile**: "Il contratto è l'accordo di due o più parti per
costituire, regolare o estinguere tra loro un rapporto giuridico patrimoniale."
</TechnicalBlock>

<ExampleCard type="positive" title="Contratto di locazione">
Proprietario e inquilino firmano il contratto scritto...
</ExampleCard>

<ExampleCard type="negative" title="Patto verbale tra amici per una gita">
Tre amici decidono di dividere la benzina per Roma. Se uno rinuncia,
non può essere obbligato legalmente perché...
</ExampleCard>
```

### Custom MDX Components

I componenti custom usati dentro MDX sono registrati nel `LessonPlayer`:

| Componente | Rendering |
|:-----------|:----------|
| `<HookBlock>` | Box evidenziato con icona "lampadina" — aggancio motivazionale |
| `<GlossaryTerm id="...">` | Testo sottolineato → tooltip con definizione semplice al hover/tap |
| `<TechnicalBlock>` | Sezione collassabile "Versione tecnica" con sfondo grigio chiaro |
| `<ExampleCard type="positive/negative">` | Card con bordo verde (positivo) o rosso (negativo) |
| `<Diagram src="...">` | Diagramma SVG interattivo |
| `<Warning>` | Banner giallo per avvertenze importanti |

### Validazione Contenuti

Lo script `scripts/validate-content.ts` esegue controlli su ogni file MDX:

```
✓  Frontmatter completo (tutti i campi obbligatori presenti)
✓  Quiz ha almeno 3 domande con feedback per ogni scelta
✓  Glossary terms referenziati esistono in terms.json
✓  source_refs hanno URL validi
✓  last_verified non più vecchio di 12 mesi
✓  Nessun termine tecnico non wrappato in <GlossaryTerm>
```

<br/>

---

<br/>

## 06 — Sistema Quiz

### Tipi di Domanda

| Tipo | Correzione | Feedback |
|:-----|:-----------|:---------|
| `mcq` | Automatica (correctIndex) | Pre-scritto per ogni scelta |
| `open` | Auto-valutazione con rubric | Punti attesi + spiegazione modello |

### Scoring

```
Punteggio lezione = (risposte corrette MCQ / totale MCQ) × 100

Le domande open non influenzano il punteggio numerico
ma mostrano i punti attesi per auto-valutazione.
```

### Retention Test (7 giorni)

Quando l'utente completa una lezione, il sistema schedula un `retention_test`:

```
completion_date + 7 giorni → notifica email/push:
"Ricordi cosa hai imparato su [titolo lezione]?
   Fai 3 domande veloci per verificare."

Le 3 domande sono un sottoinsieme random del quiz originale.
Il punteggio viene salvato separatamente per misurare retention.
```

<br/>

---

<br/>

## 07 — Glossario

### Struttura `terms.json`

```json
[
  {
    "id": "patrimoniale",
    "term": "Patrimoniale",
    "definition_simple": "Che ha valore economico: soldi, cose, servizi.",
    "definition_technical": "Relativo a rapporti giuridici aventi contenuto economicamente valutabile.",
    "examples": [
      "Un contratto di vendita è patrimoniale perché scambia denaro per un bene.",
      "Un patto di amicizia non è patrimoniale."
    ],
    "area": "area-3-privato-civile"
  }
]
```

### Comportamento UI

```
Desktop:  hover su termine → tooltip con definition_simple
          click → modal con definition_simple + definition_technical + examples

Mobile:   tap su termine → bottom sheet con tutte le definizioni
```

<br/>

---

<br/>

## 08 — Autenticazione e Sicurezza

### Flusso Auth

```
Registrazione
    │
    ├── Email + password (Supabase Auth)
    │
    ├── Verifica email
    │
    └── Onboarding
            │
            ├── Scelta profilo (ruolo)
            │
            ├── Generazione percorso suggerito
            │
            └── Redirect a dashboard
```

### Ruoli

| Ruolo | Permessi |
|:------|:---------|
| `user` | Leggere lezioni, fare quiz, vedere proprio progresso |
| `moderator` | User + gestire segnalazioni, rispondere in community |
| `admin` | Moderator + gestire utenti, dashboard analytics, edit glossario |

### Sicurezza

```
◼  RLS attivo su tutte le tabelle (nessun accesso cross-utente)
◼  API routes protette con session check
◼  Rate limiting su quiz submit (max 10/min per utente)
◼  Sanitizzazione input su segnalazioni e survey
◼  Nessun dato sensibile nel client (solo session token)
```

<br/>

---

<br/>

## 09 — Metriche e Survey

### Le 3 Metriche Core

| Metrica | Calcolo | Target |
|:--------|:--------|:------:|
| **Retention comprensione** | `score_retention_7gg / score_post_lezione × 100` | ≥65% |
| **Completion rate** | `utenti con ≥1 modulo completo / utenti registrati × 100` | ≥40% |
| **Self-efficacy** | Media survey score dopo primo modulo | ≥7/10 |

### Survey Self-Efficacy

Dopo il completamento del primo modulo, l'utente vede:

```
"Dopo questo modulo, ti senti più sicuro nel capire concetti legali?"

    1 ─── 2 ─── 3 ─── 4 ─── 5 ─── 6 ─── 7 ─── 8 ─── 9 ─── 10
  Per niente                                            Molto sicuro

  [Commento opzionale: ________________________________]

  [ Invia ]
```

<br/>

---

<br/>

## 10 — API Routes

| Endpoint | Metodo | Funzione |
|:---------|:------:|:---------|
| `/api/progress/update` | `POST` | Aggiorna status lezione (`in_progress` → `completed`) |
| `/api/quiz/submit` | `POST` | Salva tentativo quiz + schedula retention test |
| `/api/survey/submit` | `POST` | Salva risposta survey |
| `/api/glossary/search` | `GET` | Cerca termini (query param `?q=`) |
| `/api/reports/create` | `POST` | Crea segnalazione imprecisione |
| `/api/retention/check` | `GET` | Verifica se ci sono retention test pending |

Tutte le route richiedono sessione autenticata tranne `/api/glossary/search`.

<br/>

---

<br/>

## 11 — Deploy e Infrastruttura

### Ambienti

```
◼  development    →  localhost:3000    (Supabase local)
◼  preview        →  vercel preview   (Supabase staging)
◼  production     →  guirimi.it       (Supabase production)
```

### CI/CD Pipeline

```
Push su branch
    │
    ├── Lint + Type check (GitHub Actions)
    │
    ├── Validate content (scripts/validate-content.ts)
    │
    ├── Vercel Preview Deploy (auto)
    │
    └── Merge su main
            │
            └── Vercel Production Deploy (auto)
```

### Variabili d'Ambiente

```env
# .env.example

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_...

NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

NEXT_PUBLIC_SITE_URL=https://guirimi.it
```

<br/>

---

<br/>

## 12 — Convenzioni di Codice

### Naming

```
Cartelle:           kebab-case        (lesson-player/)
Componenti:         PascalCase        (LessonPlayer.tsx)
Hooks:              camelCase         (useProgress.ts)
Utility:            camelCase         (slugify.ts)
Tipi:               PascalCase        (LessonMeta, QuizAttempt)
Slug lezioni:       lez-X.Y.Z        (lez-3.2.1)
Slug moduli:        mod-X.Y-nome     (mod-3.2-contratto)
Slug aree:          area-X-nome      (area-3-privato-civile)
```

### Commit Messages

```
feat:     nuova funzionalità
fix:      correzione bug
content:  nuova lezione o modifica contenuto
quiz:     aggiunta/modifica quiz
docs:     documentazione
style:    formattazione (no logic change)
refactor: ristrutturazione codice
test:     aggiunta test
```

### Content Review

Ogni PR che modifica file in `content/` richiede:

```
◼  Almeno 1 review tecnica (correttezza codice)
◼  Almeno 1 review legale (correttezza contenuto) — se tocca testo lezione
◼  Validazione automatica passata (validate-content.ts)
```

<br/>

---

<br/>

<p align="center">
  <sub>
    <strong>GUIRIMì</strong> — Architettura Tecnica v1.0<br/>
    Questo documento è la mappa. Il prossimo passo è costruire.
  </sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/◼_◼_◼-1a1a1a?style=flat-square" alt=""/>
</p>
