import React from 'react'; // É uma boa prática importar React, mesmo que não seja usado diretamente no JSX em algumas versões
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importa os componentes de rota
import Root from "./routes/root.tsx";
import ErrorPage from "./Error-peges/error-page.tsx";
import Contact from "./routes/Contact/contact.tsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />, // <-- Agora o componente Contact estará disponível
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);