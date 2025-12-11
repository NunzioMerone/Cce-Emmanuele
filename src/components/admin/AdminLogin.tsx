import React, { useState } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login({ username, password });

    if (!success) {
      setError("Credenziali non valide. Riprova.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 animate-scale-in">
        <div className="text-center mb-8">
          <img
            src="/logo.svg"
            alt="Chiesa Emmanuele"
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Accedi al pannello di amministrazione</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            value={username}
            onChange={setUsername}
            placeholder="admin"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Accedi
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>Credenziali demo:</p>
            <p className="font-mono">
              Username: <strong>admin</strong>
            </p>
            <p className="font-mono">
              Password: <strong>emmanuele2024</strong>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};
