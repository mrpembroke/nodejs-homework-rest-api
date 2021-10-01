const updateContacts = require("./updateContacts");
const getContactsList = require("./getContactsList");

const updateById = async (id, data) => {
  const contacts = await getContactsList();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  const updateContact = { ...contacts[idx], ...data };
  contacts[idx] = updateContact;
  await updateContacts(contacts);
  return updateContact;
};

module.exports = updateById;
