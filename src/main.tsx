import React from 'react'; // É uma boa prática importar React, mesmo que não seja usado diretamente no JSX em algumas versões
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Importa os componentes de rota
import Root from "./routes/Root/root.tsx";
import ErrorPage from "./Error-peges/error-page.tsx";
import Contact from "./routes/Contact/contact.tsx"; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    
    children: [ // <-- Esta é a propriedade 'children' da rota pai (Root)
      {
        path: "contacts/:contactId", // <-- Este caminho é relativo ao pai ("/")
        element: <Contact />,
      },
      // Para outras rotas filhas do Root, se houver
    ],
  },
  // Para rotas que não são filhas da raiz, elas viriam aqui (fora do 'children' do Root)
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);