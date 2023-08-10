const { Router } = require("express");
const {
  createAdmin,
  getUsers,
  getGroups,
  getMessages,
  getChats,
} = require("../handlers/admin.handlers");
const adminRoutes = Router();

adminRoutes.post("/create", createAdmin);
adminRoutes.get("/users", getUsers);
adminRoutes.get("/users/groups/:userType", getGroups);
adminRoutes.get("/users/chats/:userType", getChats)
adminRoutes.get("/users/messages/:userType", getMessages);

module.exports = adminRoutes;
