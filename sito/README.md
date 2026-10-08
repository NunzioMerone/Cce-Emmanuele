# Sito della Chiesa Emmanuele

Sito multipagina: Home, Chi siamo, Prediche e Contatti, più le pagine dinamiche delle singole serie e gli approfondimenti La nostra fede e Identità e vita comunitaria. HTML generato, CSS e JavaScript senza framework frontend, con un server Node.js per la sincronizzazione YouTube e Nodemailer per l’invio email via SMTP.

La navbar condivisa mostra il logo completo aggiornato e voci da 18 px, anche nel menu mobile; la dimensione è configurabile con `--navbar-link-font-size` in `tokens.css`. Logo e menu restano subito visibili, esclusi dalle animazioni di comparsa anche quando si cambia pagina. Resta in alto durante lo scorrimento: da 96 px iniziali passa a 76 px, con logo leggermente più piccolo; su mobile passa da 80–84 px a 68 px. Soglie separate di entrata e uscita evitano sfarfallii al cambio di altezza; le transizioni rispettano la preferenza di movimento ridotto. Il menu mobile mantiene apertura, chiusura con Escape e navigazione da tastiera.

**Chi siamo** apre un menu a tendina con la pagina principale, **La nostra fede** e **Identità e vita comunitaria**. Riprende colori, bordi e animazione dei filtri, segnala la pagina corrente e funziona anche senza JavaScript grazie a un disclosure nativo. Le voci e i relativi collegamenti sono configurati in `src/config/site.mjs`. Su mobile il sottomenu si espande nella navigazione in colonna; Escape chiude prima il sottomenu e poi il menu principale. Sono supportati Tab, frecce, Home ed End, con chiusura quando il focus o il clic escono dal sottomenu.

## Prima sezione della Home

La Home contiene la navbar condivisa, la prima sezione con foto, l’introduzione alla comunità, gli appuntamenti settimanali, l’anteprima delle ultime prediche, la sezione di accoglienza con mappa e contatti dei pastori e il footer condiviso. I contenuti sono organizzati in componenti separati.

La nuova apertura segue il riferimento fornito dall’utente: testo sulla sinistra, titolo «Un luogo dove conoscere Cristo e crescere insieme», fotografia a tutta altezza sulla destra e citazione di Matteo 18:20. La prima sezione occupa almeno tutta l’altezza disponibile della finestra, sottraendo la navbar, senza un limite massimo di altezza. Sui dispositivi più piccoli cresce quanto necessario per mantenere leggibili testo e foto. La fotografia occupa il 66% della larghezza su desktop, arrivando direttamente sotto la navbar. Una sfumatura graduale unisce le fotografie allo sfondo del testo e mantiene leggibili le piccole sovrapposizioni. Su tablet e telefono le foto vengono prima del testo. Il testo appare in un pannello chiaro, sovrapposto di 140 px alla parte inferiore delle foto su tablet e di 110 px su telefono; la sfumatura inferiore rende morbido il passaggio allo sfondo. Curva, profilo dorato, onda superiore e decoro botanico sono stati rimossi. Sono mantenuti il logo originale e i componenti condivisi dei pulsanti, con la nuova dimensione `.button--large`.

Il culto **ogni domenica alle 10:00** e l’incontro **ogni giovedì alle 18:00** sono stati confermati dall’utente e configurati in `src/config/appointments.mjs`; la stessa fonte alimenta gli appuntamenti nella Home e i Contatti. L’apertura della Home continua a evidenziare il culto della domenica.

Il carosello propone **sei fotografie autentiche fornite dalla chiesa**, memorizzate localmente: persone insieme in chiesa, lode, un incontro nella sala, una tavolata e sorrisi della comunità. Si apre con il ritratto sorridente fornito dall’utente, con un overlay blu leggero all’8%. Cambia immagine ogni **3000 ms**, con dissolvenza CSS di **1200 ms**. L’elenco e l’intervallo si modificano in `src/config/home.mjs`; stile, taglio delle foto e durata della dissolvenza sono nei componenti `home-hero.css` e `photo-slideshow.css`. Le versioni WebP sono in `public/assets/images/chiesa/`; gli originali restano separati dal sito distribuito.

Il carosello non mostra pallini o pulsanti. La rotazione si sospende quando è fuori schermo o la scheda è nascosta. Con movimento ridotto la rotazione automatica resta sospesa e la dissolvenza è disattivata; senza JavaScript resta visibile la prima foto. Una fotografia non disponibile viene saltata senza mostrare un fotogramma vuoto.

### Introduzione al Chi siamo

Sotto la prima sezione, `home-about-intro.mjs`, con margini e collage più compatti, presenta quattro fotografie sovrapposte, un breve testo sulla comunità e il collegamento condiviso senza contorno **Scopri chi siamo**, collegato a `chi-siamo.html`. Il layout riprende il riferimento fornito: foto a sinistra, titolo blu con accento oro a destra; su tablet e telefono le due colonne si dispongono in verticale. Le fotografie autentiche mostrano tre donne insieme, la lode, un gruppo con le Bibbie sul tavolo e la comunità all’aperto. Sono caricate in modo differito e configurate in `src/config/home.mjs` (`homeAboutPhotos`); gli stili sono isolati in `public/assets/css/components/home-about-intro.css`.

### Appuntamenti nella Home

Prima delle prediche, `home-appointments.mjs` presenta il titolo **Insieme, intorno alla Parola.**, due riquadri con gli incontri settimanali e un richiamo agli eventi speciali comunicati sulle pagine social. Il giovedì è dedicato allo **Studio della Parola**. I collegamenti **Seguici su Instagram** e **Seguici su Facebook** hanno ciascuno la propria icona e aprono in una nuova scheda gli indirizzi confermati dall’utente. Gli indirizzi sono centralizzati in `src/config/site.mjs` e riutilizzati anche nei Contatti e nella sezione di accoglienza. Gli appuntamenti e le loro descrizioni si modificano in `src/config/appointments.mjs`, senza duplicare gli orari tra le pagine. Gli stili sono isolati in `public/assets/css/components/home-appointments.css`; le comparse riutilizzano il sistema di animazioni condiviso. Su telefono i due appuntamenti e i collegamenti social si dispongono in verticale.

