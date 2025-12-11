import React, { useState, useEffect } from "react";
import { Event, EventFormData } from "../../types/events";
import { storage } from "../../utils/storageUtils";
import { eventsMock } from "../../utils/eventsMock";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Modal } from "../common/Modal";

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    time: "",
    location: "Via Gaetano de Rosa 81, Napoli",
    guest: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const stored = storage.getEvents();
    setEvents(stored || eventsMock);
  };

  const saveEvents = (updatedEvents: Event[]) => {
    storage.setEvents(updatedEvents);
    setEvents(updatedEvents);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      date: "",
      time: "",
      location: "Via Gaetano de Rosa 81, Napoli",
      guest: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      fullDescription: event.fullDescription || "",
      date: event.date,
      time: event.time || "",
      location: event.location || "Via Gaetano de Rosa 81, Napoli",
      guest: event.guest || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questo evento?")) {
      const updated = events.filter((e) => e.id !== id);
      saveEvents(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      const updated = events.map((e) =>
        e.id === editingEvent.id
          ? { ...e, ...formData, updatedAt: new Date().toISOString() }
          : e
      );
      saveEvents(updated);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        guest: formData.guest || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveEvents([...events, newEvent]);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gestione Eventi</h2>
        <Button
          onClick={handleAdd}
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
        >
          + Aggiungi Evento
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold text-primary-600 mr-3">
                    {new Date(event.date).toLocaleDateString("it-IT")}
                  </span>
                  {event.guest && (
                    <span className="text-sm text-gray-500">
                      con {event.guest}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "Modifica Evento" : "Nuovo Evento"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Titolo"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />
          <TextArea
            label="Descrizione breve"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
            rows={2}
          />
          <TextArea
            label="Descrizione completa"
            value={formData.fullDescription || ""}
            onChange={(value) =>
              setFormData({ ...formData, fullDescription: value })
            }
            required
            rows={4}
          />
          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData({ ...formData, date: value })}
            required
          />
          <Input
            label="Ora"
            type="time"
            value={formData.time || ""}
            onChange={(value) => setFormData({ ...formData, time: value })}
          />
          <Input
            label="Luogo"
            value={formData.location || ""}
            onChange={(value) => setFormData({ ...formData, location: value })}
            placeholder="Via Gaetano de Rosa 81, Napoli"
          />
          <Input
            label="Ospite (opzionale)"
            value={formData.guest || ""}
            onChange={(value) => setFormData({ ...formData, guest: value })}
          />
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingEvent ? "Aggiorna" : "Crea"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Annulla
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
