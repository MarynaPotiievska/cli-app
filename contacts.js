const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const newContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf-8");
  return newContactsList;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(21), name, email, phone };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList), "utf-8");
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
