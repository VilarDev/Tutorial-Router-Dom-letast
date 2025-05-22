// src/routes/Contact/contact.tsx

import { Form, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import "./contact.css"; // <--- CORREÇÃO: Importa o CSS CORRETO para este componente!

// IMPORTA A FUNÇÃO getContact E A INTERFACE Contact DO SEU ARQUIVO DE DADOS
import { getContact, type Contact } from "../../Data/contactsData";

// Este loader é executado ANTES que o componente Contact seja renderizado
export async function loader({ params }: LoaderFunctionArgs) {
  // Afirmamos que params.contactId é uma string
  const contactId = params.contactId as string;
  const contact = await getContact(contactId);

  // Tratamento para caso o contato não seja encontrado
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
}

export default function Contact() {
  // Usa useLoaderData para obter os dados do loader
  const { contact } = useLoaderData() as { contact: Contact };

  return (
    // ATENÇÃO: Este componente renderiza APENAS os detalhes de UM contato
    // Não há sidebar ou lista de contatos aqui!
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

// Componente Favorite (melhor com tipagem)
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