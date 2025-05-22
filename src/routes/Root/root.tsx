// src/routes/Root/root.tsx

import {
  Outlet,
  NavLink, // <--- Use NavLink aqui!
  useLoaderData,
  Form,
  redirect,
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
  const contact = await await createContact();
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
                  {/* <Link> MUDADO PARA <NavLink> */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    // Adiciona classes baseadas no estado da navegação (ativo/pendente)
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active" // Aplica a classe 'active' se for a rota atual
                        : isPending
                        ? "pending" // Aplica a classe 'pending' se a navegação estiver pendente
                        : "" // Nenhuma classe extra se não for ativo nem pendente
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
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