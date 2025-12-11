import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Usa BrowserRouter con una configurazione corretta per GitHub Pages
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Cce-Emmanuele">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
