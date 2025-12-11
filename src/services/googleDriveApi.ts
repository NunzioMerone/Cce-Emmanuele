const API_KEY = "AIzaSyCk_9mvP7gi9HTJevgxOQpSPnooW-hiAU0";
const HERO_FOLDER_ID = "1TY7weA0yXJVM3APBMJ0DhEy78RrZqRZH"; // Cartella "hero" diretta

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
}

interface DriveFilesResponse {
  files: DriveFile[];
}

export interface HeroImage {
  id: string;
  url: string;
  name: string;
  createdTime: string;
  approved?: boolean;
}

export const googleDriveService = {
  // Ottieni tutte le immagini dalla cartella hero (usando ID diretto)
  async getHeroImages(): Promise<HeroImage[]> {
    try {
      console.log("🔍 Carico immagini dalla cartella hero...");
      console.log("📁 Folder ID:", HERO_FOLDER_ID);

      // Query più permissiva - cerca tutti i file nella cartella
      const query = `'${HERO_FOLDER_ID}' in parents and trashed=false`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        query
      )}&fields=files(id,name,mimeType,createdTime)&orderBy=createdTime desc&key=${API_KEY}`;

      console.log("🌐 URL richiesta:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Errore API:", errorData);
        alert(`Errore API: ${JSON.stringify(errorData)}`);
        return [];
      }

      const data: DriveFilesResponse = await response.json();

      console.log(`📸 Risposta API - Totale file: ${data.files?.length || 0}`);
      console.log("📋 File trovati:", data.files);

      if (!data.files || data.files.length === 0) {
        console.log("⚠️ Nessun file trovato nella cartella");
        alert(
          '⚠️ Nessun file trovato nella cartella Google Drive.\n\nVerifica che:\n1. La cartella contenga file\n2. L\'accesso sia impostato su "Chiunque abbia il link"'
        );
        return [];
      }

      // Filtra solo le immagini
      const imageFiles = data.files.filter(
        (file) =>
          file.mimeType === "image/jpeg" ||
          file.mimeType === "image/jpg" ||
          file.mimeType === "image/png"
      );

      console.log(`🖼️ Immagini valide: ${imageFiles.length}`);

      const heroImages: HeroImage[] = imageFiles.map((file) => {
        // Prova diversi formati URL
        const url = `https://lh3.googleusercontent.com/d/${file.id}`;
        const altUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
        const altUrl2 = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;

        console.log(`✅ ${file.name} (${file.mimeType})`);
        console.log(`   URL principale: ${url}`);
        console.log(`   URL alternativo 1: ${altUrl}`);
        console.log(`   URL alternativo 2: ${altUrl2}`);

        return {
          id: file.id,
          url: altUrl, // Usa questo URL che dovrebbe funzionare meglio
          name: file.name,
          createdTime: file.createdTime,
          approved: false,
        };
      });

      return heroImages;
    } catch (error) {
      console.error("❌ Errore nel caricare le immagini:", error);
      alert(`❌ Errore: ${error}`);
      return [];
    }
  },

  getApprovedImages(): string[] {
    const approved = localStorage.getItem("approvedHeroImages");
    return approved ? JSON.parse(approved) : [];
  },

  saveApprovedImages(imageUrls: string[]): void {
    localStorage.setItem("approvedHeroImages", JSON.stringify(imageUrls));
    localStorage.setItem("approvedHeroImagesTimestamp", Date.now().toString());
  },

  // Carica immagini approvate con cache (30 minuti)
  async getApprovedImagesWithCache(): Promise<string[]> {
    const cached = localStorage.getItem("approvedHeroImages");
    const timestamp = localStorage.getItem("approvedHeroImagesTimestamp");

    // Cache valida per 30 minuti
    const CACHE_DURATION = 30 * 60 * 1000;

    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      if (age < CACHE_DURATION) {
        console.log("✅ Uso immagini approvate dalla cache");
        return JSON.parse(cached);
      }
    }

    return this.getApprovedImages();
  },
};
