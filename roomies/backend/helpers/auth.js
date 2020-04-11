const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for Unauthorized
  if (!token) res.status(401).json({ error: "Authorization denied" });

  try {
    // verify token and get user id from it
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.userID = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token not vaild" });
  }
}

module.exports = auth;
