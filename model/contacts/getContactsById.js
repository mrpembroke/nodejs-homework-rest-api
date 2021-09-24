const contacts = require("./contacts.json");

const getContactById = (id) => {
  const contact = contacts.find((item) => item.id === id);

  if (!contact) {
    return null;
  }

  return contact;
};

module.exports = getContactById;
