# COSA IMPLEMENTARE SU GUIRIMì — Roadmap Funzionalità
## Analisi strategica basata su: ricerca di mercato, panorama EdTech Italia, gap competitivo

---

## IL QUADRO: COSA MANCA NEL MERCATO

Dal documento di ricerca di mercato emerge un gap chiaro: **non esiste nulla che sia contemporaneamente gratuito, verificato, interattivo, percorso-guidato e orientato all'impatto sociale.**

Le soluzioni esistenti falliscono così:
- **Brocardi/Normattiva**: profondità ma zero didattica → il principiante scappa
- **YouTube/TikTok**: accessibile ma frammentario e non verificato → entertainment, non education
- **App quiz concorsi**: practice-first, theory-second → presuppone che sai già
- **Manuali universitari**: completi ma impenetrabili per non giuristi
- **Corsi online (€1.500+)**: inaccessibili economicamente

GUIRIMì si posiziona esattamente nel buco: **education-first, gratuito, verificato, guidato, interattivo.**

---

## PRIORITÀ 1 — QUICK WINS (1-4 settimane)
*Alto impatto, basso sforzo, migliorano subito l'esperienza*

---

### 1. 🔍 Barra di Ricerca Globale
**Cosa**: Ricerca full-text su tutte le lezioni, glossario e risorse.
**Perché**: L'utente con un problema reale ("cos'è il licenziamento per giusta causa?") deve trovare la risposta in 3 secondi, non navigare 6 aree.
**Come**: Indice di ricerca lato client (Fuse.js o FlexSearch) sui contenuti MDX. Modale con `⌘K` / pulsante in header.
**Impatto**: Altissimo per il Segmento 3 (cittadini con problema concreto).

---

### 2. 📊 Barra di Progresso e Tracciamento Completamento
**Cosa**: Percentuale di completamento per area, modulo e globale. Lezioni completate con ✅.
**Perché**: La ricerca dice che il 40%+ completion rate è il target MVP. Senza visual progress, la gente abbandona.
**Come**: Stato locale (localStorage o Supabase se auth attivo). Barra di progresso nell'header della sidebar e nella pagina area.
**Impatto**: +30% retention stimata (dato tipico gamification leggera).

---

### 3. 📱 Navigazione Mobile (Bottom Sheet Lezioni)
**Cosa**: Su mobile la sidebar scompare → aggiungere bottom sheet/drawer per navigare tra lezioni.
**Perché**: Lo screenshot mostra che su mobile l'indice è inaccessibile. È un bug di UX critico.
**Come**: Bottone sticky "📑 Indice" in basso, apre drawer con elenco lezioni + stato completamento.
**Impatto**: Sblocca l'intera esperienza mobile.

---

### 4. 📚 Pagina Risorse e Letture (/risorse)
**Cosa**: Pagina dedicata con libri consigliati per area e livello + risorse gratuite online.
**Perché**: Già strutturata nel file RISORSE-LETTURE-GIURIMI.md. Aggiunge valore enorme per tutti i segmenti.
**Come**: Pagina statica con filtri per livello e area, BookCard component.
**Impatto**: SEO + credibilità accademica + valore aggiunto per utenti seri.

---

### 5. 🔗 Deep Link per Articoli di Legge
**Cosa**: Ogni `<GlossaryTerm>` o riferimento normativo (es. "art. 2094 CC") diventa un link cliccabile verso Brocardi/Normattiva.
**Perché**: L'utente curioso deve poter approfondire con un click. L'utente esperto verifica la fonte.
**Come**: Regex/parser nel MDX che trasforma "art. X CP/CC/Cost." in link automatici.
**Impatto**: Credibilità + trasparenza delle fonti (principio core di GUIRIMì).

---

## PRIORITÀ 2 — GAME CHANGERS (4-8 settimane)
*Differenziano GUIRIMì da tutto il resto, richiedono più sviluppo*

---

### 6. 🤖 "Chiedi a GIURIMì" — Assistente AI Contestuale
**Cosa**: Chatbot AI (Claude API) integrato in ogni lezione. L'utente può chiedere chiarimenti sul contenuto della lezione.
**Perché**: Dalla ricerca: il principiante ha paura di fare "domande sciocche". Un AI non giudica.
**Come**: Pulsante "💬 Non hai capito? Chiedi" in ogni lezione. Il context include il contenuto MDX della lezione corrente + glossario. System prompt che impone: risposta educativa, MAI consulenza legale, rimanda ad avvocato per casi specifici.
**Impatto**: ENORME — è la feature killer che nessun manuale, nessun YouTube, nessun Brocardi ha.
**Rischi**: Disclaimer obbligatorio ("Questo è un assistente educativo, non un avvocato").
**Costo**: Anthropic API, stimabile in base all'uso.

---

