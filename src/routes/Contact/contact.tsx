// src/routes/Contact/contact.tsx

import { Form, useLoaderData } from "react-router-dom"; // Importa useLoaderData
import "./contact.css";

// IMPORTA A FUNÇÃO getContact DO SEU ARQUIVO DE DADOS (contacts.ts)
// Ajuste o caminho se seu contacts.ts estiver em outro lugar (ex: "../data/contacts")
import { getContact } from "../../Data/contactsData.ts";

// (Opcional, mas recomendado) Definição da interface Contact para tipagem
interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

// *** PASSO 1: DEFINIR E EXPORTAR O LOADER ***
// Esta função é executada ANTES que o componente Contact seja renderizado
export async function loader({ params }: { params: { contactId: string } }) {
  const contact = await getContact(params.contactId);
  // Opcional: Adicionar tratamento para contato não encontrado (melhora a experiência de erro)
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact }; // Retorna o objeto contact
}

export default function Contact() {
  // *** PASSO 2: USAR useLoaderData PARA OBTER OS DADOS ***
  // Agora 'contact' virá do loader, não de um objeto mockado
  const { contact } = useLoaderData() as { contact: Contact };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Seu componente Favorite (melhor com tipagem)
function Favorite({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}