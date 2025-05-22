// src/Data/contactsData.ts

// Interface para tipagem dos contatos
export interface Contact { // Exportamos a interface para poder usá-la em outros arquivos
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

// Alguns contatos de exemplo para começar
const contacts: Contact[] = [ // Usamos 'let' para que o array possa ser modificado
  {
    id: "abc",
    first: "Alice",
    last: "Smith",
    avatar: "https://robohash.org/alice.png?size=200x200",
    twitter: "@alicesmith",
    notes: "Friend from college.",
    favorite: true,
  },
  {
    id: "def",
    first: "Bob",
    last: "Johnson",
    avatar: "https://robohash.org/bob.png?size=200x200",
    twitter: "@bobjohnson",
    notes: "Work colleague.",
    favorite: false,
  },
];

// Função para obter todos os contatos
export async function getContacts(): Promise<Contact[]> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  return [...contacts]; // Retorna uma cópia do array
}

// Função para obter um único contato pelo ID
export async function getContact(id: string): Promise<Contact | null> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  const foundContact = contacts.find(contact => contact.id === id);
  return foundContact || null; // Retorna o contato ou null
}

// Função para criar um novo contato
export async function createContact(): Promise<Contact> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  const id = Math.random().toString(36).substring(2, 9); // Gera um ID simples
  const newContact: Contact = {
    id,
    first: "Novo",
    last: "Contato",
    avatar: `https://robohash.org/${id}.png?size=200x200`,
    twitter: "",
    notes: "",
    favorite: false,
  };
  contacts.unshift(newContact); // Adiciona o novo contato ao início do array
  return newContact;
}

// src/Data/contactsData.ts

// ... (seus imports, interface Contact, array contacts, getContacts, getContact, createContact existentes) ...

// Função para atualizar um contato existente
export async function updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  const contact = contacts.find(contact => contact.id === id);
  if (!contact) {
    throw new Error(`Contact with id "${id}" not found`);
  }
  // Object.assign copia todas as propriedades do objeto 'updates' para o 'contact'
  Object.assign(contact, updates);
  return contact;
}

// Você adicionará mais funções aqui à medida que avança no tutorial (ex: updateContact, deleteContact)
// export async function updateContact(id: string, updates: Partial<Contact>): Promise<Contact> { ... }
// export async function deleteContact(id: string): Promise<boolean> { ... }