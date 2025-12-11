import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    setError("");

    // Debug: mostra cosa sta confrontando
    console.log("Username inserito:", username);
    console.log("Password inserita:", password);
    console.log("Username corretto:", "admin");
    console.log("Password corretta:", "CceEmmanuele");

    // Timeout per simulare il controllo
    setTimeout(() => {
      if (username.trim() === "admin" && password === "CceEmmanuele") {
        console.log("✅ Login riuscito!");
        localStorage.setItem("adminAuth", "true");

        // Usa replace invece di navigate per forzare il redirect
        window.location.href = "/Cce-Emmanuele/admin";
      } else {
        console.log("❌ Credenziali errate");
        setError("Username o password non validi");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/Cce-Emmanuele/logo.png"
            alt="Logo"
            className="h-16 w-16 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Accedi al pannello amministrativo
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Username"
            value={username}
            onChange={(value) => {
              setUsername(value);
              setError("");
            }}
            placeholder="admin"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setError("");
            }}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Accesso in corso..." : "Accedi"}
          </Button>

          {/* Info credenziali (rimuovi in produzione) */}
          <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 border border-blue-200">
            <p className="font-semibold mb-1">ℹ️ Credenziali di test:</p>
            <p>
              Username:{" "}
              <code className="bg-white px-2 py-0.5 rounded">admin</code>
            </p>
            <p>
              Password:{" "}
              <code className="bg-white px-2 py-0.5 rounded">CceEmmanuele</code>
            </p>
            <p className="text-blue-600 mt-1">
              ⚠️ Attenzione: la password è case-sensitive
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
