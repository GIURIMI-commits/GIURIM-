# GIURIMì – Sezione **Corte** (Forum stile Reddit)

## Prompt Architettura Tecnica & Funzionale

> **Scopo del documento**  
> Questo prompt serve per generare l’intera architettura della sezione **/corte** di GIURIMì, ispirata a Reddit, con feed pubblico in lettura e scrittura/commenti riservati agli utenti autenticati.
>
> Il documento è pensato per essere:
> - riutilizzabile come prompt AI
> - versionabile su GitHub
> - base di allineamento tra frontend, backend e product

---

## 🎯 OBIETTIVO

Creare una sezione **/corte** che replichi l’esperienza di un forum moderno (stile Reddit), mantenendo l’identità GIURIMì:

- Lettura **libera e pubblica** dei contenuti
- Scrittura, commenti e voti **solo per utenti registrati**
- Struttura modulare, estendibile e scalabile
- Focus su studio, casi pratici, confronto civile

---

## 🧠 CONCETTO DI PRODOTTO

La **Corte** è un’aula virtuale divisa in **Aule (Rooms)** tematiche:

- Aula Penale
- Aula Civile
- Diritto Costituzionale
- Diritto UE
- AI & Digital
- Studio & Esami
- Community / Caffè Giuridico

Ogni Aula funziona come un **subreddit**.

---

## 🧩 STRUTTURA DELLA PAGINA `/corte`

Layout a **3 colonne**:

### 1️⃣ Colonna Sinistra – Sidebar Aule
- Componente: `RoomSidebar`
- Sezioni collassabili:
  - MATERIE
  - STUDIO & ESAMI
  - COMMUNITY
- Sticky su desktop

### 2️⃣ Colonna Centrale – Feed
- Barra di ricerca (discussioni, sentenze, argomenti)
- Tabs di ordinamento:
  - New (più recenti)
  - Top (più votati)
  - Hot (attività recente)
  - Most Commented
  - Unanswered
- Lista di `ThreadCard`

### 3️⃣ Colonna Destra – Avvisi
- Componente: `CourtNotice`
- Regolamento rapido
- Statistiche (utenti, thread, commenti)
- CTA discreta: “Apri una discussione” (solo loggati)

---

## 🗂️ ENTITÀ DATI (MODELLO REDDIT)

### Core
- `rooms` → Aule / Sezioni
- `threads` → Discussioni
- `comments` → Commenti (con `parent_id` per annidamento)
- `votes` → Upvote / Downvote

### Estensioni (opzionali)
- `tags` + `thread_tags`
- `bookmarks`
- `follows`

---

## 🔐 REGOLE DI ACCESSO

### Lettura
- Pubblica per chiunque (no login)

### Scrittura
- Solo utenti autenticati possono:
  - creare thread
  - commentare
  - votare

### Moderazione (future)
- lock thread
- remove
- pin

---

## 🛡️ SICUREZZA & RLS (Supabase)

- **RLS attivo su tutte le tabelle**
- Ogni utente può:
  - modificare solo i propri thread/commenti
  - votare una sola volta per target
- I thread rimossi non sono visibili pubblicamente

---

## 📊 FEED & ORDINAMENTO

### New
- `created_at DESC`

### Top
- `score DESC`
- finestra temporale (7d / 30d / all-time)

### Hot
- `last_activity_at DESC`

### Most Commented
- `comments_count DESC`

### Unanswered
- `comments_count = 0`

---

## 📈 STATISTICHE THREAD (MVP)

Utilizzare una **VIEW**:
- upvotes
- downvotes
- score
- comments_count

Oppure (scalabile): denormalizzazione con trigger.

---

## 🌐 ROUTING NEXT.JS

- `/corte` → feed globale
- `/corte/r/[roomSlug]` → feed Aula
- `/corte/t/[threadId]` → thread + commenti
- `/corte/nuovo` → crea thread (protetto)

---

## 🧱 COMPONENTI FRONTEND

- `RoomSidebar`
- `CourtFiltersTabs`
- `ThreadCard`
- `VoteControl`
- `ThreadComposer`
- `CommentComposer`
- `CommentTree`
- `CourtNotice`

Tutti i componenti devono:
- usare Card / grid
- seguire palette GIURIMì (bianco / grigio / nero)

---

## ✍️ COMPORTAMENTO UX

- Se NON loggato:
  - feed leggibile
  - CTA → “Accedi per scrivere”

- Se loggato:
  - accesso a scrittura e commenti

---

## 🧠 TIPO DI CONTENUTO

- Testo in **Markdown** (consigliato)
- Sanitizzazione server-side per evitare XSS

---

## 📤 OUTPUT RICHIESTO (PER L’AI)

L’AI deve generare:

1. SQL completo (tabelle + tipi + indici)
2. Policy RLS
3. VIEW `thread_stats`
4. Query Supabase per ogni tab del feed
5. Componenti TSX essenziali
6. Note di estensione (moderazione, report, pin)

---

## 🧪 VINCOLI

- No dark patterns
- No gamification tossica
- Tono civile e professionale
- Coerenza con missione educativa GIURIMì

---

## ▶️ PROMPT FINALE

> Agisci come senior full-stack engineer (Next.js App Router + Supabase Postgres/RLS).
> Implementa la sezione **/corte** di GIURIMì seguendo integralmente questa specifica.
> Genera codice pronto all’uso, modulare e commentato.

