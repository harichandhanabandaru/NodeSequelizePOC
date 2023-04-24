const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/users", userController.getUsersApi);
router.get("/usersUi", userController.getUsersUi);

router.get("/userById/:id", userController.getUserById);

router.post("/add-user", userController.addUser);
router.put("/update-user/:id", userController.updateUser);

router.delete("/delete-user/:id", userController.deleteUser);

module.exports = router;
