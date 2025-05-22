// src/contacts.ts (ou src/data.ts)

// Usamos um array simples em memória para simular um "banco de dados"
interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

// Alguns contatos de exemplo para começar
const contacts: Contact[] = [
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
  // Simula um atraso de rede
  await new Promise(r => setTimeout(r, 500));
  return [...contacts]; // Retorna uma cópia para evitar mutações diretas
}

// Função para criar um novo contato
export async function createContact(): Promise<Contact> {
  // Simula um atraso de rede
  await new Promise(r => setTimeout(r, 500));
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

// Você adicionará mais funções aqui à medida que avança no tutorial:
// export async function getContact(id: string): Promise<Contact | null> { ... }
// export async function updateContact(id: string, updates: Partial<Contact>): Promise<Contact> { ... }
// export async function deleteContact(id: string): Promise<boolean> { ... }