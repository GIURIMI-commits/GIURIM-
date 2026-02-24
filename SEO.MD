Perfetto.
Qui sotto trovi un **file completo `ROADMAP-SEO.md` pronto da inserire nel repository**.

È scritto come documento tecnico-operativo per il team, con checklist implementativa, struttura file, snippet e strategia di dominio aggressiva per il settore giuridico.

---

````md
# ROADMAP-SEO.md
# GIURIMÌ — Strategia SEO Tecnica & Strutturale (Next.js App Router)

Versione: 1.0  
Obiettivo: Costruire un'infrastruttura SEO scalabile, aggressiva e automatizzata per dominare il traffico informativo giuridico italiano.

---

# 🎯 OBIETTIVO STRATEGICO

Posizionare GIURIMÌ come:

- Autorità didattica nel diritto italiano
- Fonte strutturata per definizioni giuridiche
- Hub educativo premium (E-E-A-T strong)
- Dominio con architettura SEO-first

---

# 🧠 1. ARCHITETTURA SEO TARGET

Il sito è strutturato in:

- `/` → Homepage (Brand + Query generiche)
- `/learn/[area]` → Pillar Pages
- `/learn/[area]/[modulo]` → Topic Cluster
- `/learn/[area]/[modulo]/[lezione]` → Long-tail SEO pages
- `/glossario/[termine]` → Position Zero Pages
- `/mappa` → Asset virale linkabile
- `/fonti` → Trust & E-E-A-T Page

NON indicizzare:

- `/dashboard`
- `/profile`
- `/login`
- `/register`
- `/api/*`
- rotte di ricerca client-side

---

# ⚙️ 2. SEO TECNICA — IMPLEMENTAZIONE OBBLIGATORIA

## 2.1 generateMetadata() dinamico per ogni lezione

Ogni file lezione deve usare:

- title dinamico
- description dinamica
- canonical
- openGraph
- twitter card
- image dinamica

Fonte dati: Frontmatter MDX

---

## 2.2 Static Site Generation (SSG)

Tutte le lezioni devono usare:

