// src/routes/Root/root.tsx

import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect, // <--- ADICIONE 'redirect' AQUI
} from "react-router-dom";

// IMPORTA AS FUNÇÕES DE DADOS DO SEU ARQUIVO SEPARADO
import { getContacts, createContact, type Contact } from "../../Data/contactsData";
import "./root.css"; // Certifique-se que esta é a linha correta para o CSS do Root

// Loader para a rota raiz: busca todos os contatos
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// Action para a rota raiz: cria um novo contato
export async function action() {
  const contact = await createContact();
  // <--- MUDANÇA AQUI: REDIRECIONA PARA A PÁGINA DE EDIÇÃO DO NOVO CONTATO
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts } = useLoaderData() as { contacts: Contact[] };

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}