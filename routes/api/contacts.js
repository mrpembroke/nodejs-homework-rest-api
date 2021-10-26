const express = require("express");
const router = express.Router();

const { joiSchema, updateFavoriteJoiSchema } = require("../../models/contact");
const { ctrlWrapper, validation, authenticate } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getContactsList));

router.get("/byUser", authenticate, ctrlWrapper(ctrl.getContactsListByUser));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
