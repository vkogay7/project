const express = require("express");
const router = express.Router();
const userService = require('../service/user-service')

const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;