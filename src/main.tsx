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

// Importa o componente EditContact E a action dele
import EditContact, { action as editAction } from "./routes/Edit/edit.tsx";

// <--- ADICIONE ESTA IMPORTAÇÃO PARA A ACTION DE DELETAR
import { action as destroyAction } from "./routes/Destroy/destroy.tsx";

import Index from "./routes/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      
      { index: true, element: <Index /> },
      
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader, // Reutiliza o contactLoader
        action: editAction,
      },
      // <--- ADICIONE ESTA NOVA ROTA PARA DELETAR
      {
        path: "contacts/:contactId/destroy", // Esta rota não precisa de um 'element'
        action: destroyAction, // Associa a action de exclusão
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);