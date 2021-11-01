const { User } = require("../../models");
const { NotFound } = require("http-errors");

const { sendEmail } = require("../../utils");

const verification = async (req, res) => {
  const { verifyToken } = req.params;
  console.log(req.params);
  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound("Verify error");
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.json({
    status: "Success",
    code: "200",
    message: "Email verify success",
  });
};

module.exports = verification;
