// src/routes/Destroy/destroy.tsx

import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { deleteContact } from "../../Data/contactsData"; // Importa a função deleteContact

// A action para a rota de exclusão
export async function action({ params }: ActionFunctionArgs) {
  // Garante que contactId é uma string
  const contactId = params.contactId as string;

  throw new Error("oh dang!");
  // Chama a função para deletar o contato
  await deleteContact(contactId);

  // Redireciona para a página inicial (lista de contatos) após a exclusão
  // Isso também fará com que o loader da rota Root seja revalidado.
  return redirect("/");
}