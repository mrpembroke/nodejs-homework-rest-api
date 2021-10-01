const getContactsList = require("./getContactsList");
const getContactById = require("./getContactsById");
const addContact = require("./addContact");
const updateContacts = require("./updateContacts");
const removeById = require("./removeById");
const updateById = require("./updateById");

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  updateContacts,
  updateById,
  removeById,
};
