// src/main.tsx

import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importa o componente Root, seu loader e sua action
import Root, { loader as rootLoader, action as rootAction } from "./routes/Root/root.tsx";

import ErrorPage from "./Error-peges/error-page.tsx";

// IMPORTANTE: Importa o componente Contact E o loader que você exportou de contact.tsx
import Contact, { loader as contactLoader } from "./routes/Contact/contact.tsx"; // <-- Linha corrigida/completa

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
        loader: contactLoader, // <-- Associa o loader do Contact aqui!
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);