const deleteGroup = require("./deleteGroup");
const deleteGroupMessage = require("./deleteGroupMessage");
const deleteMessage = require("./deleteMessage");
const deletePrivateChat = require("./deletePrivateChat");
const deleteUserFromGroup = require("./deleteUserFromGroup");
const getAllGroupMessages = require("./getAllGroupMessages");
const getAllGroups = require("./getAllGroups");
const getChatsByUser = require("./getChatsByUser");
const getMessagesByChat = require("./getMessagesByChat");
const getUserConversations = require("./getUserConversations");
const patchUserRole = require("./patchUserRole");
const postGroup = require("./postGroup");
const postGroupMessage = require("./postGroupMessage");
const postMessage = require("./postMessage");
const postPrivateChat = require("./postPrivateChat");
const postPrivateMessage = require("./postPrivateMessage");
const postUserInGroup = require("./postUserInGroup");
const putGroup = require("./putGroup");
const putGroupMessage = require("./putGroupMessage");
const putMessage = require("./putMessage");

module.exports = {
  postPrivateChat,
  postPrivateMessage,
  deletePrivateChat,
  postMessage,
  putMessage,
  deleteMessage,
  getChatsByUser,
  getMessagesByChat,
  postGroup,
  putGroup,
  deleteGroup,
  getAllGroups,
  postUserInGroup,
  patchUserRole,
  deleteUserFromGroup,
  postGroupMessage,
  getAllGroupMessages,
  deleteGroupMessage,
  putGroupMessage,
  getUserConversations,
};
