// src/routes/Root/root.tsx
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
} from "react-router-dom";

import "./root.css"; 

// IMPORTANTE: Corrija o caminho para o seu arquivo de dados e importe a interface Contact
import { getContacts, createContact, type Contact } from "../../Data/contactsData"; // <-- Adicione 'type Contact' aqui

export async function action() {
  const contact = await createContact();
  return { contact };
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
  // Use useLoaderData para acessar os dados retornados pelo loader
  // Tipagem correta: use { contacts: Contact[] }
  const { contacts } = useLoaderData() as { contacts: Contact[] };

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
              {contacts.map((contact: Contact) => ( // <-- Tipagem correta para 'contact' aqui
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