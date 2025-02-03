# PrismicNextTailwind

STARTER TEMPLATE DI PROGETTI PRISMIC-NEXT-TAILWIND


Passaggi: 
- Inizializza progetto su Prismic
- Seleziona progetto già esistente 
- Lancia comando enerato da Prismic per inizializzare Slicemachine
- Crea file .env.local e compila campi utili
- Se la lingua default non è inglese cambia il file _document.js (se non serve eliminalo)
- Se non c'è doppia lingua bisogna ripulire tutti i getStaticProps e nel caso modificare anche il search di algolia


# Features: 

ON demand ISR -> https://prismic.io/blog/nextjs-sites-on-demand-isr

Bundle Analyzer -> npm run analyze

Doppia lingua

Cookiebot

Hotjar

Algolia:
 modifica il file dentro la cartella Search e copia questa riga al posto del comando build ( "build": "node ./search/algoliaBuild.mjs && next build",
), ovviamente crea le variabili corrette nel nel fine .env.local

Facebook Pixel:
Al momento il file viene inizializzato in _app.js e poi richiamato in Layout per attivarlo su tutte le pagine. 

Gtag: 
inizializzato solo su _app.js, bisognerebbe verificare bene se funziona correttamente su tutto il sito 

Newsletter Api: 
Al momento funziona per MailerLite, si potrebbero anche inserire le variabili per Mailchimp e Klaviyo prendendole da altri progetti (The Syllabus, Matteo Negri)


# Funzioni da implementare: 
- Sistema per gestire i metatag anche quando sia settings che metatag di pagina non sono inseriti
- Componenti per transizioni di pagina
- Animazione bottone mobile menu 
- Accordion con animazione
- Ampliare lista di componenti UI
- Mobile menu con animazione  
- Generatore di Sitemap (già installato prismic sitemap)
