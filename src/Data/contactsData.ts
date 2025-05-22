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
let contacts: Contact[] = [ // Usamos 'let' para que o array possa ser modificado
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
// CORREÇÃO: Adicionado o parâmetro 'query' para permitir a busca
export async function getContacts(query?: string): Promise<Contact[]> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  let filteredContacts = [...contacts]; // Começa com uma cópia de todos os contatos

  // Se houver uma query, filtra os contatos
  if (query) {
    filteredContacts = filteredContacts.filter(contact =>
      // Verifica se o termo de busca está no primeiro ou último nome (case-insensitive)
      (contact.first?.toLowerCase().includes(query.toLowerCase())) ||
      (contact.last?.toLowerCase().includes(query.toLowerCase()))
    );
  }
  return filteredContacts; // Retorna os contatos filtrados ou todos
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

// Função para deletar um contato
export async function deleteContact(id: string): Promise<boolean> {
  await new Promise(r => setTimeout(r, 500)); // Simula atraso de rede
  const initialLength = contacts.length;
  // Filtra o array, removendo o contato com o ID fornecido
  contacts = contacts.filter(contact => contact.id !== id);
  // Retorna true se o comprimento do array mudou (ou seja, um contato foi removido)
  return contacts.length !== initialLength;
}