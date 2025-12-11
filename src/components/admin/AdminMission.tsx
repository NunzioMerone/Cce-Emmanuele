import React, { useState, useEffect } from "react";
import { Mission, BibleVerse } from "../../types/mission";
import { storage } from "../../utils/storageUtils";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Card } from "../common/Card";

const defaultMission: Mission = {
  id: "1",
  content: "",
  verses: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const AdminMission: React.FC = () => {
  const [mission, setMission] = useState<Mission>(defaultMission);
  const [newVerse, setNewVerse] = useState<BibleVerse>({
    text: "",
    reference: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = storage.getMission();
    if (stored) setMission(stored);
  }, []);

  const handleSave = () => {
    const updated = {
      ...mission,
      updatedAt: new Date().toISOString(),
    };
    storage.setMission(updated);
    setMission(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddVerse = () => {
    if (newVerse.text && newVerse.reference) {
      setMission({
        ...mission,
        verses: [...mission.verses, newVerse],
      });
      setNewVerse({ text: "", reference: "" });
    }
  };

  const handleRemoveVerse = (index: number) => {
    setMission({
      ...mission,
      verses: mission.verses.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gestione Missione</h2>
        <Button onClick={handleSave} variant="primary">
          {isSaved ? "✓ Salvato" : "Salva Modifiche"}
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Contenuto Missione
          </h3>
          <TextArea
            label="Testo della missione"
            value={mission.content}
            onChange={(value) => setMission({ ...mission, content: value })}
            rows={12}
            placeholder="Descrivi la missione della chiesa..."
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Versetti Biblici
          </h3>

          <div className="space-y-4 mb-6">
            {mission.verses.map((verse, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-800 italic flex-1">"{verse.text}"</p>
                  <button
                    onClick={() => handleRemoveVerse(index)}
                    className="ml-4 text-red-600 hover:text-red-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-primary-600 font-semibold">
                  — {verse.reference}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Aggiungi Nuovo Versetto
            </h4>
            <div className="space-y-3">
              <TextArea
                label="Testo del versetto"
                value={newVerse.text}
                onChange={(value) => setNewVerse({ ...newVerse, text: value })}
                rows={3}
                placeholder="Inserisci il testo del versetto..."
              />
              <Input
                label="Riferimento biblico"
                value={newVerse.reference}
                onChange={(value) =>
                  setNewVerse({ ...newVerse, reference: value })
                }
                placeholder="Es: Giovanni 3:16"
              />
              <Button
                onClick={handleAddVerse}
                variant="outline"
                className="w-full"
              >
                + Aggiungi Versetto
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
