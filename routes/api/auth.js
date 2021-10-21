const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
const { ctrlWrapper, validation, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