### 7. 🧭 Percorsi Personalizzati ("Cosa ti serve?")
**Cosa**: Onboarding che chiede "Perché sei qui?" e costruisce un percorso personalizzato.
**Perché**: I 4 segmenti utente hanno bisogni diversi. Lo studente vuole tutto in ordine. Il cittadino con problema vuole la risposta alla SUA domanda.
**Come**: Landing /inizia con quiz di 3 domande → suggerisce percorso:
  - "Sono curioso" → Area 1 + 2 (fondamenta)
  - "Sto studiando per l'università" → Percorso completo sequenziale
  - "Ho un problema di lavoro" → Salta a Area 5, Mod. 5.3
  - "Voglio capire i miei diritti" → Percorso trasversale: diritti fondamentali → contratto → lavoro → ricorsi
**Impatto**: Riduce time-to-value da giorni a minuti.

---

### 8. 🎯 Quiz Adattivo con Spaced Repetition
**Cosa**: Sistema di ripasso che ripropone i concetti chiave dopo 1, 3, 7, 30 giorni.
**Perché**: La ricerca di mercato fissa come target "≥65% retention a 7 giorni". Senza ripasso, la retention crolla.
**Come**: Ogni quiz genera "flashcard" dei concetti sbagliati. Dashboard /ripasso mostra i concetti da rivedere oggi. Notifica (se email opt-in): "Hai 5 concetti da ripassare".
**Impatto**: Trasforma GUIRIMì da "sito di contenuti" a "strumento di apprendimento attivo".

---

### 9. 📋 "Modelli e Template Pratici"
**Cosa**: Sezione con documenti scaricabili per situazioni reali.
**Perché**: Il Segmento 3 (cittadini) vuole azione concreta, non solo teoria.
**Esempi**:
  - Modello di richiesta accesso civico (FOIA) — PEC precompilata
  - Modello di impugnazione licenziamento — struttura base
  - Checklist "Cosa controllare nel contratto di lavoro"
  - Checklist "Cosa fare se ti arrestano" (diritti immediati)
  - Modello di reclamo alla PA
  - Guida "Come leggere una busta paga"
**Come**: Pagina /strumenti con PDF/DOCX scaricabili + spiegazione.
**Impatto**: Utilità pratica immediata → condivisione → SEO → credibilità.

---

### 10. 🏆 Badge e Certificati di Completamento
**Cosa**: Badge visivo per ogni modulo completato. Certificato PDF per ogni area completata.
**Perché**: Gamification leggera. La ricerca lo prevede come feature (bassa complessità, alto engagement).
**Come**: Badge SVG mostrato nel profilo utente. Certificato generabile con nome + data + area. Non ha valore professionale ma motivazionale.
**Impatto**: +15-20% completion rate (dato tipico gamification).

---

## PRIORITÀ 3 — CRESCITA E COMMUNITY (8-16 settimane)
*Trasformano GUIRIMì in una piattaforma, non solo un sito*

---

### 11. 👥 Community Verificata
**Cosa**: Spazio di discussione moderato dove gli utenti possono fare domande.
**Perché**: La ricerca identifica la "comunità supportiva e non tossica" come gap del mercato.
**Come**: Forum integrato (o Discord/Telegram moderato) con regole rigide:
  - Domande educative OK, richieste consulenza NO
  - Moderatori: studenti di giurisprudenza avanzati, praticanti avvocati, volontari
  - Tag per area tematica
  - Risposte con fonte obbligatoria
**Impatto**: Network effect + retention + contenuto generato dagli utenti.
**Rischio**: Richiede moderazione attiva. Meglio partire piccolo e invitare.

---

### 12. 🗺️ Mappa Interattiva del Diritto Italiano
**Cosa**: Visualizzazione interattiva dell'intero ordinamento giuridico — come si collegano le aree, le fonti, gli organi.
**Perché**: Il Problema 3 della ricerca è "mancanza di quadro generale". Nessuno ha mai fatto una visual narrative dell'ordinamento.
**Come**: React + D3.js/Three.js. Nodi cliccabili che portano alle lezioni. Zoom da macro (Costituzione → Leggi → Regolamenti) a micro (singolo articolo).
**Impatto**: Differenziante assoluto. Nessun competitor lo ha. Potenziale virale.

---

### 13. 🎙️ Podcast / Audio Lezioni
**Cosa**: Versione audio di ogni lezione, ascoltabile in formato podcast.
**Perché**: Il Segmento 3 (cittadini lavoratori) ha poco tempo per leggere ma può ascoltare in auto/metro.
**Come**: Text-to-speech di alta qualità (ElevenLabs o simili) o registrazioni manuali. Feed RSS per podcast app.
**Impatto**: Nuovo canale di distribuzione + accessibilità per ipovedenti.

---

### 14. 🌍 Sezione "Diritto Digitale e AI" (Area 7 futura)
**Cosa**: Nuova area tematica su privacy (GDPR), diritto digitale, AI Act, contratti online, firma digitale.
**Perché**: È il tema più caldo e meno coperto in educazione legale accessibile. Tutti usano internet, nessuno conosce i propri diritti digitali.
**Possibili moduli**:
  - Privacy e GDPR per tutti
  - I tuoi diritti online (e-commerce, recesso, dati personali)
  - AI Act europeo: cosa cambia per te
  - Firma digitale, PEC, SPID: cosa hanno valore legale