### Ultime prediche nella Home

`sermon-preview.mjs` presenta i **tre video pubblici più recenti** del canale, ordinati per data di pubblicazione, e il collegamento senza contorno **Tutte le prediche** verso `prediche.html`. Le card riutilizzano lo stesso componente e il player in overlay dell’archivio: nessun iframe viene caricato prima del clic. Il controller `public/assets/js/pages/home.js` legge `/api/sermons` tramite il client condiviso `src/services/sermon-catalog.mjs`, usato anche dalla pagina Prediche; non contiene chiavi API né titoli fissati nel codice. La selezione dei video è configurata in `src/config/ui.mjs` (`homeUi.sermonPreviewLimit`).

La pagina ricontrolla il catalogo una volta al minuto quando è visibile, rispettando la cache server già esistente. Gli aggiornamenti non sostituiscono le card durante la riproduzione del video. Se il servizio non è raggiungibile, conserva eventuali card già caricate e mostra un avviso; se il canale contiene meno di tre video, mostra quelli disponibili. Le card restano sempre su **una sola riga**: quando tutte e tre entrano comodamente i comandi sono nascosti; con meno spazio si attiva il carosello, con due card o una card visibile. Frecce e pallini sono centrati e ravvicinati. Gli stili della sezione sono nel componente `sermon-preview.css`.

### Carosello riutilizzabile

`src/components/carousel.mjs` rende il contenitore, la traccia e i comandi condivisi; `public/assets/css/components/carousel.css` contiene tutti gli stili; `public/assets/js/components/carousel.js` gestisce interazioni, aggiornamenti e dimensioni. Le misure sono calcolate in `src/utils/carousel.mjs`, condiviso con il browser e coperto da test per i limiti di larghezza, l’ultima vista e le liste di lunghezza diversa. Il numero di colonne dipende dalla capacità della finestra: le raccolte con una o due card conservano la stessa larghezza delle raccolte complete, senza riempire gli spazi liberi.

Il componente riceve `id` univoco, `label` accessibile, `items` come array di markup di componenti fidati, `minItemWidth` e `maxVisible`. Nella Home la larghezza minima è **260 px**, lo spazio tra card **22 px** e il massimo **3**: con almeno 824 px disponibili le tre card sono tutte visibili; sotto questa misura scorrono in orizzontale senza andare a capo. Quando lo scorrimento è disponibile, gli indicatori sono sempre **tre**, indipendentemente dal numero di viste. Il primo indica l’inizio e l’ultimo la fine; il centrale indica le viste intermedie, con un piccolo impulso a ogni avanzamento. Un solo indicatore è colorato alla volta: con tre viste corrispondono esattamente alla prima, seconda e terza, senza riempimenti parziali o residui all’ultima vista. I due estremi permettono di raggiungere l’inizio e la fine; il centro è un indicatore di avanzamento accessibile, con vista attuale annunciata. La singola card del canale non richiede comandi. Nell’archivio Prediche ogni playlist usa lo stesso componente, con larghezza minima **240 px**, spazio **18 px** e massimo **4** card visibili. Ogni anteprima contiene al massimo **12** messaggi, anche su desktop, e un collegamento alla serie completa. I filtri smontano i controller precedenti prima di inizializzare le nuove serie, liberando observer e listener.

```js
carousel({
  id: 'altri-contenuti',
  label: 'Altri contenuti della chiesa',
  items: elementi.map(renderElemento),
  minItemWidth: 260,
  maxVisible: 3,
});
```

L’inizializzazione comune registra tutti i contenitori presenti. `initializeCarousels(scope)` registra anche quelli inseriti successivamente; `initializeCarousel(element)` restituisce un controller con `refresh()`, `goTo(index)` e `destroy()`. L’evento `carousel:change` comunica indice e numero di viste quando cambiano, permettendo di sincronizzare una navigazione esterna. ResizeObserver adegua il numero di card alla larghezza effettiva, MutationObserver gestisce gli elementi caricati dall’API. Non ci sono dipendenze esterne o rotazione automatica.

Lo scorrimento touch usa il comportamento nativo con aggancio alla card; il mouse può trascinare anche partendo dalla miniatura. Superata la soglia di trascinamento, il clic successivo viene bloccato per evitare l’apertura involontaria del video. Un clic normale conserva l’overlay. Frecce, pallini e traccia sono utilizzabili da tastiera; la traccia supporta ←, →, Home ed End. Le frecce si disabilitano agli estremi, la vista attiva è annunciata e il movimento ridotto evita lo scorrimento animato. Senza JavaScript la traccia resta scorrevole nativamente, con comandi nascosti.

### Accoglienza, mappa e pastori

Dopo le prediche, `home-visit.mjs` presenta una fascia blu con l’invito **Non devi fare questo cammino da solo**, la fotografia autentica di due uomini della comunità sorridenti insieme e il pulsante oro **Vieni a trovarci**. Il riferimento è ripreso con onde in più tonalità di blu (`welcome-waves.svg`), fotografia fino al bordo destro, profilo arrotondato a sinistra e scritta calligrafica **Sei il benvenuto** inclinata e sovrapposta al bordo inferiore della foto. Segue una sezione chiara con decorazioni circolari discrete, mappa a sinistra, collegamenti Instagram, YouTube e Facebook e due schede per i pastori **Rod Jones** e **Francesco Schiano Lomoriello**. Le schede mostrano le fotografie fornite dall’utente, nell’ordine Rod e Francesco, con un ritaglio circolare gestito soltanto dal CSS; i file PNG sono copiati senza alterazioni in `public/assets/images/pastori/`. Le iniziali restano disponibili come alternativa per eventuali schede senza foto. Le schede non contengono email. Nomi, numeri e foto sono configurabili in `src/config/pastors.mjs`.

