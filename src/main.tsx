// main.tsx (ou index.tsx)
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css"; // Estilos globais

// Importa o componente Root que será o layout principal
import Root from "./routes/root.tsx";
import ErrorPage from "./Error-peges/error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // <-- A rota raiz renderiza o componente Root
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);