**Impatto**: Attira un pubblico giovane e tech-savvy. Potenziale virale enorme.

---

### 15. 📰 "Diritto & Attualità" — Blog/Newsletter
**Cosa**: Sezione che collega le lezioni a fatti di cronaca e attualità.
**Perché**: Rende il diritto vivo e rilevante. "Hai sentito della nuova legge su X? Ecco cosa cambia — e nella lezione Y ti spieghiamo il contesto."
**Come**: Blog /attualita con articoli brevi (500 parole) che linkano alle lezioni. Newsletter settimanale opt-in.
**Impatto**: SEO + retention + motivo per tornare sul sito.

---

## PRIORITÀ 4 — MONETIZZAZIONE ETICA (quando validato)
*Solo dopo aver validato l'impatto. Mai a scapito dell'accessibilità.*

---

### 16. 💼 "GIURIMì Pro" per Professionisti
**Cosa**: Tier premium con contenuti avanzati per concorsisti e praticanti.
**Cosa include**: Quiz avanzati con simulazione esame, approfondimenti giurisprudenziali, mappe concettuali scaricabili, accesso prioritario all'AI.
**Prezzo**: €5-9/mese (molto sotto il mercato dei corsi a €1.500+).
**Regola etica**: TUTTE le lezioni base restano SEMPRE gratuite. Il Pro aggiunge, non toglie.

---

### 17. 🤝 Partnership Istituzionali
**Cosa**: Collaborazioni con:
  - **Università** → GUIRIMì come risorsa integrativa per corsi di base
  - **Comuni/Biblioteche** → Postazioni con accesso guidato
  - **Ordini degli Avvocati** → Avvocati volontari come revisori di contenuto
  - **Patronati/Sindacati** → Link reciproci, integrazione nelle guide
  - **Scuole superiori** → Educazione civica (ora obbligatoria)
**Impatto**: Credibilità istituzionale + distribuzione + impatto sociale misurabile.

---

### 18. 🏫 "GIURIMì Scuola" — Versione per Docenti
**Cosa**: Dashboard per docenti che possono assegnare lezioni, monitorare progresso degli studenti, creare quiz personalizzati.
**Perché**: L'educazione civica è obbligatoria nelle scuole italiane dal 2019 (L. 92/2019) ma i docenti non hanno strumenti digitali.
**Impatto**: Mercato potenziale: ~7.900 scuole superiori italiane.

---
---

## MATRICE IMPATTO vs SFORZO

```
                        ALTO IMPATTO
                            │
     ┌──────────────────────┼──────────────────────┐
     │                      │                      │
     │  ⭐ FARE SUBITO       │  🚀 PIANIFICARE      │
     │                      │                      │
     │  1. Ricerca globale  │  6. AI assistente    │
     │  2. Progresso        │  7. Percorsi custom  │
     │  3. Mobile nav       │  8. Spaced repetition│
     │  5. Deep link artic. │  12. Mappa interattiv│
     │  4. Pag. Risorse     │  14. Area Digitale   │
     │                      │                      │
BASSO├──────────────────────┼──────────────────────┤ALTO
SFORZO                      │                      SFORZO
     │                      │                      │
     │  ✅ BONUS             │  📋 DOPO VALIDAZIONE │
     │                      │                      │
     │  10. Badge           │  11. Community       │
     │  15. Blog attualità  │  13. Podcast/audio   │
     │  9. Template (primi) │  16. Pro tier        │
     │                      │  17. Partnership     │
     │                      │  18. GIURIMì Scuola  │
     │                      │                      │
     └──────────────────────┼──────────────────────┘
                            │
                        BASSO IMPATTO
```

---

## SEQUENZA CONSIGLIATA DI IMPLEMENTAZIONE

| Sprint | Feature | Settimane |
|:-------|:--------|:----------|
| **Sprint 1** | Mobile nav (3) + Progresso (2) + Deep link (5) | Sett. 1-2 |
| **Sprint 2** | Ricerca globale (1) + Pagina Risorse (4) | Sett. 3-4 |
| **Sprint 3** | Percorsi personalizzati (7) + Badge (10) | Sett. 5-6 |
| **Sprint 4** | AI Assistente (6) + Template pratici (9) | Sett. 7-10 |
| **Sprint 5** | Quiz adattivo (8) + Blog attualità (15) | Sett. 11-14 |
| **Sprint 6** | Community (11) + Mappa interattiva (12) | Sett. 15-20 |
| **Fase 2** | Area Digitale (14) + Podcast (13) + Pro (16) | Post-validazione |

---

*Documento strategico v1.0 — GUIRIMì Feature Roadmap*
*Basato su: Ricerca di mercato GUIRIMì + Trend EdTech Italia 2024-2025 + Analisi competitiva*
