# 🏛️ CORTE — Modifiche UX/UI richieste (v2)

> Contesto: l’implementazione attuale di **/corte** funziona, ma **non è intuitiva** e la struttura delle “Aule” **non piace** (troppo piatta / poco guidata).  
> Obiettivo: rendere CORTE **più separata dai corsi**, più **orientata alla scrittura**, e con “Aule” **organizzate meglio**.

---

## 1) Navbar / IA — CORTE NON deve stare “insieme ai corsi”

### Problema attuale
- CORTE appare nello stesso gruppo di navigazione dei corsi (percepita come “una pagina del corso”, non come area community).

### Modifica richiesta
**Separare CORTE come area di prodotto a sé**, con una posizione più naturale per una community.

### Soluzione proposta (scelte consigliate)
**A. Navbar: separatore + “Area Community”**
- Sposta **CORTE** in un gruppo dedicato, separato dai link corsi tramite:
  - un divider visivo (subtle) **oppure**
  - una label dropdown “Community”
- Esempio struttura:
  - `Corsi` | `Percorsi` | `Lezioni`  **|** `CORTE` | `Profilo`

**B. Navbar: CORTE come CTA “pill”**
- CORTE in navbar come pill/button secondario (non un link uguale agli altri), per far capire che è un’area diversa.
- Stile coerente: border + glow super leggero.

### Requisiti UI
- Rimuovere qualsiasi “indicatore ambra” troppo evidente: l’accent deve restare **subtle** (oro opacità 10–20% massimo).
- Active state chiaro su `/corte`.

**Acceptance criteria**
- CORTE non è più nello stesso “blocco mentale” dei corsi.
- In 1 secondo si capisce che è “community forum”.

---

## 2) Entry to Write — deve essere immediato scrivere / postare

### Problema attuale
- Per scrivere devi “capire dove andare” (non è una community se non invoglia subito a creare thread).

### Modifiche richieste (obbligatorie)
**A. CTA “Apri una Discussione” sempre visibile**
- Nel feed `/corte`, aggiungere:
  - Un bottone primario in alto a destra: **“Nuova Discussione”**
  - Su mobile: **floating action button (FAB)** in basso a destra con icona + tooltip.

**B. Composer rapido (opzionale ma consigliato)**
- Un mini box sopra il feed:
  - placeholder: “Scrivi una domanda… (titolo breve)”
  - click → porta a `/corte/nuovo` con titolo precompilato

**C. Empty state intelligente**
Se una sezione/aule è vuota:
- Messaggio: “Qui non c’è ancora nulla. Vuoi aprire la prima discussione?”
- CTA: “Apri la prima discussione”

**Acceptance criteria**
- Da `/corte` puoi iniziare a scrivere in max 1 click.
- L’azione primaria della pagina è evidente.

---

## 3) Sidebar “Aule” — struttura attuale non piace, serve suddivisione più guidata

### Problema attuale
- Lista piatta con:
  - Tutte le discussioni
  - Aula Penale
  - Aula Civile
  - Dir. Costituzionale
  - Diritto UE
  - AI & Digital
  - Caffè Giuridico
- Percezione: “menu generico”, non “aule” con gerarchia/contesto.

### Modifica richiesta
Riorganizzare le Aule in **macro-aree** + (se possibile) **sottosezioni**, stile “forum serio”.

### Nuova struttura consigliata (v2)
**SEZIONE 1 — Materie**
- Penale
- Civile
- Costituzionale
- Diritto UE
- AI & Digital

**SEZIONE 2 — Studio & Esami**
- Esami & Orali
- Riassunti & Appunti
- Schemi & Mappe
- Esercitazioni / Casi pratici

**SEZIONE 3 — Community**
- Caffè Giuridico (off-topic controllato)
- Annunci / Avvisi (sola lettura o moderata)

