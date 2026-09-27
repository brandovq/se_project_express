const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      // Always log errors to the console. Also, always return a response to the client with an appropriate status code and message (see below)
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        // If the document is not found, the code below will return a 404 status with an appropriate message
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }

      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server.",
      });
    });
};

module.exports = { getUsers, createUser, getUser };
