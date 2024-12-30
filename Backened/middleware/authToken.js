const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
        error: true,
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    req.token = token;

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      console.log("decoded", decoded);

      if (err) {
        return res.status(401).json({
          message: "Invalid token",
          error: true,
        });
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
    });
  }
}

module.exports = authToken;
