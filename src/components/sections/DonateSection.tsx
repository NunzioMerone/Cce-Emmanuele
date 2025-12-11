import React, { useState } from "react";
import { SectionTitle } from "../common/SectionTitle";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

const suggestedAmounts = [
  { value: 5, label: "5€" },
  { value: 10, label: "10€" },
  { value: 20, label: "20€" },
  { value: 50, label: "50€" },
];

export const DonateSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonate = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAmount(null);
      setCustomAmount("");
    }, 3000);
  };

  return (
    <section
      id="donate"
      className="py-24 bg-gradient-to-b from-white to-primary-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Sostieni la Nostra Missione"
          subtitle="Il tuo contributo aiuta a diffondere il Vangelo e sostenere le attività della chiesa"
        />

        <Card className="p-8 md:p-12">
          {showSuccess ? (
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
                Grazie per il tuo sostegno!
              </h3>
              <p className="text-gray-600">
                La tua generosità fa la differenza nel Regno di Dio.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Scegli un importo
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => {
                        setSelectedAmount(amount.value);
                        setCustomAmount("");
                      }}
                      className={`py-4 px-6 rounded-xl font-semibold transition-all ${
                        selectedAmount === amount.value
                          ? "bg-primary-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oppure inserisci un importo personalizzato
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    €
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Come vengono utilizzate le donazioni?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
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
                    Sostegno alle attività di culto e studio biblico
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
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
                    Progetti di evangelizzazione e missioni
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
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
                    Assistenza a persone e famiglie in difficoltà
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
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
                    Manutenzione e miglioramento delle strutture
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleDonate}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!selectedAmount && !customAmount}
              >
                Dona Ora
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Questa è una demo. Nessun pagamento reale verrà elaborato.
              </p>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};
