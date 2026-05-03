import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/";
import { ProgressProvider } from "./context/Progress/ProgressProvider";
import { BrowserRouter } from "react-router-dom";

// Alineado con `base` de Vite: en dev es `/`, en build el subpath de GitHub Pages.
const baseTrim = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const routerBasename = baseTrim === "/" ? undefined : baseTrim;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
