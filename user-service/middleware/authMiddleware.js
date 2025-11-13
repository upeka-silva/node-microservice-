const jwt = require("jsonwebtoken");
const SECREAT_KEY = "upeka1231@4545";

const authFilter = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, SECREAT_KEY);
    req.userId = decoded.userId;
    next(); // continue the next (process the new middleware )
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authFilter };