### UX Sidebar migliorata
- Ogni macro-sezione è **collapsible** (aperta di default su desktop, compatta su mobile).
- Aggiungere:
  - conteggio thread per aula (badge sottile)
  - stato attivo evidente
- “Tutte le discussioni” resta, ma NON in cima come prima voce dominante:
  - metterla come filtro sopra le sezioni (es. “Feed” → Tutte / Seguite)

**Acceptance criteria**
- L’utente capisce subito *dove postare*.
- Le aule non sembrano un elenco casuale.

---

## 4) Filtri Feed — più chiari e “da forum”

### Problema attuale
- Filtri “Più recenti / Popolari / Senza risposta” ok, ma vanno resi più “forum-like” e coerenti.

### Modifiche richieste
- Trasformare i filtri in tab più evidenti (pill) con microcopy:
  - **Recenti**
  - **Popolari**
  - **Senza risposta**
  - (opzionale) **Salvati**
- Aggiungere sorting label chiara: “Ordina per: …”
- Quando selezioni un’aula dalla sidebar, mostra un breadcrumb:
  - `CORTE / Materie / Penale`

**Acceptance criteria**
- Filtro selezionato sempre chiaro.
- Se stai guardando un’aula, lo capisci subito.

---

## 5) Thread Card — migliorie “leggibilità + azione”

### Problemi attuali
- Card molto ampia, ma le azioni sono “disperse”.
- Serve un pattern più chiaro (titolo → preview → tags → azioni).

### Modifiche richieste
- Rendere tutta la card cliccabile (tranne i bottoni azione).
- Azioni in riga compatta e coerente:
  - Upvote (solo icona + numero)
  - Commenti
  - Salva
  - Condividi
- Meta info più “pulita”:
  - `Aula • Autore • Data`
- Tags: massimo 3 visibili + “+N” (per non sporcare).

**Acceptance criteria**
- Scorrendo il feed capisci subito titolo + contesto + azione.

---

## 6) Moderazione: parolacce / parole non idonee (MVP già ok, ma migliorare UX)

### Problema
- Bloccare va bene, ma il messaggio deve essere “da aula”, non da social ban.

### Modifiche richieste
- Copy error più istituzionale:
  - “Il testo contiene espressioni non compatibili con il regolamento della CORTE. Ti chiediamo di riformulare in modo rispettoso.”
- Aggiungere “Regole della CORTE” link vicino al form.
- Warning non bloccante su tono:
  - “Suggerimento: una formulazione neutra aumenta la qualità delle risposte.”

**Acceptance criteria**
- Moderazione percepita “seria” e non aggressiva.

---

## 7) Checklist implementativa (per dev)

### Navbar
- [ ] Spostare CORTE fuori dal blocco corsi
- [ ] Aggiungere separatore / gruppo “Community”
- [ ] Active state coerente su `/corte`

### /corte
- [ ] CTA “Nuova Discussione” (desktop)
- [ ] FAB “+” (mobile)
- [ ] Composer rapido (opzionale)
- [ ] Sidebar ristrutturata in macro-aree collapsible
- [ ] Breadcrumb quando un’aula è selezionata
- [ ] Tabs feed più chiare + label “Ordina per”

### ThreadCard
- [ ] Card cliccabile
- [ ] Meta pulita (Aula • Autore • Data)
- [ ] Tags limitate + “+N”
- [ ] Actions allineate e compatte

### Moderazione
- [ ] Copy più istituzionale
- [ ] Link “Regole della CORTE”
- [ ] Warning tono neutro

---

## 8) Output atteso (Definition of Done)
- CORTE è chiaramente un’area community separata dai corsi.
- Da `/corte` si può scrivere in massimo 1 click.
- Sidebar “Aule” è raggruppata in modo intuitivo (Materie / Studio & Esami / Community).
- Feed più leggibile e “da forum” (thread card + filtri + breadcrumb).
- Moderazione mantiene blocchi/warning ma con comunicazione coerente con l’identità del progetto.
