const express = require("express");
const router = express.Router();

const contactsOperations = require("../../model/contacts");
const { contactSchema } = require("../../schemas");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getContactsList();

    res.json({
      status: "Succes",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = parseInt(contactId);
    const result = await contactsOperations.getContactById(id);

    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error; /* Проброс в error catch */
    }

    res.json({
      status: "Succes",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error); /* Проброс error в обработчик ошибок 4арга */
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      const err = new Error(`Sorry, ${error.message}`);
      err.status = 400;
      throw err; /* Проброс в error catch */
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeById(contactId);

    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error; /* Проброс в error catch */
    }

    res.json({
      status: "succes",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      const err = new Error(`Sorry, ${error.message}`);
      err.status = 400;
      throw err; /* Проброс в error catch */
    }

    console.log(req.params);
    console.log(req.body);

    const { contactId } = req.params;
    const result = await contactsOperations.updateById(contactId, req.body);

    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error; /* Проброс в error catch */
    }

    res.json({
      status: "Succes",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
