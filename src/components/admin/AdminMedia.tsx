import React, { useState, useEffect } from "react";
import { MediaItem, MediaFormData } from "../../types/media";
import { storage } from "../../utils/storageUtils";
import { mediaMock } from "../../utils/mediaMock";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Modal } from "../common/Modal";

export const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState<MediaFormData>({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnail: "",
  });

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = () => {
    const stored = storage.getMedia();
    setMedia(stored || mediaMock);
  };

  const saveMedia = (updatedMedia: MediaItem[]) => {
    storage.setMedia(updatedMedia);
    setMedia(updatedMedia);
  };

  const handleAdd = () => {
    setEditingMedia(null);
    setFormData({ title: "", description: "", youtubeUrl: "", thumbnail: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (mediaItem: MediaItem) => {
    setEditingMedia(mediaItem);
    setFormData({
      title: mediaItem.title,
      description: mediaItem.description,
      youtubeUrl: mediaItem.youtubeUrl,
      thumbnail: mediaItem.thumbnail,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questo video?")) {
      const updated = media.filter((m) => m.id !== id);
      saveMedia(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMedia) {
      const updated = media.map((m) =>
        m.id === editingMedia.id
          ? { ...m, ...formData, updatedAt: new Date().toISOString() }
          : m
      );
      saveMedia(updated);
    } else {
      const newMedia: MediaItem = {
        id: Date.now().toString(),
        ...formData,
        publishedAt: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveMedia([...media, newMedia]);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Gestione Media</h2>
        <Button onClick={handleAdd} variant="primary">
          + Aggiungi Video
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Modifica
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Elimina
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMedia ? "Modifica Video" : "Nuovo Video"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Titolo"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
          />
          <TextArea
            label="Descrizione"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            required
            rows={3}
          />
          <Input
            label="URL YouTube"
            value={formData.youtubeUrl}
            onChange={(value) =>
              setFormData({ ...formData, youtubeUrl: value })
            }
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          <Input
            label="Nome file thumbnail (es: media-thumb-1.jpg)"
            value={formData.thumbnail}
            onChange={(value) => setFormData({ ...formData, thumbnail: value })}
            placeholder="/media-thumb-1.jpg"
            required
          />
          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              {editingMedia ? "Aggiorna" : "Crea"}
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
