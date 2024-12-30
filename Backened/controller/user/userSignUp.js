const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { fullname, email, password } = req.body;
    console.log(req.body);

    if (!fullname) {
      return res.json({ msg: "Please provide full name", error: true });
    }
    if (!email) {
      return res.json({ msg: "Please provide email", error: true });
    }
    if (!password) {
      return res.json({ msg: "Please provide password", error: true });
    }

    if (password.length < 6) {
      return res.json({
        msg: "Password should be at least 6 characters long",
        error: true,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({ msg: "User already exists", error: true });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      return res.json({
        msg: "Something went wrong while verifying password",
        error: true,
      });
    }

    await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      error: false,
      msg: "User created Successfully!",
    });
  } catch (err) {
    res.json({
      msg: err.message || err,
      error: true,
    });
  }
}

module.exports = userSignUpController;