```ts
export async function generateStaticParams()
````

Risultato:

* HTML pre-renderizzato
* PageSpeed 95+
* Crawl facilissimo per Google

---

## 2.3 Sitemap automatica

Creare:

```
/app/sitemap.ts
```

Deve includere:

* tutte le lezioni
* tutte le pagine area
* tutte le pagine modulo
* tutto il glossario

Nessuna sitemap manuale.

---

## 2.4 robots.ts

```
/app/robots.ts
```

Allow:

* learn
* glossario
* mappa
* fonti

Disallow:

* dashboard
* profile
* login
* register
* search

---

# 🧬 3. STRUTTURA METADATA STANDARD

## 3.1 Title formula (Lezione)

```
[Titolo Lezione] | GIURIMÌ
```

Esempio:
"Cos'è il Dolo nel Diritto Penale | GIURIMÌ"

---

## 3.2 Meta Description formula

Max 155 caratteri.

Formato:

```
Scopri cos'è [keyword]. Spiegazione chiara e strutturata di diritto italiano su GIURIMÌ.
```

---

## 3.3 Canonical obbligatorio

Ogni pagina deve avere:

```
<link rel="canonical" href="URL-assoluto" />
```

---

# 🧠 4. STRUTTURE JSON-LD (Schema.org)

## 4.1 Lezioni

Tipo:

```
EducationalArticle
```

Campi minimi:

* headline
* description
* author (Organization)
* publisher
* datePublished
* dateModified
* mainEntityOfPage
* educationalLevel

---

## 4.2 Glossario

Tipo:

```
DefinedTerm
```

Obiettivo:
Featured Snippet (Position Zero)

---

## 4.3 Area Page

Tipo:

```
Course
```

Campi:

* name
* description
* provider
* hasCourseInstance

---

## 4.4 Breadcrumb JSON-LD

Struttura:

Home → Area → Modulo → Lezione

Google ama breadcrumb strutturati.

---

# 🏗️ 5. ARCHITETTURA A CLUSTER (TOPICAL AUTHORITY)

GIURIMÌ deve essere strutturato così:

AREA = Pillar Page
MODULO = Topic Cluster
LEZIONE = Long-tail

Esempio:

Diritto Penale
├── Struttura del Reato
│       ├── Cos'è il Reato
│       ├── Dolo e Colpa
│       ├── Cause di Giustificazione

Ogni lezione deve linkare:

* Lezione precedente
* Lezione successiva
* Area di appartenenza

Internal linking = aumento ranking.

---

# 🧠 6. STRATEGIA KEYWORD

Tipologie:

1. Informational:

   * Cos'è il dolo
   * Differenza tra nullità e annullabilità
   * Come funziona il ricorso al TAR

2. Commercial soft:

   * Corso diritto penale online
   * Studiare diritto base

3. Featured snippet:

   * Definizione legittima difesa
   * Significato reato

---

# 🚀 7. STRATEGIA FUNNEL ORGANICO

Fase 1:
Utente cerca "Differenza tra reato e illecito"

Fase 2:
Atterra su lezione SEO-ottimizzata

Fase 3:
Mid-article soft lock:

* Registrazione gratuita per completare
  oppure
* Gamification (Segna come completato)

Fase 4:
Conversione → Dashboard → Retention

SEO non serve solo traffico.
Serve acquisizione utenti.

---

# 🧪 8. E-E-A-T (TRUST STRATEGY)

Creare pagina:

```
/fonti
```

Contenuti:

* Metodologia didattica
* Fonti primarie (Normattiva, Costituzione)
* Processo di verifica
* Aggiornamento data revisione
* Autori e revisori

Google per diritto è severissimo.
Serve trust alto.

---

# 📊 9. KPI DA MONITORARE

* CTR su query definizione
* Impression su long-tail
* Tempo medio su pagina
* Scroll depth
* Conversione da SEO

Strumenti:

* Google Search Console
* GA4
* Ahrefs / SEMrush

---

# 🔥 10. FASE 2 (ADVANCED SEO)

## 10.1 Open Graph dinamico

Implementare:

```
/app/api/og/route.ts
```

Generazione automatica immagini per share.

---

## 10.2 FAQ schema inside lessons

Per alcune lezioni inserire:

```
FAQPage JSON-LD
```

Obiettivo:
Domande a tendina direttamente su Google.

---

## 10.3 Article freshness update

Ogni volta che si aggiorna:

```
last_verified
```

Aggiornare:

* dateModified JSON-LD
* sitemap lastModified

Google premia aggiornamenti continui.

---

# 🛑 11. NOINDEX STRATEGY

Aggiungere meta robots noindex a:

* dashboard
* profile
* login
* search
* api routes

Proteggere crawl budget.

---

# 🧱 12. ORDINE DI IMPLEMENTAZIONE (PRIORITÀ)

FASE 1 (Fondamentale):

* generateMetadata
* sitemap
* robots
* JSON-LD lezione
* SSG completo

FASE 2:

* Glossario SEO
* Breadcrumb JSON-LD
* Internal linking automatico

FASE 3:

* OG generativo
* FAQ snippet
* Funnel conversion SEO

---

# 🧠 13. POSIZIONAMENTO STRATEGICO

Non competiamo con:

* Brocardi (database normativo)
* Altalex (commento tecnico per avvocati)

Competiamo su:

* Spiegazione chiara
* Educazione interattiva
* Percorso guidato
* UX moderna

Google premia:
Struttura + chiarezza + velocità + topical depth.

GIURIMÌ ha tutto per dominare.

---

# 🎯 OBIETTIVO 12 MESI

* 300+ lezioni indicizzate
* 500+ pagine glossario
* Top 3 su 100+ query definizione
* Autorità tematica consolidata

---

FINE DOCUMENTO

```

---

Se vuoi, nel prossimo step posso:

- Scriverti la **versione tecnica pronta da incollare in Next.js**
- Oppure costruire una **strategia di dominazione SERP per area (Penale / Civile / Costituzionale)** con keyword cluster reali.
```
