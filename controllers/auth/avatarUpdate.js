const { User } = require("../../models");
const { sendSuccessRes } = require("../../utils");

const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

// const tempDir = path.join(__dirname, "../../", "temp");
const uploadDir = path.join(__dirname, "../../", "public");

const avatarUpdate = async (req, res) => {
  const { token, avatarURL } = req.user;
  const { originalname, path: tempAvatarPath } = req.file;
  const updateAvatarPath = path.join(uploadDir, "avatars", originalname);

  try {
    await fs.rename(tempAvatarPath, updateAvatarPath);
    const newAvatarURL = path.join("/avatars", originalname);

    await User.findOneAndUpdate(
      { token },
      { avatarURL: newAvatarURL },
      { new: true }
    );
  } catch (error) {
    await fs.unlink(tempAvatarPath);
  }

  await Jimp.read(updateAvatarPath)
    .then((avatar) => {
      return avatar.resize(250, 250);
    })
    .catch((err) => {
      console.error(err);
    });

  sendSuccessRes(res, { avatarURL });
};

module.exports = avatarUpdate;
