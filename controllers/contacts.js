const { NotFound } = require("http-errors");
const { sendSuccessRes } = require("../utils");
const { Contact } = require("../models");

const getContactsList = async (req, res) => {
  const result = await Contact.find({}, "_id name email favorite owner");
  sendSuccessRes(res, { result });
};

const getContactsListByUser = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find(
    { owner: _id },
    "_id name email favorite owner"
  );
  sendSuccessRes(res, { result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "_id name email favorite");

  if (!result) {
    throw new NotFound(`Not found`); /* Проброс в error catch */
  }

  sendSuccessRes(res, { result });
};

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  sendSuccessRes(res, { result }, 201);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new NotFound(`Not found`); /* Проброс в error catch */
  }

  sendSuccessRes(res, { message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`Not found`); /* Проброс в error catch */
  }

  sendSuccessRes(res, { result });
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw new NotFound(`Not found`); /* Проброс в error catch */
  }

  sendSuccessRes(res, { result });
};

module.exports = {
  getContactsList,
  getContactsListByUser,
  getContactById,
  addContact,
  removeById,
  updateById,
  updateFavorite,
};
