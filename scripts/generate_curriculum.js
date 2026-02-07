const fs = require('fs');

const files = [
    // AREA 5 - Diritto Amministrativo
    // Mod 5.1
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.1-pubblica-amministrazione/lez-5.1.1-cos-e-la-pubblica-amministrazione.mdx",
        content: `---
slug: "lez-5.1.1"
title: "Cos'è la Pubblica Amministrazione"
area: "area-5-amministrativo"
module: "mod-5.1-pubblica-amministrazione"
order: 1
duration_minutes: 10
prerequisites: ["lez-4.4.2"]
next_lesson: "lez-5.1.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.1-pubblica-amministrazione/lez-5.1.2-il-procedimento-amministrativo.mdx",
        content: `---
slug: "lez-5.1.2"
title: "Il procedimento amministrativo"
area: "area-5-amministrativo"
module: "mod-5.1-pubblica-amministrazione"
order: 2
duration_minutes: 12
prerequisites: ["lez-5.1.1"]
next_lesson: "lez-5.1.3"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.1-pubblica-amministrazione/lez-5.1.3-l-atto-amministrativo-validita-e-vizi.mdx",
        content: `---
slug: "lez-5.1.3"
title: "L'atto amministrativo: validità e vizi"
area: "area-5-amministrativo"
module: "mod-5.1-pubblica-amministrazione"
order: 3
duration_minutes: 12
prerequisites: ["lez-5.1.2"]
next_lesson: "lez-5.2.1"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    // Mod 5.2
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.2-cittadino-e-pa/lez-5.2.1-accesso-agli-atti-e-trasparenza.mdx",
        content: `---
slug: "lez-5.2.1"
title: "Accesso agli atti e trasparenza"
area: "area-5-amministrativo"
module: "mod-5.2-cittadino-e-pa"
order: 1
duration_minutes: 10
prerequisites: ["lez-5.1.3"]
next_lesson: "lez-5.2.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.2-cittadino-e-pa/lez-5.2.2-come-fare-ricorso-contro-la-pa.mdx",
        content: `---
slug: "lez-5.2.2"
title: "Come fare ricorso contro la PA"
area: "area-5-amministrativo"
module: "mod-5.2-cittadino-e-pa"
order: 2
duration_minutes: 12
prerequisites: ["lez-5.2.1"]
next_lesson: "lez-5.2.3"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.2-cittadino-e-pa/lez-5.2.3-permessi-concessioni-e-autorizzazioni.mdx",
        content: `---
slug: "lez-5.2.3"
title: "Permessi, concessioni e autorizzazioni"
area: "area-5-amministrativo"
module: "mod-5.2-cittadino-e-pa"
order: 3
duration_minutes: 10
prerequisites: ["lez-5.2.2"]
next_lesson: "lez-5.3.1"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    // Mod 5.3
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.3-diritto-lavoro/lez-5.3.1-il-contratto-di-lavoro-diritti-e-doveri.mdx",
        content: `---
slug: "lez-5.3.1"
title: "Il contratto di lavoro: diritti e doveri"
area: "area-5-amministrativo"
module: "mod-5.3-diritto-lavoro"
order: 1
duration_minutes: 12
prerequisites: ["lez-5.2.3"]
next_lesson: "lez-5.3.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-5-amministrativo/mod-5.3-diritto-lavoro/lez-5.3.2-licenziamento-e-tutele-del-lavoratore.mdx",
        content: `---
slug: "lez-5.3.2"
title: "Licenziamento e tutele del lavoratore"
area: "area-5-amministrativo"
module: "mod-5.3-diritto-lavoro"
order: 2
duration_minutes: 12
prerequisites: ["lez-5.3.1"]
next_lesson: "lez-6.1.1"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    // AREA 6 - Sistema Giudiziario
    // Mod 6.1
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.1-ordine-giudiziario/lez-6.1.1-come-e-organizzata-la-giustizia-in-italia.mdx",
        content: `---
slug: "lez-6.1.1"
title: "Come è organizzata la giustizia in Italia"
area: "area-6-sistema-giudiziario"
module: "mod-6.1-ordine-giudiziario"
order: 1
duration_minutes: 10
prerequisites: ["lez-5.3.2"]
next_lesson: "lez-6.1.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.1-ordine-giudiziario/lez-6.1.2-giurisdizione-civile-penale-e-amministrativa.mdx",
        content: `---
slug: "lez-6.1.2"
title: "Giurisdizione civile, penale e amministrativa"
area: "area-6-sistema-giudiziario"
module: "mod-6.1-ordine-giudiziario"
order: 2
duration_minutes: 12
prerequisites: ["lez-6.1.1"]
next_lesson: "lez-6.1.3"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.1-ordine-giudiziario/lez-6.1.3-il-csm-e-l-indipendenza-della-magistratura.mdx",
        content: `---
slug: "lez-6.1.3"
title: "Il CSM e l'indipendenza della magistratura"
area: "area-6-sistema-giudiziario"
module: "mod-6.1-ordine-giudiziario"
order: 3
duration_minutes: 10
prerequisites: ["lez-6.1.2"]
next_lesson: "lez-6.2.1"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    // Mod 6.2
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.2-processo-pratica/lez-6.2.1-come-funziona-un-processo-civile.mdx",
        content: `---
slug: "lez-6.2.1"
title: "Come funziona un processo civile"
area: "area-6-sistema-giudiziario"
module: "mod-6.2-processo-pratica"
order: 1
duration_minutes: 15
prerequisites: ["lez-6.1.3"]
next_lesson: "lez-6.2.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.2-processo-pratica/lez-6.2.2-come-funziona-un-processo-penale.mdx",
        content: `---
slug: "lez-6.2.2"
title: "Come funziona un processo penale"
area: "area-6-sistema-giudiziario"
module: "mod-6.2-processo-pratica"
order: 2
duration_minutes: 15
prerequisites: ["lez-6.2.1"]
next_lesson: "lez-6.2.3"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.2-processo-pratica/lez-6.2.3-appello-cassazione-e-cosa-definitiva.mdx",
        content: `---
slug: "lez-6.2.3"
title: "Appello, Cassazione e cosa definitiva"
area: "area-6-sistema-giudiziario"
module: "mod-6.2-processo-pratica"
order: 3
duration_minutes: 12
prerequisites: ["lez-6.2.2"]
next_lesson: "lez-6.3.1"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    // Mod 6.3
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.3-quando-serve-avvocato/lez-6.3.1-quando-puoi-fare-da-solo-e-quando-ti-serve-un-avvocato.mdx",
        content: `---
slug: "lez-6.3.1"
title: "Quando puoi fare da solo e quando ti serve un avvocato"
area: "area-6-sistema-giudiziario"
module: "mod-6.3-quando-serve-avvocato"
order: 1
duration_minutes: 10
prerequisites: ["lez-6.2.3"]
next_lesson: "lez-6.3.2"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    },
    {
        path: "/Users/alessiosabatino/Desktop/GIURIMì/content/area-6-sistema-giudiziario/mod-6.3-quando-serve-avvocato/lez-6.3.2-risorse-gratuite-caf-sportelli-mediazione.mdx",
        content: `---
slug: "lez-6.3.2"
title: "Risorse gratuite: CAF, sportelli, mediazione"
area: "area-6-sistema-giudiziario"
module: "mod-6.3-quando-serve-avvocato"
order: 2
duration_minutes: 10
prerequisites: ["lez-6.3.1"]
next_lesson: "end"
last_verified: "2026-02-07"
verified_by: "Da verificare"
disclaimer_level: "standard"
source_refs: []
glossary_terms: []
quiz:
  questions: []
---

<Hook>
Inserisci qui il gancio iniziale...
</Hook>

<Objective>
Inserisci qui l'obiettivo della lezione...
</Objective>

---

## 1) Titolo sezione

Contenuto...

<Quiz />

<Resources />`
    }
];

files.forEach(f => {
    try {
        fs.writeFileSync(f.path, f.content);
        console.log("Created " + f.path);
    } catch (e) {
        console.error("Error creating " + f.path + ": " + e.message);
    }
});
