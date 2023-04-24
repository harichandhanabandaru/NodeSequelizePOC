const Users = require("../models/users.js");

exports.getUsersApi = (req, res) => {
  Users.findAll({ include: "posts" })
    .then((users) => {
      console.log(users); // an array of user objects
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.getUsersUi = (req, res) => {
  Users.findAll({ include: "posts" })
    .then((users) => {
      res.render("users/usersList", {
        // res.render("includes/head", {
        users: users,
        pageTitle: "Users",
        path: "usersUi",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};
exports.getUserById = (req, res) => {
  const { id } = req.params;

  Users.findByPk(id, { include: "posts" })
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.addUser = (req, res, next) => {
  const userDetails = req.body;

  //   {
  //     "firstName":"apple12",
  //     "lastName":"102",
  //     "createdAt":"2023-12-12 06:42:02",
  //     "updatedAt":"2023-12-12 07:42:02"
  // }

  Users.create({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
  })
    .then((users) => {
      console.log(users); // an array of user objects
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};
exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const userDetails = req.body;

  //   {
  //     "firstName":"apple12",
  //      "lastName":"102",
  //     "createdAt":"2023-12-12 06:42:02",
  //     "updatedAt":"2023-12-12 07:42:02"
  //  }

  Users.update(
    {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => {
      res.status(200).send(`User ${id} updated successfully.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error updating job ${id}: ${err}`);
    });
};
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;

  Users.destroy({ where: { id } })
    .then(() => {
      res.status(200).send(`User ${id} deleted successfully.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error updating job ${id}: ${err}`);
    });
};
