import React, { useState } from "react";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Button } from "../common/Button";
import { ContactFormData, ContactFormErrors } from "../../types/contact";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: "",
    cognome: "",
    cellulare: undefined,
    messaggio: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Il nome è obbligatorio";
    }

    if (!formData.cognome.trim()) {
      newErrors.cognome = "Il cognome è obbligatorio";
    }

    if (!formData.messaggio.trim()) {
      newErrors.messaggio = "Il messaggio è obbligatorio";
    } else if (formData.messaggio.trim().length < 10) {
      newErrors.messaggio = "Il messaggio deve contenere almeno 10 caratteri";
    }

    if (formData.cellulare && !/^[0-9+\s()-]{9,}$/.test(formData.cellulare)) {
      newErrors.cellulare = "Inserisci un numero di telefono valido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nome: "",
          cognome: "",
          cellulare: undefined,
          messaggio: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-100 shadow-sm animate-fade-in">
      {isSubmitted ? (
        <div className="text-center py-12 animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Messaggio inviato!
          </h3>
          <p className="text-gray-600">Ti risponderemo al più presto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome"
              value={formData.nome}
              onChange={(value) => setFormData({ ...formData, nome: value })}
              placeholder="Mario"
              error={errors.nome}
              required
            />
            <Input
              label="Cognome"
              value={formData.cognome}
              onChange={(value) => setFormData({ ...formData, cognome: value })}
              placeholder="Rossi"
              error={errors.cognome}
              required
            />
          </div>

          <Input
            label="Cellulare (opzionale)"
            type="tel"
            value={formData.cellulare || ""}
            onChange={(value) =>
              setFormData({ ...formData, cellulare: value || undefined })
            }
            placeholder="+39 123 456 7890"
            error={errors.cellulare}
          />

          <TextArea
            label="Messaggio"
            value={formData.messaggio}
            onChange={(value) => setFormData({ ...formData, messaggio: value })}
            placeholder="Scrivi qui il tuo messaggio..."
            error={errors.messaggio}
            required
            rows={6}
          />

          <Button type="submit" variant="primary" size="md" className="w-full">
            Invia Messaggio
          </Button>
        </form>
      )}
    </div>
  );
};
