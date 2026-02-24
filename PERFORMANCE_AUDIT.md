# 🚀 PERFORMANCE AUDIT & REFACTORING PLAN: GIURIMÌ

**Target:** Next.js 16 (App Router), React 18+, TypeScript, Tailwind CSS, Supabase, Framer Motion
**Obiettivi:** Lighthouse 95-100, FCP < 1.2s, TTFB < 200ms, -40% JS Bundle Size.

---

## 🔬 1. AUDIT CONCETTUALE COMPLETO

### Colli di Bottiglia Attuali
1. **Hydration Cost Eccessiva:** Molti componenti contenitore (es. `LessonPlayer`) probabilmente usano `"use client"` troppo in alto nell'albero React. Questo costringe il browser a scaricare il JS per idratare *tutto* il testo MDX (paragrafi, span), bloccando il main thread.
2. **Framer Motion Overhead:** Importare `framer-motion` globale scarica ~30/40kb (gzip) di bundle. Usarlo su semplici testi heading deprime il First Contentful Paint.
3. **Mappa & Canvas Iniziale:** Se la mappa interattiva D3/Canvas viene caricata immediatamente, drena CPU durante il parsing JS, penalizzando il Total Blocking Time (TBT).
4. **Fuzzy Search Cost:** Inizializzare `fuse.js` o simili al mount dell'header/navbar significa processare l'indice prima che l'utente ci clicchi.
5. **Supabase Client Injection:** Chiamate Auth o API bloccanti durante la prima fase di mount.

---

## 🏗️ 2. OTTIMIZZAZIONI STRUTTURALI (App Router)

- **Push "use client" as far down as possible (Leaf Node pattern):** Se una Sidebar ha uno stato aperto/chiuso, NON far diventare l'intero layout client. Passa i link statici come `children` dentro il wrapper cliente della sidebar.
- **Dynamic Imports aggressivi:** Usa `next/dynamic` per i componenti pesanti.
- **React Server Components (RSC) by default:** I parser MDX devono elaborare il markdown SOLO lato server. La lezione arriva sul client in puro HTML.

---

## 🎯 3. OTTIMIZZAZIONI SPECIFICHE PER MODULO

### A. MDX Parsing & React Server Components
Se usi `next-mdx-remote`, passa alla versione `/rsc`. I custom components passati all'MDX (come `<AnimatedSchema />` o `<Quiz />`) dovranno avere il loro direttivo `"use client"` interno, mentre il resto del testo resta Server Component nudo.

### B. Mappa Canvas Interattiva (Lazy)
La mappa deve essere rigorosamente splittata.
```tsx
const MapCanvas = dynamic(() => import('@/components/map/MapCanvas'), {
  ssr: false,
  loading: () => <MapSkeleton /> 
});
```

### C. Search Fuzzy Engine (Load On Demand)
Ritardare il fetch dell'indice e l'istanza del motore di ricerca al passaggio del mouse sull'input o al focus.
```tsx
const handleSearchFocus = async () => {
    // Import dinamico del motore fuzzy solo quando serve
    const Fuse = (await import('fuse.js')).default;
    const index = await fetch('/api/search-index').then(r => r.json());
    // Inizializza
}
```

### D. Supabase Tracking 
Per il tracciamento dei progressi, separa la logica in un componente invisibile, montato on-scroll o on-idle.

---

## ⚡ 4. STRATEGIA "ZERO JS ABOVE THE FOLD"

L'obiettivo è inviare puro HTML/CSS per i primi 600px di schermo:
1. **Hero Statico:** Rimuovi Framer Motion dal titolo della lezione. Usa normali animazioni CSS `@keyframes fadeIn { ... }`.
2. **Lezione Iniziale Solo HTML:** Il wrapper del contenuto deve renderizzare il primo text block *prima* di qualsiasi script esecutivo.
3. **Defer Interactivity:** I bottoni (es. "Completato", "Quiz") si trovano of-the-fold e si idrateranno mentre l'utente legge i primi paragrafi.

---

## 🖼️ 5. OTTIMIZZAZIONE IMMAGINI

* Usa `priority={true}` e `fetchPriority="high"` **SOLO** per la LCP image (es. Hero Header o prima dashboard image).
* Per le icone Lucide, assicurati di usare i named exports `import { Icon } from 'lucide-react'` così Next/Turbopack può fare il **Tree Shaking** automatico rimuovendo il SVG intero.

