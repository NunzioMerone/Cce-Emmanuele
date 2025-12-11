import React, { useState, useEffect } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { Mission } from "../../types/mission";
import { storage } from "../../utils/storageUtils";

const defaultMission: Mission = {
  id: "1",
  content: `La nostra missione è quella di essere una comunità di credenti che ama Dio con tutto il cuore e il prossimo come se stessi. Cerchiamo di vivere secondo gli insegnamenti di Gesù Cristo, proclamando il Vangelo e facendo discepoli in tutte le nazioni.

Crediamo che ogni persona sia preziosa agli occhi di Dio e abbia bisogno di conoscere l'amore redentore di Cristo. Per questo motivo, ci impegniamo a:

• Adorare Dio in spirito e verità
• Studiare e vivere la Parola di Dio
• Proclamare il Vangelo con parole e azioni
• Formare discepoli maturi nella fede
• Servire la comunità locale con amore
• Sostenere l'opera missionaria nel mondo`,
  verses: [
    {
      text: "Andate dunque e fate miei discepoli tutti i popoli battezzandoli nel nome del Padre, del Figlio e dello Spirito Santo, insegnando loro a osservare tutte quante le cose che vi ho comandate. Ed ecco, io sono con voi tutti i giorni, sino alla fine dell'età presente.",
      reference: "Matteo 28:19-20",
    },
    {
      text: 'Gesù gli disse: "Ama il Signore Dio tuo con tutto il tuo cuore, con tutta la tua anima e con tutta la tua mente". Questo è il grande e il primo comandamento. Il secondo, simile a questo, è: "Ama il tuo prossimo come te stesso".',
      reference: "Matteo 22:37-39",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MissionSection: React.FC = () => {
  const [mission, setMission] = useState<Mission>(defaultMission);

  useEffect(() => {
    const stored = storage.getMission();
    if (stored) setMission(stored);
  }, []);

  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="La Nostra Missione"
          subtitle="Chiamati a seguire Cristo e a fare discepoli"
        />

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-12">
            {mission.content}
          </div>

          <div className="space-y-8">
            {mission.verses.map((verse, index) => (
              <blockquote
                key={index}
                className="border-l-4 border-primary-600 pl-6 py-4 bg-primary-50 rounded-r-lg animate-fade-in"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: "both",
                }}
              >
                <p className="text-gray-800 italic mb-3 text-lg">
                  "{verse.text}"
                </p>
                <footer className="text-primary-700 font-semibold">
                  — {verse.reference}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
