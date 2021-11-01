const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../utils");

const reVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  const user = await User.findOne({ email });
  const { verify, verifyToken } = user;

  if (verify) {
    throw new BadRequest("Verification has already been passed");
  } else {
    const data = {
      to: email,
      subject: "Подтверждение регистрации",
      html: `<a href="http://localhost:3000/api/auth/users/verify/${verifyToken}" target="_blank">Подтвердить почту</a>`,
    };

    await sendEmail(data);
  }
};

module.exports = reVerification;
