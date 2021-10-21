const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    status: "success logout",
    code: 204,
    message: "No Content",
  });
};

module.exports = logout;
