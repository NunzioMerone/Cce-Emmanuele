import { Ministry } from "../types/ministries";

export const ministriesMock: Ministry[] = [
  {
    id: "1",
    title: "Ministero Giovani",
    description:
      "Incontri ogni due settimane per i giovani con momenti di comunione, cibo, giochi e riflessioni sulla fede",
    image: "/giovani.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Ogni 2 settimane • Venerdì ore 20:00-22:30",
    fullDescription:
      "Un appuntamento fisso per i giovani della nostra comunità! Ogni due settimane ci riuniamo il venerdì sera per passare del tempo insieme in un ambiente rilassato e accogliente. La serata inizia con una cena condivisa, seguita da giochi e attività che favoriscono la conoscenza reciproca. Concludiamo con un breve messaggio di incoraggiamento dalla Parola di Dio, creando uno spazio dove la fede incontra l'amicizia.",
  },
  {
    id: "2",
    title: "Calcetto",
    description:
      "Partite di calcetto per stare insieme e divertirsi praticando sport in un clima di sana competizione",
    image: "/ministeroCalcio.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Ogni domenica • Ore 21:00",
    fullDescription:
      "Una bella partita di calcetto per concludere la domenica in allegria! Ogni settimana ci ritroviamo per giocare insieme, senza distinzione di età o livello. È un momento importante per costruire relazioni fraterne attraverso lo sport, dove il vero obiettivo è divertirsi e crescere come comunità. Tutti sono benvenuti, anche chi vuole semplicemente tifare!",
  },
  {
    id: "3",
    title: "Adorazione",
    description:
      "Momenti dedicati alla preghiera e al canto per adorare Dio insieme come comunità",
    image: "/lode.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Una volta al mese • Domenica ore 18:00",
    fullDescription:
      "Un appuntamento mensile speciale dove ci riuniamo per dedicare tempo alla preghiera e alla lode. Attraverso il canto e momenti di intimità con Dio, sperimentiamo la Sua presenza in modo profondo. È un tempo dove mettiamo da parte le distrazioni quotidiane per concentrarci su ciò che conta davvero: la nostra relazione con il Padre.",
  },
  {
    id: "4",
    title: "Studio Biblico",
    description:
      "Approfondimento settimanale della Bibbia con studi tematici per crescere nella conoscenza della Parola",
    image: "/studioBibblico.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Ogni giovedì • Ore 18:00 o 20:00",
    fullDescription:
      "Ogni settimana ci immergiamo nella Parola di Dio attraverso studi tematici approfonditi. Gli incontri sono disponibili in due turni (ore 18:00 e 20:00) per permettere a tutti di partecipare. Affrontiamo argomenti specifici, discutiamo insieme e impariamo ad applicare gli insegnamenti biblici alla nostra vita quotidiana. È un momento di crescita spirituale fondamentale per la nostra fede.",
  },
  {
    id: "5",
    title: "Teologia Sistematica",
    description:
      "Studio mensile approfondito della dottrina cristiana attraverso il libro di Teologia Sistematica",
    image: "/teologiaSistematica.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Una volta al mese • Sabato",
    fullDescription:
      "Un percorso di studio teologico rigoroso per chi desidera approfondire la propria comprensione della fede cristiana. Utilizziamo il manuale di Teologia Sistematica per esplorare in modo organico le grandi dottrine della Chiesa. Ogni mese affrontiamo un argomento specifico, dall'ecclesiologia all'escatologia, dalla soteriologia alla pneumatologia, costruendo una solida base dottrinale.",
  },
  {
    id: "6",
    title: "Preghiera",
    description:
      "Incontri di preghiera comunitaria per condividere richieste e intercedere insieme",
    image: "/preghiera.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Ogni 2 settimane • Domenica sera",
    fullDescription:
      "Ogni due settimane ci riuniamo la domenica sera per pregare insieme come famiglia spirituale. Condividiamo notizie, richieste di preghiera e testimonianze di come Dio sta operando nelle nostre vite. È un momento potente dove ci sosteniamo a vicenda nell'intercessione, portando al Signore le nostre gioie, preoccupazioni e bisogni.",
  },
  {
    id: "7",
    title: "Scuola Domenicale",
    description:
      "Attività educative e ludiche per bambini durante il culto domenicale per insegnare la Bibbia",
    image: "/ScuolaDomenicale.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schedule: "Ogni domenica mattina • Durante il culto",
    fullDescription:
      "Mentre gli adulti partecipano al culto, i bambini hanno il loro spazio speciale! Attraverso giochi, canzoni, attività creative e storie bibliche, i più piccoli imparano a conoscere Dio in modo divertente e adatto alla loro età. I nostri insegnanti preparano lezioni coinvolgenti che aiutano i bambini a crescere nella fede fin da piccoli, ponendo basi solide per il loro cammino spirituale.",
  },
];