Le due scritte calligrafiche riutilizzano `handwritten-note.mjs` e `handwritten-note.css`. Il carattere [Allura dal repository ufficiale Google Fonts](https://github.com/google/fonts/tree/main/ofl/allura) è distribuito localmente in `public/assets/fonts/`, insieme alla sua licenza SIL Open Font License; non richiede chiamate al servizio Google Fonts durante la visita.

Indirizzo confermato: **Via Gaetano De Rosa 81, Bacoli (NA)**. `church-map.mjs` usa l’iframe ufficiale recuperato da Google Maps tramite **Condividi → Incorpora una mappa**, con caricamento differito e attribuzioni visibili. L’URL è in `src/config/site.mjs` (`mapsEmbedUrl`). **Indicazioni** apre Google Maps con l’indirizzo come destinazione, usando il formato delle [Maps URLs](https://developers.google.com/maps/documentation/urls/get-started). Non richiede nuove chiavi o servizi Google Cloud.

Il pulsante **Vieni a trovarci**, anche nella navbar delle altre pagine, porta a `index.html#dove-trovarci`. `visit-directions.js` sposta il focus sul collegamento **Indicazioni** senza spostare nuovamente la pagina. Per quattro secondi testo e freccia diventano oro, con un bagliore pulsante sulle lettere e una sottolineatura più marcata; non compare alcun riquadro. Anche il focus da tastiera usa testo e sottolineatura come indicatori. Con movimento ridotto il bagliore resta statico. La navigazione alla mappa funziona anche senza JavaScript. Gli stili sono separati in `home-visit.css`, `church-map.css` e `pastor-card.css`.

Su desktop la mappa ha un’area più ampia (440 px di altezza, inclusa la fascia inferiore) e la colonna sinistra è leggermente più larga. Le schede dei pastori sono compatte, con fotografie da 88 px (configurabili con `--pastor-avatar-size` in `tokens.css`) e spaziatura ridotta. Mappa e schede terminano sulla stessa linea grazie a una riga condivisa della griglia; citazione e nota calligrafica occupano la riga successiva. L’allineamento si adatta alle altezze del contenuto senza misure calcolate in JavaScript. Su tablet e telefono i blocchi mantengono l’ordine mappa, citazione, social, pastori e nota.

### Footer

Il footer condiviso contiene logo, navigazione, tre icone circolari per Instagram, Facebook e YouTube, copyright con anno corrente ed email della chiesa. I social usano i collegamenti confermati nella configurazione della chiesa, aprono una nuova scheda e hanno etichette accessibili; i cerchi avorio con bordo oro passano al blu con icona oro su hover e focus. Su mobile logo, navigazione e social sono centrati, con email sopra al copyright in fondo. L’anno segue il fuso **Europe/Rome**, con una prima resa server e aggiornamento nel browser all’apertura, al ripristino della pagina e al ritorno nella scheda, senza richiedere una nuova build ogni anno (`utils/calendar.mjs`, `current-year.js`).

L’email ufficiale della chiesa è **cce.emmanuele@gmail.com**, configurata in `church.email` e collegata con `mailto:` nel footer condiviso e nella pagina Contatti. Numeri dei pastori confermati dall’utente: **Rod Jones +39 328 962 3916**, **Francesco Schiano Lomoriello +39 333 129 0668**. Le schede mostrano i numeri formattati e collegamenti `tel:` per chiamare direttamente. `contactPlaceholders` conserva i segnaposto per i recapiti non ancora forniti.

### Chi siamo

La pagina segue il riferimento fornito dall’utente con testi reali: hero con la comunità, missione e significato del nome Emmanuele, quattro valori, storia a Bacoli, fascia fotografica sul territorio, biografie dei pastori, collegamenti di approfondimento e invito finale. Navbar e footer sono quelli condivisi del sito.

Testi e immagini sono centralizzati in `src/config/about.mjs`; le biografie in `src/config/pastors.mjs`. Rod Jones, con il ritratto dai capelli grigi, compare a sinistra; Francesco Schiano Lomoriello, con il ritratto calvo, a destra. Le biografie correggono l’inversione dei nomi nel riferimento dell’utente. Le tappe storiche confermate sono fine anni ’70, anni ’80, 1986 e 2022. Le immagini illustrano il racconto: le fotografie attuali della comunità non vengono presentate come documenti delle rispettive date.

La storia conserva integralmente i quattro racconti estesi forniti dall’utente in `churchTimeline`, con ritorni a capo per la lettura. Quattro tappe selezionabili precedono fotografia e racconto affiancati su desktop. La linea di collegamento si colora con una transizione fino al cerchio della tappa attiva; cerchi e titoli indicano la selezione. Il racconto riutilizza il carosello condiviso con una tappa per vista: clic sulla timeline, frecce, trascinamento e tastiera restano sincronizzati. Su tablet e telefono la timeline diventa compatta con quattro date sempre visibili; foto, titolo e testo si dispongono in verticale. I comandi centrati usano gli stessi tre indicatori delle prediche. Le fotografie hanno dimensioni uniformi, con crediti per i panorami storico e attuale. Le comparse di foto e testo e la linea rispettano la preferenza di movimento ridotto. Senza JavaScript ancore e traccia scorrevole permettono di raggiungere tutti i racconti; con JavaScript soltanto il racconto attivo è raggiungibile da tastiera e tecnologie assistive. Renderer e stile sono in `about-story.mjs` e `about-story.css`; il controller accessibile `about-story.js` è inizializzato dall’entry comune. Valori e pastori si adattano allo spazio disponibile. La citazione della missione si sovrappone alla fotografia senza coprire tutto lo scatto su mobile.

Il panorama storico è [Panorama da Capo Miseno di Giorgio Sommer, su Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sommer,_Giorgio_(1834-1914)_-_n._2568_-_Panorama_da_Capo_Miseno.jpg), in pubblico dominio. L’originale è conservato in `materiali/foto-chiesa/bacoli-storica-originale.jpg`; la copia web `public/assets/images/about/bacoli-storica.webp` mantiene la risoluzione originale 960 × 768 e viene visualizzata in bianco e nero tramite CSS. Il panorama a colori è [CapoMisenoBacoli3341TAW.JPG di Denghiù](https://commons.wikimedia.org/wiki/File:CapoMisenoBacoli3341TAW.JPG), anch’esso in pubblico dominio; originale separato e copia WebP 1600 × 1200. I crediti sono presenti in pagina.

Ogni sezione ha un componente e un CSS dedicati. I collegamenti «La nostra fede» e «Identità e vita comunitaria» aprono le due pagine di approfondimento nella stessa scheda; «Vieni a conoscerci» porta alle informazioni per la prima visita in Contatti. I materiali fotografici precedenti restano conservati per eventuali riutilizzi.

### Approfondimenti di Chi siamo

`la-nostra-fede.html` presenta integralmente Orientamento Ecclesiologico e Fondamento della fede, con introduzioni, dieci punti della sezione 2 e riferimenti biblici originali. Su richiesta dell’utente, Distintivi dottrinali e Dichiarazioni etiche sono esclusi sia dai contenuti sia dall’indice. Restano esclusi anche l’intestazione relativa al governo interno, le sezioni amministrative, le clausole di modifica del regolamento e le appendici. I documenti originali sono conservati separatamente; il Word completo non viene distribuito.

`identita-vita-comunitaria.html` comprende entrambe le parti del pieghevole, ciascuna con introduzione completa e cinque argomenti, tutte le citazioni e i crediti originali. Il secondo gruppo usa un delicato fondo avorio. Il PDF originale, senza alterazioni, si trova in `public/assets/documents/identita-vita-comunitaria.pdf` ed è raggiungibile dal collegamento finale.

Il componente `reading-document.mjs` e `pages/reading.css` condividono il collegamento iniziale **← Indietro** a Chi siamo, indice fisso sul desktop, indice compatto espandibile sopra il testo su tablet e telefono, sezioni di lettura, citazioni, note e collegamenti finali. I contenuti sono statici, visibili subito e privi di accordion. I dati completi sono in `src/config/faith.mjs` e `src/config/identity.mjs`. Le pagine mantengono navbar e footer condivisi, con Chi siamo come voce attiva.

Gli originali sono conservati separatamente in `materiali/documenti/`, esclusa da Git e dal sito generato; il manifest ne registra gli hash. Il confronto tra i 61 paragrafi Word selezionati e l’HTML, le due note e i tredici pannelli/crediti PDF è registrato in `verifiche/approfondimenti-confronto.json`. Due citazioni vettoriali del PDF sono state trascritte dopo controllo visivo. I refusi originali sono conservati e segnalati separatamente in `verifiche/approfondimenti-anomalie.txt`.

### Contatti

La pagina contiene nell’apertura la foto del gruppo in acqua scelta dall’utente (`gruppo-in-acqua.webp`, configurata in `contactHeroPhoto`), quattro informazioni per la prima visita (culto, studio della Parola, indicazioni e scuola domenicale per i bambini), **un solo spazio di ascolto e preghiera**, FAQ numerate espandibili, invito fotografico **Partecipa ai nostri incontri.** con testi pratici e mappa centrata prima del footer condiviso. Il modulo propone **Una preghiera** come scelta iniziale e **Una domanda** per le informazioni. Cambiare argomento conserva il messaggio: le domande richiedono nome ed email, la preghiera li richiede soltanto scegliendo **Vorrei essere ricontattato**. I recapiti dei pastori e l’email sono raccolti accanto al modulo, senza card ripetitive con indirizzo e orari. La mappa ha una larghezza massima di 980 px; le foto, i dati e il footer restano condivisi con il resto del sito. Le card della prima visita hanno un hover con bordo oro, ombra e icona blu/oro, rispettando il movimento ridotto; sono quattro in fila su desktop e due per fila su tablet e telefono. La quarta FAQ conferma la possibilità di partecipare la domenica con i bambini e la scuola domenicale. Su mobile testo e modulo passano in verticale.

`contact-form.mjs` rende il modulo unico, `public/assets/js/pages/contact.js` gestisce gli argomenti e l’invio. L’endpoint **POST /api/contact** invia una email testuale tramite `src/server/contact.mjs` e Nodemailer, sempre al destinatario `church.email` (**cce.emmanuele@gmail.com**). Il mittente è l’account SMTP configurato; l’email del visitatore viene usata solo come Reply-To. Non ci sono destinatari arbitrari, allegati o letture di file/URL da parte del trasporto. Il server valida lunghezze, argomento e recapiti, limita i corpi JSON a 16 KiB e le richieste a 5 ogni 15 minuti per indirizzo, rifiuta origini esterne e include un campo antispam. Il limite conserva soltanto IP e contatori in memoria; i contenuti del modulo non vengono salvati dal sito o stampati nei log. Su hosting con proxy, il limite usa l’indirizzo del proxy: prima della pubblicazione configurare il limite sul proxy o una gestione degli IP con proxy fidati.

Il browser verifica la disponibilità tramite **GET /api/contact** (restituisce solo un booleano), blocca doppi clic durante l’invio e conserva il testo in caso di errore. La conferma appare soltanto dopo l’accettazione del destinatario da parte del server SMTP; non garantisce la consegna nella posta in arrivo. Non sono previsti tentativi automatici di invio, per evitare duplicazioni. Senza JavaScript, senza configurazione SMTP o se il servizio non risponde, restano disponibili email e telefoni diretti. Non è stato inviato alcun messaggio reale durante i test.

#### Attivare l’invio con Gmail

Le impostazioni non segrete sono già predisposte in `.env` e documentate in `.env.example`:

```dotenv
CONTACT_SMTP_HOST=smtp.gmail.com
CONTACT_SMTP_PORT=465
CONTACT_SMTP_USER=cce.emmanuele@gmail.com
CONTACT_SMTP_PASSWORD=
CONTACT_FROM_EMAIL=cce.emmanuele@gmail.com
```

Il titolare dell’account deve creare una **password per le app di Gmail** e inserirla personalmente come `CONTACT_SMTP_PASSWORD` nel file `.env` locale o nei segreti dell’hosting, senza inviarla in chat. Google richiede la verifica in due passaggi e può limitare la disponibilità delle password per le app in alcuni account: seguire la [guida ufficiale Google](https://support.google.com/accounts/answer/185833?hl=it). Non usare la normale password dell’account. Dopo l’inserimento riavviare il server; il modulo si abilita alla riapertura della pagina. Un altro servizio SMTP può usare le stesse variabili: porta 465 per TLS implicito, 587 per STARTTLS obbligatorio. Il mittente deve essere autorizzato dal servizio. Riferimento: [trasporto SMTP di Nodemailer](https://nodemailer.com/smtp).

Prima della pubblicazione usare HTTPS e predisporre l’informativa relativa ai dati del modulo e al servizio email effettivamente usato. Nessun account, servizio a pagamento o credenziale è stato creato automaticamente.

### Foto autentiche della Home

Le otto fotografie selezionate sono copie WebP da 1600 px di larghezza, qualità 84, con dimensioni dichiarate nell’HTML e testi alternativi descrittivi. La conversione mantiene le fotografie intere; i ritagli di presentazione dipendono soltanto dal CSS. Le HEIC sono state decodificate con `heif-convert`; l’orientamento verticale della tavolata è stato normalizzato nella copia di lavorazione prima della compressione. Nessun volto o ambiente è stato ricreato o ritoccato. Le copie WebP non includono metadati EXIF.

Tutte le **17 immagini fornite dall’utente** sono conservate in `materiali/foto-chiesa/originali/`, incluse le fotografie non ancora utilizzate. `manifest.json` registra nomi e SHA-256 verificati contro i file forniti. `materiali/foto-chiesa/README.md` documenta l’abbinamento tra originali, copie web e sezioni. Le cinque fotografie dimostrative sono state spostate in `materiali/foto-dimostrative/`: non sono più negli asset pubblici o nella build.

### Archivio delle fotografie dimostrative

Crediti delle precedenti fotografie dimostrative, conservate soltanto nell’archivio locale `materiali/foto-dimostrative/`. Erano state scaricate dalle rispettive pagine pubbliche con [licenza Unsplash](https://unsplash.com/license), senza abbonamenti o API Unsplash.

1. `foto-1.webp`: [Priscilla Du Preez — amici insieme](https://unsplash.com/photos/nF8xhLMmg0c).
2. `foto-2.webp`: [Aaron Burden — Bibbia aperta](https://unsplash.com/photos/9zsHNt5OpqE).
3. `foto-3.webp`: [Nathan Mullet — lode comunitaria](https://unsplash.com/photos/huSG9s2KBu8).
4. `foto-4.webp`: [Josh Eckstein — croce in una chiesa](https://unsplash.com/photos/lbjh4Gm53pc).
5. `foto-5.webp`: [Terren Hurst — persone riunite per la lode](https://unsplash.com/photos/jebCcyX6hfs).

## Anteprima locale

Richiede Node.js 22 o successivo. Non occorre `npm install`.

```sh
cd /Users/nunziomerone/Desktop/CceEmmanuele/sito
npm run dev
```

Aprire **http://127.0.0.1:4173/prediche.html**. Per fermare il server: `Ctrl+C`. `npm run build` rigenera le pagine; `npm start` avvia il sito già generato.

L'apertura diretta dei file in `dist/` consente di leggere le altre pagine, ma l'archivio YouTube richiede il server `/api/sermons`.

## Prediche: funzionamento

- Ultimo video pubblico registrato del canale in alto a sinistra; presentazione e pulsante al canale sulla destra. Le dirette in corso e quelle programmate non sono trattate come prediche registrate.
- Tutti i video pubblici del canale, compreso l'ultimo già in evidenza, raggruppati nelle playlist pubbliche effettive. Le playlist nuove compaiono automaticamente; i titoli e le appartenenze seguono YouTube. Playlist vuote e video privati/eliminati non sono mostrati.
- I messaggi senza playlist sono raccolti in **Altri messaggi**. Video presenti in più playlist restano visibili nelle rispettive serie; il conteggio totale li considera una volta sola.
- Ricerca, ordinamento e comando **Filtra** sono raggruppati in una sola barra. Il filtro ha un’icona di regolazione a due cursori da 32 px con testo sotto, senza bordo o sfondo, e un piccolo conteggio delle selezioni attive. Sul telefono la ricerca occupa la prima riga; ordinamento e filtro sono affiancati sotto, con comandi ampi per il touch. L’ordinamento usa il componente riutilizzabile `select-menu.mjs`, con stile e controller separati, menu personalizzato, spunta della scelta attiva e freccia distanziata dal bordo. Supporta frecce, Home/End, selezione con Invio/Spazio, ricerca digitando, Escape, Tab e chiusura cliccando fuori; senza JavaScript resta il select nativo. Il valore e l’evento `change` del select originale continuano a guidare filtri e URL. I filtri si aprono in una modale con tre schede: **Durata**, **Serie**, **Periodo**. Le playlist hanno una ricerca dedicata. L'anno è un filtro autonomo: scegliendo 2019 si vedono tutti i messaggi del 2019 senza dover selezionare mesi. La scelta iniziale è **Tutti gli anni**; i mesi sono facoltativi e vengono proposti per l'anno scelto. Cambiare anno azzera le selezioni dei mesi per evitare combinazioni incompatibili. I filtri per anno, playlist, mesi, date inclusive e durata si combinano.
- Le fasce di durata (0–20, 20–30, 30–40 minuti e successive) sono calcolate dalle durate effettive ricevute da YouTube: compaiono solo fasce con messaggi disponibili. Ogni fascia comprende il limite superiore ed esclude quello inferiore, salvo la prima: 20:00 rientra in 0–20, 20:01 in 20–30. Senza filtro durata restano visibili anche eventuali video di durata non disponibile. Tutte le opzioni derivano dall'intero archivio reale, compreso l'ultimo video.
- Le date sono quelle di pubblicazione su YouTube, visualizzate in Europe/Rome. Non vengono inventate date degli incontri o nomi dei predicatori.
- I filtri applicati vengono conservati nell'URL e possono essere condivisi. Chiudere la modale annulla le modifiche non applicate.
- Ogni playlist mostra al massimo **12 video**, sempre su una sola riga, con al massimo quattro card visibili su desktop. Quando lo spazio si riduce, lo stesso carosello della Home mostra tre, due o una card, con frecce e pallini centrati e trascinamento. Il collegamento **Tutte le prediche della serie** apre `serie.html?playlist=ID`, con titolo della playlist e una griglia a quattro colonne su desktop, che parte da 20 messaggi e ne aggiunge 20 alla volta con **Mostra altre prediche**. La pagina deriva i contenuti dal catalogo YouTube e funziona anche per nuove playlist e per Altri messaggi; non richiede nuove pagine scritte a mano. Comprende ricerca nell’intera serie, ordinamento, filtri dinamici per durata e periodo e lo stesso overlay del player. ID inesistenti o playlist non più disponibili mostrano un messaggio e il collegamento all’archivio. Il caricamento incrementale è disponibile soltanto nella pagina della singola serie; nell’archivio resta l’anteprima in carosello da 12. Le card sono più compatte, con bordi meno arrotondati. Premendo sulla miniatura, sul titolo o nello spazio della card, il video si apre in un overlay ampio, fino a 1120 px, adattato anche al telefono. Il player si carica soltanto al clic; chiudendo con il pulsante, Esc o un clic sullo sfondo, la riproduzione si interrompe e il focus torna alla card. Il player conserva il comando a schermo intero e un collegamento al video su YouTube. Se YouTube impedisce l'incorporamento, resta disponibile il collegamento al video. Il messaggio in evidenza non ripete il link sotto il titolo; resta il pulsante al canale nella presentazione.

Non occorre inserire a mano titoli, ID dei video o playlist nel codice.

## Collegamento YouTube e stato attuale

Canale configurato: `UCr3FkykCqsASxoHjVNK1h9g`.

**Sincronizzazione reale attiva.** Il sito usa il progetto dedicato **Sito Chiesa Emmanuele** (`sito-chiesa-emmanuele`) nell'account Google Cloud di Milena. L'utente ha abilitato YouTube Data API v3 e creato la chiave **Sito Chiesa Emmanuele**, limitata alla sola API YouTube. La chiave è stata recuperata dalla console e salvata esclusivamente in `.env`, con permessi locali `0600`; il valore non è incluso nel browser del sito, nel sito generato o nei repository.

Verifica del 6 ottobre 2026: quota giornaliera assegnata 10.000 unità; `/api/sermons` restituisce `200 ready`, con **380 video pubblici e 30 playlist**. Ultimo video: **VIII Comandamento: Non rubare**, pubblicato il 4 ottobre 2026. L'archivio inferiore contiene tutti i 380 messaggi, più la raccolta dei video senza playlist. Verificati nel browser i filtri reali anno 2019 (10 messaggi), ottobre 2026 (1 messaggio, l'ultimo), Genesi (15 messaggi, caricati da 4 a 8, 12 e 15) e settembre 2026 (5 messaggi). I dati simulati restano esclusivamente nei test.

Il precedente progetto `youtube` (`youtube-242521`, numero `302065205944`) aveva quota giornaliera 0 e non è più usato dal sito. Le sue chiavi sono rimaste inalterate.

L'integrazione usa la quota della YouTube Data API, senza acquistare servizi Google Cloud. Non sono stati attivati abbonamenti, hosting o servizi di fatturazione.

### Configurazione per un altro ambiente

Copiare `.env.example` in `.env` e valorizzare `YOUTUBE_API_KEY`, oppure configurare queste variabili segrete nella piattaforma di hosting. Non inviare la chiave in chat e non distribuirla dentro `dist/`.

La sincronizzazione usa `channels.list`, `playlists.list`, `playlistItems.list` e `videos.list`, con paginazione completa da 50 elementi e deduplicazione. Non accede a Studio, analytics o contenuti privati, né modifica il canale.

La cache è di **15 minuti**, configurabile con `YOUTUBE_CACHE_SECONDS` (60–86400 secondi). Alla prima visita successiva alla scadenza, una raccolta completa non più vecchia di 24 ore viene restituita immediatamente mentre la sincronizzazione procede in background; senza una copia utilizzabile il server attende la sincronizzazione. La pagina aperta ricontrolla una volta al minuto. Le modifiche su YouTube diventano visibili dopo il completamento dell’aggiornamento, tenendo conto dell'eventuale propagazione lato YouTube. Richieste concorrenti condividono la stessa sincronizzazione. Una copia locale in `.cache/youtube.json` conserva l'ultima sincronizzazione riuscita; i dati in attesa di aggiornamento sono accompagnati da un avviso. Una sincronizzazione parziale non sovrascrive la raccolta precedente. In caso di quota esaurita il server attende un’ora prima di riprovare, per evitare chiamate inutili; dopo un ripristino della quota si può riavviare il server per riprovare subito.

### Caricamento e recupero dagli errori

Home, archivio e serie condividono `sermon-loading.mjs` e `loading.css`: prima della risposta mostrano skeleton con le proporzioni delle card, senza fotografie, titoli o video inventati. Il client applica un timeout di 15 secondi per tentativo e fino a due nuovi tentativi automatici per errori di rete, timeout, HTTP 429 e guasti server. Errori di configurazione o dati non validi non vengono ritentati automaticamente. Dopo un errore persistente gli skeleton vengono rimossi e compare un avviso con **Riprova**; eventuali video già caricati restano disponibili. Il recupero non richiede il ricaricamento della pagina. Una miniatura mancante mantiene una superficie neutra e il collegamento al video reale, senza sostituirla con fotografie della chiesa.

Le altre pagine hanno già il testo nell’HTML generato. `components/image-loading.js`, inizializzato in tutte le pagine, applica uno sfondo skeleton alle fotografie mentre attendono i propri dati e gestisce anche immagini inserite successivamente. Le animazioni rispettano la preferenza di movimento ridotto.

Per la pubblicazione servirà un hosting che esegua Node.js, oppure un'implementazione server equivalente per `/api/sermons`: il solo caricamento di `dist/` su hosting statico non basta per l'aggiornamento automatico. Impostare `HOST=0.0.0.0`, usare la porta della piattaforma e conservare la chiave nei suoi segreti. Quando è noto l'IP di uscita del server, aggiungere anche la restrizione per IP alla chiave Google; per ora la chiave resta protetta sul server e limitata alla sola API YouTube.

## Struttura e configurazione

```text
sito/
├── src/
│   ├── config/          # Identità, navigazione e impostazioni dell’interfaccia
│   ├── components/      # Componenti HTML riutilizzabili
│   ├── pages/           # Pagine principali e modello dinamico delle serie
│   ├── layouts/         # Documento HTML comune, navbar e footer
│   ├── domain/          # Raggruppamento e filtri delle prediche
│   ├── utils/           # Escape HTML, date e durate
│   └── server/          # Lettura YouTube e cache
├── public/assets/
│   ├── css/
│   │   ├── tokens.css   # Colori, font, bordi, spaziature e dimensioni condivise
│   │   ├── base.css     # Reset, tipografia e accessibilità
│   │   ├── layout.css   # Contenitori e disposizione comune delle sezioni
│   │   ├── site.css     # Import degli stili condivisi
│   │   ├── components/ # Un file di stile per ciascun componente
│   │   └── pages/       # Solo la disposizione specifica di ogni pagina
│   ├── js/
│   │   ├── main.js      # Avvio dei comportamenti comuni
│   │   ├── components/ # Menu, navbar e player
│   │   └── pages/       # Controller dell’archivio prediche
│   └── images/          # Loghi e fotografie
├── scripts/             # Build, server locale e controlli
├── tests/               # Componenti, filtri e integrazione YouTube
├── verifiche/           # Screenshot e verifiche del browser
└── dist/                # Output generato: non modificare manualmente
```

**Dati della chiesa:** `src/config/site.mjs` contiene identità, contatti, canale YouTube, dominio e navigazione. I recapiti non confermati restano vuoti. `src/config/ui.mjs` contiene il limite dei messaggi nell’anteprima di ogni serie e l’intervallo di aggiornamento dell’archivio.

La palette deriva dai colori esatti del logo ufficiale: blu **#21285D** e arancio **#ED7822**, centralizzati in `--brand-blue` e `--brand-orange`. Titoli, pulsanti, filtri, menu e fasce condividono questi token; i testi arancio su fondo chiaro usano **#A65418** (contrasto superiore a 4,5:1 sui fondi della pagina), mentre sulle fasce blu si usa il tono chiaro **#F7C8A5**. Gli sfondi avorio restano invariati. Le onde decorative aggiornate sono in `welcome-waves-brand.svg`; il precedente asset è conservato. Per le superfici piene dei pulsanti caldi e dei cerchi social nella Home si usa l’arancio attenuato **#DEA16F** (`--accent-fill`), con testo e icone blu: la stessa tonalità evita la differenza tra pulsante pieno e precedente sfumatura dei social. Il logo conserva i suoi colori originali. I nomi storici dei token `--gold` e `--button-gold-*` restano compatibili con i componenti esistenti; il primo indica l’arancio del logo, mentre i pulsanti usano la variante attenuata.

**Identità visiva:** `public/assets/css/tokens.css` è il punto comune per cambiare colori, font, larghezza del sito, spaziature laterali, altezza della navbar e arrotondamenti. Per esempio, `--button-radius: 12px` controlla la forma di tutti i pulsanti; `--card-radius` e `--featured-card-radius` controllano le card.

**Componenti:** navbar, footer, invito, valori, pulsanti, link, card, playlist, filtri e overlay del player hanno ciascuno il proprio modulo. I componenti utilizzati anche dal browser vengono copiati nella build da `src/`, senza duplicare il loro codice in `public/`. Il server e la chiave API non vengono distribuiti al browser.

### Animazioni e interazioni

Il componente condiviso `public/assets/js/components/motion.js`, con stile in `motion.css`, gestisce comparse progressive all’apertura e allo scorrimento tramite IntersectionObserver. Titolo iniziale, fotografie, contenuti delle sezioni e card YouTube entrano con piccoli intervalli tra gli elementi, una volta per caricamento della pagina. Le card caricate successivamente vengono registrate con MutationObserver. Il focus da tastiera rende immediatamente disponibile il contenuto; senza JavaScript o IntersectionObserver tutto resta visibile. La preferenza di movimento ridotto disattiva comparse, animazioni delle icone e rotazione delle foto. Durata ed easing sono configurabili in `tokens.css`.

I pulsanti non si sollevano: nella variante blu lo sfondo resta blu, mentre solo testo e freccia diventano oro e la freccia scorre verso destra. Il comando iniziale **Guarda le prediche** mantiene sfondo trasparente e bordo oro: il testo passa dall’oro al blu e il triangolo del play diventa blu, conservando il breve movimento e l’alone attorno al cerchio. I collegamenti **Scopri chi siamo** e **Tutte le prediche** usano `textLink(..., { variant: 'feature' })`, con sottolineatura progressiva e freccia, senza contorno. Hover e focus condividono il trattamento.

### Pulsanti coerenti

Tutte le azioni principali usano `src/components/button.mjs` e `public/assets/css/components/button.css`, compreso il pulsante del menu mobile e quelli generati nell’archivio. Le classi condivise sono:

- `.button`: forma, tipografia, spaziatura, icona e comportamento comuni.
- `.button--primary`, `.button--outline`, `.button--accent-outline`, `.button--gold`, `.button--light`, `.button--text`: varianti di colore e trattamento.
- `.button--icon-label`: icona grande sopra l’etichetta, senza riquadro, per comandi come Filtra.
- `.button--small` e `.button--large`: dimensioni compatta e ampia, mantenendo lo stesso arrotondamento.

```js
button({
  href: 'chi-siamo.html',
  label: 'Conosci la nostra chiesa',
  variant: 'primary',
});
```

Il renderer sceglie un collegamento per la navigazione e un vero pulsante per le azioni; gestisce escape del testo, icone e attributi accessibili. Per link esterni impostare `external: true` e, se desiderato, `iconName: 'external'`. Per un’azione di modulo usare `type: 'submit'`.

Le pagine possono posizionare i pulsanti, ma non devono ridefinirne bordo, colore o forma. Eventuali nuove varianti vanno aggiunte al componente condiviso. Schede dei filtri, checkbox, chip di selezione e comandi del player conservano gli stili dei rispettivi controlli perché hanno funzioni differenti.

### Aggiungere una pagina o un componente

Creare la pagina in `src/pages/`, registrarla in `src/pages/index.mjs` e aggiungere il suo foglio in `public/assets/css/pages/`. I componenti riutilizzabili vanno in `src/components/`, con un foglio omonimo in `public/assets/css/components/`; importare lo stile nell’entry condivisa o nelle pagine che lo utilizzano. I comportamenti browser dei componenti vanno in `public/assets/js/components/`. Se un renderer condiviso viene importato dal browser, aggiungerlo alla lista `browserModules` in `scripts/build.mjs`.

Dopo ogni modifica eseguire `npm run build` oppure `npm run check`; l’anteprima già avviata serve automaticamente i file rigenerati. Riavviare il server quando cambiano `.env`, configurazione server o codice dell’integrazione YouTube.

La build prepara la generazione in una cartella temporanea e pubblica ogni file mediante rinomina atomica. Non elimina prima gli asset distribuiti: durante una rigenerazione le pagine aperte continuano a trovare i moduli, senza finestre di 404 o file parziali. I vecchi asset non più referenziati rimangono disponibili per le pagine già aperte.

## Controlli

```sh
npm run check
```

Comprende la sintassi di tutti i moduli, build, collegamenti interni, ancore, import CSS/JavaScript e test dei componenti condivisi (contenuti escapati, semantica dei pulsanti, anteprime e serie complete da 500 messaggi), oltre a: paginazione oltre 50 video, playlist sovrapposte, contenuti privati/eliminati/esterni, errori e cache, mesi, fuso orario, intervalli inclusivi, durate ISO 8601, confini delle fasce senza sovrapposizioni e filtri condivisibili.

I controlli includono inoltre recupero e limiti dei tentativi del client, skeleton senza contenuti fittizi, miniature mancanti, risposta immediata dalla cache durante una sincronizzazione condivisa e lettura degli asset durante la pubblicazione atomica. La verifica browser del caricamento usa un server locale separato con risposte lente o errori simulati, senza chiamate aggiuntive a YouTube.

## Altri contenuti e materiali

L’indirizzo, l’email della chiesa e i numeri dei pastori sono confermati e configurati nei rispettivi moduli. I testi di Chi siamo e le biografie dei pastori riprendono il riferimento reale fornito dall’utente; le immagini della storia della comunità restano sostituibili.

Il logo aggiornato proviene dal PDF **Logo CCEEmm** fornito dall’utente; una copia inalterata è conservata in `materiali/loghi/logo-cce-emmanuele-2026.pdf`. `logo-emmanuele-2026.svg`, usato da navbar e footer, conserva simbolo, colori e tutte le scritte originali; i caratteri incorporati nel PDF sono esportati come contorni vettoriali, senza font esterni. `favicon-emmanuele-2026.svg` contiene i soli tracciati originali della nuova “e”, su fondo avorio circolare con bordo blu; è disponibile anche una versione PNG da 32 px. I riferimenti sono centralizzati in `branding` in `src/config/site.mjs`, con nomi nuovi per evitare la cache della vecchia favicon. I precedenti file del logo restano conservati. Le foto locali provengono dagli SVG della proposta `idee_social/06_la_vita_della_comunita/sorgenti/`, fotogrammi autentici a 04:42 e 01:35. Gli originali restano separati; le copie WebP sono ottimizzate per il sito. Nessun materiale sorgente della cartella principale è stato alterato.

Quando l'API è disponibile, miniature e player provengono da YouTube; il player viene caricato al clic tramite `youtube-nocookie.com`. Font di sistema, nessun analytics. La pagina Contatti espone email e telefono reali quando configurati; non simula invii di moduli.

Prima della pubblicazione, impostare il dominio HTTPS in `church.publicUrl`, rigenerare e predisporre le informazioni privacy pertinenti. La bozza resta `noindex` finché non è configurato il dominio. L’anteprima statica viene pubblicata su GitHub Pages nell’account personale NunzioMerone; vedere `GITHUB-PAGES.md` per le differenze rispetto al server locale e gli aggiornamenti.

Documentazione: [avvio e quote](https://developers.google.com/youtube/v3/getting-started), [playlist](https://developers.google.com/youtube/v3/docs/playlists/list), [elementi delle playlist](https://developers.google.com/youtube/v3/docs/playlistItems/list), [video](https://developers.google.com/youtube/v3/docs/videos/list).

### Serie complete e card condivise

La pagina `serie.html?playlist=ID` usa il componente `series-results.mjs`: griglia a **quattro colonne su desktop**, tre, due o una secondo lo spazio disponibile. Non contiene caroselli o navigazione tra gruppi. Mostra inizialmente **20 prediche**; **Mostra altre prediche** aggiunge 20 card in fondo senza sostituire le precedenti e senza duplicati. L’ultimo caricamento aggiunge soltanto i messaggi rimasti e poi il pulsante scompare. `sermonUi.seriesBatchSize` configura il numero di card per caricamento; `utils/pagination.mjs` calcola il prefisso visibile. Tutti i video restano accessibili anche nelle playlist molto lunghe.

Ricerca e filtri operano sull’intera serie; cambiarli, o modificare l’ordinamento, riparte dai primi 20 risultati. I filtri sono conservati nell’URL. `playlistArchive` deriva anni, mesi, date e fasce di durata dai soli video della playlist richiesta. La modale condivisa (`sermon-filters.mjs` e `components/sermon-filters.js`) nella serie propone soltanto **Durata** e **Periodo**, senza la scelta di playlist. Il menu **Filtra per anno** riutilizza lo stesso `select-menu` dell’ordinamento: le opzioni si aggiornano dopo il caricamento dei dati, la freccia ha spazio dal bordo, la voce attiva ha una spunta e il menu supporta tastiera ed Escape. La ricerca, l’ordinamento e gli indicatori delle selezioni sono condivisi con l’archivio.

Lo stile di tutte le card normali è centralizzato in `components/sermon-card.css`: miniature 16:9, fondo avorio leggero, accento oro, titolo fino a due righe e altezza uniforme. Su desktop hover e focus da tastiera fanno salire il pannello chiaro **di 34 px sopra l’anteprima**, senza cambiare altezza della card o dimensioni dell’immagine. **Guarda su YouTube** compare con un breve ritardo; il link ha overflow visibile e spazio per il movimento dell’icona. Su touch e schermi fino a 620 px il collegamento resta subito visibile con lo spazio già riservato nella card. Le transizioni rispettano la preferenza di movimento ridotto; la card in evidenza mantiene il proprio formato.