---

## 🧹 6. CACHING E CSS

* **React Cache per Curriculum Loader:** Attualmente la libreria loader rilegge il file system per ogni pagina SSG. Avvolgi le funzioni in `cache()`.
```tsx
import { cache } from 'react';
export const getCurriculum = cache(async () => { /* fs.readFileSync... */ });
```
* **SSG per le route dinamiche:** Continua a usare `generateStaticParams`. Per le UI personalizzate per utente (es. la progress bar percentuale), usa un "Skeleton Layout" e poi fai data fetching client-side o scarica la logica in Server Actions dentro form/suspense.

---

## 🛠️ 7. PIANO DI RIDUZIONE JS DEL 40% (Codice)

Ecco come sostituire import pesanti e minimizzare il re-render:

### Tree Shaking Aggressivo & Suspanse
Invece di esportare un grosso tab-panel interattivo, sospendiamolo.

```tsx
// ❌ Prima (Blocca l'hydration e appesantisce il bundle iniziale)
import { GlossarioInterattivo } from '@/components/Glossario';

export default function LezionePage() {
   return <div> <Testo/> <GlossarioInterattivo /> </div>
}

// ✅ Dopo (Lazy Load + Suspense Bounday)
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const LazyGlossario = dynamic(() => import('@/components/Glossario').then(mod => mod.GlossarioInterattivo), {
   ssr: false, // Nessun bisogno sul server per tool interattivi secondari
});

export default function LezionePage() {
   return (
       <div>
           <TestoRSC />
           <Suspense fallback={<Skeleton className="h-40 w-full" />}>
               <LazyGlossario />
           </Suspense>
       </div>
   )
}
```

### Minimizzazione Framer Motion
Se ti servono solo varianti base, usa `m` tag animati feature-scoped invece di `motion`.
```tsx
import { m, LazyMotion, domAnimation } from "framer-motion"

// In _app o Layout radice avvolgi con LazyMotion
<LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```
Questo riduce Framer Motion da ~30kb a ~13kb.

---

## 📋 8. CHECKLIST OPERATIVA E PRIORITÀ

### FASE 1: Quick Wins (1 Giorno) -> Impatto LCP/FCP: Alto
- [ ] Rimuovere Framer Motion dai Titoli Above-The-Fold delle lezioni (usare Tailwind `animate-fade-in`).
- [ ] Aggiungere React `cache()` alle funzioni di file-system in `/lib/content/loader.ts`.
- [ ] Sostituire le immagini eroe per avere `fetchPriority="high"`.
- [ ] Assicurarsi che i pacchetti SVG (lucide) non vengano inclusi interi.

### FASE 2: Medio Impatto (1 Settimana) -> Impatto TBT: Altissimo
- [ ] Re-ingegnerizzare i layout spostando `use client` dal `layout.tsx` globale ai soli micro-componenti (es. `ThemeToggle`, `AuthButton`).
- [ ] Splittare l'interaccia della **Mappa Interattiva** con `next/dynamic { ssr: false }`.
- [ ] Configurare `LazyMotion` per Framer Motion rimuovendo `import { motion }`.

### FASE 3: Refactor Profondo (1 Mese) -> Riduzione Bundle Totale: -40%
- [ ] Riscrittura dell'End-to-End dell'MDX engine (da client full a next-mdx-remote/rsc).
- [ ] Refactoring del sistema di ricerca globale (Search index loaded on focus).
- [ ] Ottimizzazione chiamate RPC Supabase raggruppando letture dei Progressi.

---
**Stima Impatto su Core Web Vitals a regime:**
* **First Contentful Paint (FCP):** da ~1.8s a **0.8s** (grazie a Zero JS above the fold).
* **Largest Contentful Paint (LCP):** da ~2.5s a **1.0s** (grazie a Priority Images & RSC).
* **Total Blocking Time (TBT):** da ~300ms a **< 50ms** (grazie alla rimozione del parser fuzzy iniziale e defer della Mappa).
* **Cumulative Layout Shift (CLS):** mantenuto a **0.00** usando gli scheletri nei Suspense boundaries.
