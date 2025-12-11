import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Ministeri", path: "/ministeri" },
  { label: "Eventi", path: "/eventi" },
  { label: "Media", path: "/media" },
  { label: "Chi Siamo", path: "/chi-siamo" },
  { label: "Contatti", path: "/contatti" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determina se siamo sulla home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo e nome */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              <img
                src="/Cce-Emmanuele/logo.png"
                alt="Chiesa Emmanuele Logo"
                className={`rounded-full object-cover shadow-md group-hover:scale-110 transition-all duration-300 ${
                  isScrolled ? "h-12 w-12" : "h-14 w-14"
                }`}
              />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[#D48A28] font-bold text-2xl tracking-wide">
                Centro
              </span>
              <span className="text-primary-700 font-bold text-2xl -mt-1 tracking-wide">
                Emmanuele
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-gold-50 text-[#D48A28]"
                    : isScrolled
                    ? "text-gray-700 hover:text-[#D48A28] hover:bg-gray-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2.5 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-600 hover:bg-gray-50"
                : "text-white hover:bg-white/10"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Admin link nascosto (tieni premuto logo per 3 secondi) */}
          <div
            onDoubleClick={() => navigate("/admin/login")}
            className="hidden lg:block w-2 h-2 opacity-0 hover:opacity-10 cursor-pointer"
            title="Double click per admin"
          />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 py-3 border-t animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === item.path
                    ? "bg-gold-50 text-[#D48A28] font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
