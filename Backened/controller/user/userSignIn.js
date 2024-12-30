const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({ msg: "Please provide email", error: true });
    }
    if (!password) {
      return res.json({ msg: "Please provide password", error: true });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ msg: "User not found", error: true });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      res.json({ token });
    } else {
      return res.json({ msg: "Password is not correct", error: true });
    }
  } catch (err) {
    res.json({
      msg: err.message || err,
      error: true,
    });
  }
}

module.exports = userSignInController;
