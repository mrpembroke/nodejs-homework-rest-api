const { User } = require("../../models");
const { sendSuccessRes } = require("../../utils");

const currentUser = async (req, res) => {
  const { token } = req.user;
  const result = await User.find({ token }, "email subscription ");
  sendSuccessRes(res, { result });
};

module.exports = currentUser;
