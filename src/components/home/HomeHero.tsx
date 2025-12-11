import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { googleDriveService } from "../../services/googleDriveApi";

// Immagini locali di fallback
const localHeroImages = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
  "/hero6.jpg",
  "/hero7.jpg",
];

export const HomeHero: React.FC = () => {
  const navigate = useNavigate();
  const [heroImages, setHeroImages] = useState<string[]>(localHeroImages);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    loadHeroImages();
  }, []);

  const loadHeroImages = async () => {
    try {
      const images = await googleDriveService.getApprovedImagesWithCache();

      if (images.length > 0) {
        console.log("✅ Immagini approvate caricate:", images.length);
        setHeroImages(images);
      } else {
        console.log("⚠️ Uso immagini locali");
        setHeroImages(localHeroImages);
      }
    } catch (error) {
      console.error("Errore nel caricare le immagini:", error);
      setHeroImages(localHeroImages);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Cambia ogni 8 secondi

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDuration: "4000ms",
            }}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${1.05 + scrollY * 0.0001})`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>
        ))}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-900/50"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Floating elements decorativi */}
      <div
        className="absolute top-20 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl animate-float"
        style={{
          animationDelay: "2s",
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 z-10">
        <div className="text-center space-y-8">
          {/* Title principale */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 animate-fade-in leading-tight">
              <span className="inline-block hover:scale-110 transition-transform duration-300">
                Dio
              </span>{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
                è con noi
              </span>
            </h1>

            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Chiesa Emmanuele
              </span>
            </h2>
          </div>

          {/* Sottotitolo */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in font-light drop-shadow-lg">
            Una comunità dove la fede incontra la vita,{" "}
            <br className="hidden md:block" />
            l'amore incontra l'azione e tu sei sempre benvenuto
          </p>

          {/* Divider decorativo */}
          <div
            className="flex items-center justify-center gap-4 py-6 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/70"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/50"></div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in pt-4"
            style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          >
            <Button
              onClick={() => navigate("/chi-siamo")}
              variant="secondary"
              size="lg"
              className="group relative overflow-hidden shadow-2xl hover:shadow-white/20 min-w-[200px]"
            >
              <span className="relative z-10 text-lg">Scopri di Più</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </Button>
            <Button
              onClick={() => navigate("/contatti")}
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white backdrop-blur-md shadow-xl min-w-[200px]"
            >
              <span className="text-lg">Contattaci</span>
            </Button>
          </div>

          {/* Info aggiuntiva */}
          <div
            className="pt-12 animate-fade-in"
            style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          >
            <p className="text-white/80 text-lg font-light">
              Domenica 10:30 • Giovedì 18:00 o 20:00
            </p>
          </div>
        </div>
      </div>

      {/* Decorazione bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
