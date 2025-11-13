const User = require("../model/User");

const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  let userData = req.body;
  if (userData == null) {
    res.status(400).send("UserData is empty");
  }
  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  userData.password = hashedPassword;

  try {
    const createdUser = new User(userData);
    await createdUser.save();
    res.status(201).send(createdUser);
  } catch (err) {
    console.log({ err });
    res.status(500).send("Internal server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).send(usersList);
  } catch (error) {
    res.send(500).send("internal server error !");
  }
};

const deleteUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log({ error });
    res.status(500).send("Internal server error");
  }
};

module.exports = { createUser, getAllUsers, deleteUserById };
