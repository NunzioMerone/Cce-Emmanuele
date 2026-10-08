# Anteprima su GitHub Pages

Repository personale: https://github.com/NunzioMerone/Cce-Emmanuele

Anteprima stabile: https://nunziomerone.github.io/Cce-Emmanuele/

Il progetto attuale è nella cartella `sito/` del repository. La versione React precedente resta alla radice e nella cronologia; il workflow `.github/workflows/deploy.yml` pubblica esclusivamente la nuova anteprima.

## Funzionamento

- Tutte le pagine, foto e interazioni vengono distribuite come file statici. I percorsi relativi funzionano anche sotto `/Cce-Emmanuele/`.
- Le prediche usano `preview/sermons.json`, una copia dei dati pubblici YouTube esportata dal server locale. La raccolta online cambia quando si aggiorna questa copia e si pubblica un nuovo commit; non si sincronizza automaticamente con YouTube.
- Nell’anteprima il modulo Contatti apre l’app di posta con il messaggio compilato. Il testo del modulo e il pulsante dichiarano questo comportamento. L’invio diretto tramite SMTP resta attivo nel sito locale e richiederà un hosting Node.js nella versione definitiva.
- La bozza resta `noindex, nofollow`. GitHub Pages e il repository sono pubblici: chi conosce il link può visitarli.
- `.env`, credenziali SMTP, chiave YouTube, cache, originali delle foto e screenshot non vengono pubblicati. Il workflow non richiede segreti.

## Generazione e aggiornamento

Con il server locale attivo, aggiornare la copia pubblica delle prediche:

```sh
npm run preview:catalog
```

Per un server su un’altra porta: `npm run preview:catalog -- http://127.0.0.1:PORT/api/sermons`.

Verificare e generare l’anteprima:

```sh
npm run check
npm run build:preview
node scripts/check.mjs --static-preview
```

L’output è `dist-preview/`, separato da `dist/` usato dal server locale. Nel repository si aggiornano i sorgenti della cartella `sito/`, non i file generati. Dopo un push su `main`, GitHub Actions esegue verifiche, build e pubblicazione sullo stesso indirizzo.
