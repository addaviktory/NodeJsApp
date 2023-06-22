const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function withErrorHandling(fn) {
  return function (...args) {
    try {
      return fn(...args);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };
}

function listContacts() {
  return withErrorHandling(() => {
    const contactsData = fs.readFileSync(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    return contacts;
  })();
}

function getContactById(contactId) {
  return withErrorHandling(() => {
    const contacts = listContacts();
    return contacts.find(contact => contact.id === contactId);
  })();
}

function removeContact(contactId) {
  return withErrorHandling(() => {
    const contacts = listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    saveContacts(updatedContacts);
    console.log('Контакт успішно видалено');
    return updatedContacts;
  })();
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = { id: generateId(), name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);
  return newContact;
}

function saveContacts(contacts) {
  return withErrorHandling(() => {
    const contactsData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(contactsPath, contactsData);
    console.log('Контакти успішно збережено.');
  })();
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