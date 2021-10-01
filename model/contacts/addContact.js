const { v4 } = require("uuid");

const getContactsList = require("./getContactsList");
const updateContacts = require("./updateContacts");

const addContact = async (data) => {
  const contacts = await getContactsList();
  const newContact = { id: v4(), ...data };
  const newContacts = [...contacts, newContact];

  updateContacts(newContacts);
  return newContact;
};

module.exports = addContact;
