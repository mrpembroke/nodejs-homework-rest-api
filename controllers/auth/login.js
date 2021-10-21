const { User } = require("../../models");

const { NotFound, BadRequest } = require("http-errors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password");

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest("Invalid email or password");
  }

  // if (!user) {
  //   throw new NotFound(`${email} not found`);

  //   res.status(404).json({
  //     status: "error",
  //     code: 404,
  //     message: "",
  //   });
  //   return
  // }

  // if (!user.comparePassword(password)) {
  //   throw new BadRequest("Invalid password");
  // }

  const { _id } = user;
  const token = user.createToken();
  await User.findByIdAndUpdate(_id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
