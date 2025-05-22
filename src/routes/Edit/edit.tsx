// src/routes/Edit/edit.tsx

// Adicione 'redirect' e 'type ActionFunctionArgs' aos imports
import { Form, useLoaderData, redirect, type ActionFunctionArgs } from "react-router-dom";
import { type Contact, updateContact } from "../../Data/contactsData"; // <--- Importe 'updateContact' aqui!
import "./edit.css";

// Este loader já existe, apenas para referência
// export async function loader({ params }: LoaderFunctionArgs) {
//   const contactId = params.contactId as string;
//   const contact = await getContact(contactId);
//   if (!contact) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   return { contact };
// }

export default function EditContact() {
  const { contact } = useLoaderData() as { contact: Contact | null };

  return (
    <Form method="post" id="contact-form"> {/* method="post" é crucial para a action */}
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        {/* Você pode usar um Link aqui ou o window.history.back() */}
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}

// Adicione a função 'action' para lidar com o envio do formulário de edição
export async function action({ request, params }: ActionFunctionArgs) {
  const contactId = params.contactId as string; // Garante que contactId é string
  const formData = await request.formData(); // Obtém os dados do formulário

  // Converte FormData para um objeto JavaScript simples
  // Object.fromEntries(formData) cria um objeto a partir dos pares chave-valor do FormData
  const updates = Object.fromEntries(formData) as Partial<Contact>;

  // Chama a função para atualizar o contato no seu "banco de dados"
  await updateContact(contactId, updates);

  // Após atualizar, redireciona de volta para a página de detalhes do contato
  return redirect(`/contacts/${contactId}`);
}