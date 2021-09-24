const getContactsList = require("./getContactsList");
const updateContacts = require("./updateContacts");

const removeById = async (id) => {
  const contacts = await getContactsList();
  const idx = contacts.findIndex((item) => item.id === id);

  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((item) => item.id !== id);
  await updateContacts(newContacts);
  return "Success remove";
};

module.exports = removeById;
