# Sito della Chiesa Emmanuele

Sito multipagina in HTML, CSS e JavaScript, con server Node.js 22 per YouTube e invio email SMTP.

Anteprima: https://nunziomerone.github.io/Cce-Emmanuele/

## Avvio locale

```sh
npm ci
cp .env.example .env
npm run dev
```

Configurare personalmente le credenziali nel file `.env`, escluso da Git. Non inserire le password nel codice o nel browser.

`npm run check` verifica sintassi, build, collegamenti e test.

## Anteprima GitHub Pages

`npm run build:preview` genera `dist-preview/`, con catalogo pubblico delle prediche e modulo che apre l’app di posta. Il server locale conserva l’invio diretto SMTP e la sincronizzazione YouTube.

Vedere [GITHUB-PAGES.md](GITHUB-PAGES.md) per configurazione e aggiornamenti. Le informazioni della chiesa sono in `src/config/`; i testi lorem ipsum in Chi siamo restano una bozza da completare con i pastori.
