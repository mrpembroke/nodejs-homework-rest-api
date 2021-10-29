const { User } = require("../../models");
const { Conflict } = require("http-errors");
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

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.avatarURL = gravatar.url({ email }, { s: "200" });
  await newUser.save();

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
