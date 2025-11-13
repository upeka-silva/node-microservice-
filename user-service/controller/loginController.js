const User = require("../model/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = "upeka1231@4545";
const JWT_EXPIRATION = "1h";
const JWT_REFRESH_EXPIRATION = "7d";

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("username or password is empty");
  }
  let firstName = username;

  try {
    const selectedUser = await User.findOne({ firstName }); // usename should be first name for this project

    if (!selectedUser) {
      res.status(401).send("invalid user credentials");
    }
    const paswordChecker = await bycrypt.compare(
      password,
      selectedUser.password
    );

    if (!paswordChecker) {
      res.send("password is not correct");
    }

    console.log({ SECRET_KEY });

    const token = jwt.sign({ id: selectedUser._id }, SECRET_KEY, {
      expiresIn: JWT_EXPIRATION,
    });

    res.send({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = { handleLogin };
