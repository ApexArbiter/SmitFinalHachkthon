const jwt = require("jsonwebtoken");

async function userDetailsController(req, res) {
  try {
    console.log("body", req.body);

    const { token } = req.body;

    if (!token) {
      return res.json({ msg: "Missing parameter", error: true });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded._id;

    res.status(200).json({
      userId,
      error: false,
      message: "User details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
    });
  }
}

module.exports = userDetailsController;
