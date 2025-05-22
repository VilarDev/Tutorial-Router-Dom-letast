// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importa o componente Root, seu loader e sua action
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root/root.tsx";

import ErrorPage from "./Error-peges/error-page.tsx";

// IMPORTANTE: Importa o componente Contact E o loader que você exportou de contact.tsx
import Contact, { loader as contactLoader } from "./routes/Contact/contact.tsx";

// CORREÇÃO: Importa o componente EditContact E a action dele, com a extensão .tsx
import EditContact, { action as editAction } from "./routes/Edit/edit.tsx"; // <-- Linha corrigida!

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      // CORREÇÃO: A rota de edição deve ser um FILHO da rota Root,
      // para que EditContact seja renderizado no <Outlet /> do Root.
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader, // Reutiliza o contactLoader
        action: editAction, // <-- Adiciona a action aqui!
      },
    ],
  },
  // REMOVIDO: A rota de edição não deve ser de nível superior aqui.
  // {
  //   path: "contacts/:contactId/edit",
  //   element: <EditContact />,
  //   loader: contactLoader,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);