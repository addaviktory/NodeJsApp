
const argv = require("yargs").argv;
const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

const contacts = require('./contacts');
const allContacts = contacts.listContacts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      console.log(allContacts, 'Контакти виведені на екран.');
      break;

    case "get":
      console.log(getContactById(id), 'Контакт отримано')
      break;

    case "add":
    console.log(addContact(name, email, phone), 'Контакт успішно додано')
      break;

      case "remove":
        const contactToRemove = getContactById(id);
        if (contactToRemove) {
          console.log(contactToRemove, 'Контакт успішно видалено:');
        } else {
          console.log('Контакт з вказаним ID не знайдено');
        }
        break;

    default:
    console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);