const { User } = require("../../models");
const { sendEmail } = require("../../utils");

const { Conflict } = require("http-errors");
const { generate } = require("shortid");
// const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  //   if (user) {
  //     res.status(409).json({
  //       status: "error",
  //       code: 409,
  //       message: "Email in use",
  //     });
  //   }

  const verifyToken = generate();
  const newUser = new User({ email, verifyToken });
  newUser.setPassword(password);
  newUser.avatarURL = gravatar.url({ email }, { s: "200" });
  await newUser.save();

  const data = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/auth/users/verify/${verifyToken}" target="_blank">Подтвердить почту</a>`,
  };

  await sendEmail(data);

  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const newUser = { email, password: hashPassword };
  //   await User.create(newUser);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Created",
  });
};

module.exports = signup;
