import React, { useState, useEffect } from "react";
import { Ministry } from "../../types/ministries";
import { storage } from "../../utils/storageUtils";
import { ministriesMock } from "../../utils/ministriesMock";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Modal } from "../common/Modal";

export const AdminMinistries: React.FC = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    schedule: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadMinistries();
  }, []);

  const loadMinistries = () => {
    const stored = storage.getMinistries();
    setMinistries(stored || ministriesMock);
  };

  const saveMinistries = (updatedMinistries: Ministry[]) => {
    storage.setMinistries(updatedMinistries);
    setMinistries(updatedMinistries);
  };

  const handleAdd = () => {
    setEditingMinistry(null);
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      schedule: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title,
      description: ministry.description,
      fullDescription: ministry.fullDescription || "",
      schedule: ministry.schedule || "",
      image: ministry.image,
    });
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questo ministero?")) {
      const updated = ministries.filter((m) => m.id !== id);
      saveMinistries(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;

    // If there's a new image file, save it
    if (imageFile) {
      // In a real app, you would upload to a server or cloud storage
      // For now, we'll use the data URL
      imageUrl = formData.image;
    }

    if (editingMinistry) {
      const updated = ministries.map((m) =>
        m.id === editingMinistry.id
          ? {
              ...m,
              title: formData.title,
              description: formData.description,
              fullDescription: formData.fullDescription,
              schedule: formData.schedule,
              image: imageUrl,
              updatedAt: new Date().toISOString(),
            }
          : m
      );
      saveMinistries(updated);
    } else {
      const newMinistry: Ministry = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        schedule: formData.schedule,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveMinistries([...ministries, newMinistry]);
    }

    setIsModalOpen(false);
    setImageFile(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gestione Ministeri</h2>
        <Button
          onClick={handleAdd}
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
        >
          + Aggiungi Ministero
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ministries.map((ministry) => (
          <Card key={ministry.id} className="p-6">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  className="w-10 h-10"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {ministry.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {ministry.description}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ministry)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(ministry.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMinistry ? "Modifica Ministero" : "Nuovo Ministero"}
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
            value={formData.fullDescription}
            onChange={(value) =>
              setFormData({ ...formData, fullDescription: value })
            }
            required
            rows={4}
          />
          <Input
            label="Orario/Frequenza"
            value={formData.schedule}
            onChange={(value) => setFormData({ ...formData, schedule: value })}
            placeholder="Es: Ogni settimana • Giovedì ore 20:00"
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Immagine
            </label>
            <div className="flex items-center space-x-4">
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingMinistry ? "Aggiorna" : "Crea"}
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
