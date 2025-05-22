// src/routes/Root/root.tsx

import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
  // useLocation, // <--- useLocation não é estritamente necessário aqui se defaultValue for suficiente
} from "react-router-dom";

// IMPORTA AS FUNÇÕES DE DADOS DO SEU ARQUIVO SEPARADO
import { getContacts, createContact, type Contact } from "../../Data/contactsData";
import "./root.css";

// Loader para a rota raiz: busca todos os contatos
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q"); // Obtém o valor do parâmetro 'q' (termo de busca)
  const contacts = await getContacts(q || undefined); // Passa 'q' para getContacts
  return { contacts, q }; // Retorna 'q' também, para pré-preencher o campo de busca
}

// Action para a rota raiz: cria um novo contato
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData() as { contacts: Contact[]; q: string | null };
  const navigation = useNavigation();
  const submit = useSubmit();

  // Flag para indicar que a navegação atual é devido à busca (evita fadeout do detail)
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  // REMOVIDO: O useEffect que manipulava o DOM diretamente para definir o valor do input.
  // O defaultValue no input já é suficiente.
  /*
  React.useEffect(() => {
    const searchInput = document.getElementById("q") as HTMLInputElement;
    if (searchInput) {
      searchInput.value = q || "";
    }
  }, [q]);
  */

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* Formulário de Busca */}
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q || ""} // Usa o 'q' do loader para pré-preencher
              onChange={(event) => {
                const isFirstSearch = q === null; // Verifica se é a primeira busca
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch, // Substitui a entrada no histórico para não poluir
                });
              }}
              // Adiciona uma classe de 'loading' ao input enquanto a busca está ativa
              className={searching ? "loading" : ""}
            />
            {/* Spinner de Busca (escondido por padrão, mostrado quando 'searching' é true) */}
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* Formulário para criar novo contato */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
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
      <div
        id="detail"
        // A classe 'loading' só é aplicada ao 'detail' se a navegação não for uma busca
        className={
          navigation.state === "loading" && !searching ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}