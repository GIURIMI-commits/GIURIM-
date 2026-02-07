# GIURIMì – Prompt Compliance GDPR / ePrivacy

> **Scopo del documento**
> Questo file contiene il prompt di riferimento per generare bozze, checklist e specifiche tecniche relative a **Privacy Policy, Cookie Policy, Termini d’Uso, Disclaimer educativo e gestione dei consensi** per il progetto **GIURIMì**.
>
> ⚠️ **Nota**: il contenuto generato tramite questo prompt non costituisce consulenza legale. È pensato come base operativa e deve essere eventualmente revisionato da un professionista.

---

## 🎯 OBIETTIVO

Sistemare tutto ciò che riguarda:

- Privacy Policy
- Cookie Policy
- Termini d’Uso
- Disclaimer educativo
- Trasparenza su fonti e dati
- Implementazione tecnica:
  - banner cookie
  - gestione consensi
  - registro consensi
  - data retention

per un sito/app **Next.js + Supabase**.

---

## 🧩 CONTESTO PRODOTTO (GIURIMì)

- Piattaforma educativa che spiega concetti del diritto italiano in modo semplice.
- **NON** offre consulenza legale.
- **NON** è un avvocato.
- **NON** sostituisce professionisti.
- Pubblico: studenti e cittadini.
- Per gli studenti l’accesso è **completamente gratuito** tramite registrazione con **email istituzionale** (verifica email).

### Architettura prodotto

- **Sito web + Web App**
- Pagine pubbliche:
  - Landing
  - Chi Siamo
  - Glossario
- Pagine app:
  - Dashboard
  - Learn / Curriculum
  - Progress

### Stack tecnologico

- Next.js
- Supabase (Auth + Database)
- Analytics: **da decidere**
- Email provider: es. Resend
- Hosting: es. Vercel

### Open source

- Codice e parte dei contenuti pubblici su GitHub

---

## 🗃️ DATI TRATTATI

### Dati attuali (minimo)

1. Email e password / auth (o magic link)
2. Verifica email
3. Profilo utente:
   - nome (opzionale)
   - ruolo (studente / cittadino)
4. Progresso lezioni (`lesson_progress`)
5. Quiz (`quiz_attempts`)
6. Dominio email per verifica istituzionale
7. Log tecnici e sicurezza

### Dati futuri (possibili)

- Newsletter (opt-in)
- Feedback / survey
- Form contatti “Unisciti a noi”
  - nome
  - email
  - messaggio
- Community (Q&A moderata – opzionale)

---

## ⚖️ VINCOLI IMPORTANTI

- Approccio **etico**:
  - minimizzazione dati
  - trasparenza
  - no dark patterns
- Cookie banner conforme:
  - solo cookie essenziali di default
  - analytics e marketing **solo dopo consenso esplicito**
- Tono:
  - professionale
  - chiaro
  - leggibile
  - no legalese eccessivo
- **NON inventare dati aziendali** non forniti:
  - usare segnaposto espliciti:
    - `[Titolare del trattamento]`
    - `[Email privacy]`
    - `[Sede]`
    - `[P.IVA]`
    - `[DPO se nominato]`
- **Non fornire consulenza legale personalizzata**

---

## 🧠 TASK DA GENERARE

### A) PRIVACY POLICY

- **Versione FULL** e **Versione SHORT**
- Struttura GDPR:
  - titolare
  - contatti
  - categorie di dati
  - finalità e basi giuridiche
  - destinatari
  - trasferimenti extra UE
  - conservazione
  - sicurezza
  - diritti interessati
  - reclami
  - aggiornamenti
- Deve coprire:
  - registrazione utenti
  - verifica email istituzionale
  - progressi e quiz
  - form contatti
  - newsletter
  - analytics (se presenti)
  - log di sicurezza
- Include sezione:
  - **“Minimizzazione & filosofia del progetto”**

---

### B) COOKIE POLICY

- **Versione FULL** e **Versione SHORT**
- Spiegazione:
  - cookie tecnici
  - cookie analytics
  - cookie marketing
- Tabella cookie per categorie:
  - nome cookie
  - provider
  - durata
  - finalità
- Istruzioni per:
  - revoca consenso
  - modifica preferenze

---

### C) TERMINI D’USO / TERMS OF USE

- **Versione FULL** e **Versione SHORT**
- Coprire:
  - uso educativo
  - creazione account
  - comportamento utenti
  - limitazioni
  - proprietà intellettuale
    - contenuti
    - open source
  - responsabilità
  - esclusione consulenza
  - sospensione account
  - legge applicabile e foro ([PLACEHOLDER])
- Clausola studenti:
  - gratuito con email istituzionale
  - prevenzione abusi
  - disabilitazione accesso se email non valida

---

### D) DISCLAIMER EDUCATIVO

- **Testo breve**:
  - footer
  - pagine Learn / Glossary
- **Testo lungo**:
  - pagina dedicata o sezione nei Termini
- Deve essere chiaro:
  - informativo / educativo
  - **non consulenza legale**

---

### E) COOKIE BANNER & CONSENT MANAGEMENT

#### Specifica tecnica (Next.js)

- Stato consenso:
  - `localStorage`
  - cookie
- Categorie:
  - essential
  - analytics
  - marketing
- Blocco script fino a consenso
- Pagina:
  - “Gestisci preferenze cookie”

#### Alternative

- Soluzione self-hosted
- Tool esterni (es. iubenda, Cookiebot)
- Pro e contro per ciascuna opzione

---

### F) DATA RETENTION & SECURITY

- Tabella retention:
  - email
  - profilo
  - progressi
  - quiz
  - log
  - contatti
- Gestione cancellazione account:
  - cancellazione
  - anonimizzazione
- Sicurezza:
  - RLS Supabase
  - auditing minimo
  - accessi admin

---

### G) CHECKLIST COMPLIANCE

Checklist eseguibile in ordine:

1. Definire titolare e contatti
2. Scegliere analytics (o nessun analytics)
3. Definire cookie reali
4. Implementare banner e preferenze
5. Implementare export / cancellazione dati
6. Aggiornare footer e schermate

Include:
- “Cose da chiedere a un legale”
- “Cose implementabili subito”

---

### H) COPY UI (MICROCOPY)

- Banner cookie:
  - titolo
  - descrizione
  - pulsanti
- Checkbox newsletter
- Registrazione studenti:
  - email istituzionale
- Pagina account:
  - “Scarica i tuoi dati”
  - “Elimina account”
- Sezione “Fonti ufficiali” (Glossario / Lezioni)

---

## 📄 FORMATO OUTPUT RICHIESTO

- Titoli chiari
- Sezioni e sottosezioni
- Evidenziare segnaposto come `[PLACEHOLDER]`
- Per A / B / C includere:
  - FULL
  - SHORT
- Non inserire link diretti lunghi
- Ricordare sempre:
  - **no consulenza legale**
  - solo bozze e checklist operative

---

## ▶️ PROMPT FINALE

> Ora produci tutto quanto sopra, rispettando rigorosamente contesto, vincoli e formato.
