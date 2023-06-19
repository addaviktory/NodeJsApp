const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  try {
    const contactsData = fs.readFileSync(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch (error) {
    console.error('Помилка при отриманні контактів:', error);
    return [];
  }
}

function getContactById(contactId) {
  const contacts = listContacts();
  return contacts.find(contact => contact.id === contactId);
}

function removeContact(contactId) {
    const contacts = listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    saveContacts(updatedContacts);
    return updatedContacts;
  }

  function addContact(name, email, phone) {
    const contacts = listContacts();
    const newContact = { id: generateId(), name, email, phone };
    contacts.push(newContact);
    saveContacts(contacts);
    return newContact;
  }

function saveContacts(contacts) {
  try {
    const contactsData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(contactsPath, contactsData);
    console.log('Контакти успішно збережено.');
  } catch (error) {
    console.error('Помилка при збереженні контактів:', error);
  }
}

function generateId() {
  return Date.now().toString();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  saveContacts
};