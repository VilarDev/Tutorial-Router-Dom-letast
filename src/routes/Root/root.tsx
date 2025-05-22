// src/routes/root.tsx

import {
  Outlet,
  Link,
  useLoaderData,
  Form,
} from "react-router-dom";

// IMPORTANTE: Corrija o caminho para o seu arquivo de dados.
// Se seu arquivo de dados estiver em src/contacts.ts:
import { getContacts, createContact } from "../../Data/contacts" // <-- MUITO PROVAVELMENTE É ESTE!
// OU se seu arquivo de dados estiver em src/data.ts:
// import { getContacts, createContact } from "../data";

export async function action() {
  const contact = await createContact();
  return { contact };
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

import "./root.css"

export default function Root() {
  // Use useLoaderData para acessar os dados retornados pelo loader
  const { contacts } = useLoaderData() as { contacts: any[] }; // Adicione tipagem, ou defina uma interface Contact[]

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* O formulário para criar um novo contato que chamará a 'action' */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
          {/* A ordem foi ajustada para o botão "New" vir antes do campo de busca,
              seguindo o layout típico do tutorial. */}
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
        </div>
        <nav>
          {/* Use os dados do loader para renderizar a lista de contatos */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact: any) => ( // Ajuste 'any' para a sua interface de contato
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
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