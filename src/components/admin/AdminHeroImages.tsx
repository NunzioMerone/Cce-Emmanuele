import React, { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { googleDriveService, HeroImage } from "../../services/googleDriveApi";

export const AdminHeroImages: React.FC = () => {
  const [pendingImages, setPendingImages] = useState<HeroImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [approvedImages, setApprovedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadApprovedImages();
  }, []);

  const loadApprovedImages = () => {
    const approved = googleDriveService.getApprovedImages();
    setApprovedImages(approved);
  };

  const handleLoadFromDrive = async () => {
    setIsLoading(true);
    try {
      const images = await googleDriveService.getHeroImages();

      if (images.length === 0) {
        alert("⚠️ Nessuna immagine trovata su Google Drive");
        return;
      }

      setPendingImages(images);
      setSelectedImages(new Set(images.map((img) => img.id)));

      alert(
        `✅ ${images.length} immagini caricate!\n\nRevisionle e clicca "Approva Selezionate"`
      );
    } catch (error) {
      console.error("Errore:", error);
      alert("❌ Errore durante il caricamento");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const handleApprove = () => {
    const selectedUrls = pendingImages
      .filter((img) => selectedImages.has(img.id))
      .map((img) => img.url);

    if (selectedUrls.length === 0) {
      alert("⚠️ Seleziona almeno un'immagine");
      return;
    }

    googleDriveService.saveApprovedImages(selectedUrls);
    setApprovedImages(selectedUrls);
    setPendingImages([]);
    setSelectedImages(new Set());

    alert(
      `✅ ${selectedUrls.length} immagini approvate!\n\nSaranno visibili nella hero del sito.`
    );
  };

  const handleCancel = () => {
    if (confirm("Annullare la selezione?")) {
      setPendingImages([]);
      setSelectedImages(new Set());
    }
  };

  const handleRemoveApproved = (url: string) => {
    if (confirm("Rimuovere questa immagine dalla hero?")) {
      const updated = approvedImages.filter((img) => img !== url);
      googleDriveService.saveApprovedImages(updated);
      setApprovedImages(updated);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Immagini Hero</h2>
          <p className="text-gray-600 mt-2">
            Carica e approva le immagini dello slideshow
          </p>
        </div>
        <Button
          onClick={handleLoadFromDrive}
          variant="primary"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Caricamento...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Carica da Google Drive
            </>
          )}
        </Button>
      </div>

      <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Come Funziona
            </h3>
            <ol className="text-gray-600 space-y-2 text-sm">
              <li>
                1. Vai su{" "}
                <a
                  href="https://drive.google.com/drive/folders/1TY7weA0yXJVM3APBMJ0DhEy78RrZqRZH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Google Drive → Cartella Hero
                </a>
              </li>
              <li>2. Carica le tue immagini (JPG o PNG)</li>
              <li>
                3. Clicca "Carica da Google Drive" per vedere le nuove immagini
              </li>
              <li>
                4. Seleziona quali immagini approvare (clicca la X per
                deselezionare)
              </li>
              <li>
                5. Clicca "Approva Selezionate" per pubblicarle sulla hero!
              </li>
            </ol>
          </div>
        </div>
      </Card>

      {/* Immagini in Attesa di Approvazione */}
      {pendingImages.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              In Attesa di Approvazione ({selectedImages.size}/
              {pendingImages.length})
            </h3>
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                Annulla
              </Button>
              <Button
                onClick={handleApprove}
                variant="primary"
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={selectedImages.size === 0}
              >
                ✓ Approva Selezionate ({selectedImages.size})
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingImages.map((image) => (
              <Card key={image.id} className="relative overflow-hidden group">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(
                        "❌ Errore caricamento immagine:",
                        image.name,
                        image.url
                      );
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                    onLoad={() => {
                      console.log("✅ Immagine caricata:", image.name);
                    }}
                  />

                  {/* Loading indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <svg
                      className="animate-spin w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>

                  {/* Overlay con X */}
                  <div
                    className={`absolute inset-0 transition-all ${
                      selectedImages.has(image.id)
                        ? "bg-green-500/20"
                        : "bg-red-500/40"
                    }`}
                  >
                    <button
                      onClick={() => toggleImageSelection(image.id)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        selectedImages.has(image.id)
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {selectedImages.has(image.id) ? "✓" : "✕"}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-sm font-medium text-gray-900 truncate"
                    title={image.name}
                  >
                    {image.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(image.createdTime).toLocaleDateString("it-IT")}
                  </p>
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mt-1"
                  >
                    Testa link →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Immagini Approvate */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Immagini Approvate ({approvedImages.length})
        </h3>

        {approvedImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedImages.map((url, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={url}
                    alt={`Hero ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(
                        "❌ Errore caricamento immagine approvata:",
                        url
                      );
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveApproved(url)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Immagine {index + 1}
                    </p>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Attiva
                    </span>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mt-1"
                  >
                    Vedi immagine →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-600 font-medium mb-2">
              Nessuna immagine approvata
            </p>
            <p className="text-gray-500 text-sm">
              Carica e approva immagini da Google Drive
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
