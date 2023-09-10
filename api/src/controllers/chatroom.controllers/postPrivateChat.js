const { Chat } = require("../../db");
const { getUserById } = require("../search.controllers");

module.exports = async (contactId, userId, userType) => {
  const foundContact = await getUserById(contactId);

  if (!foundContact) {
    return { error: "Contact not found" };
  }

  const senderType = userType;
  const receiverType = foundContact.type;

  let senderIdType;
  let receiverIdType;

  if (senderType === "company") {
    senderIdType = "company1_id";
  } else {
    senderIdType = "user1_id";
  }

  if (receiverType === "company") {
    receiverIdType = "company2_id";
  } else {
    receiverIdType = "user2_id";
  }

  const chat = await Chat.findOrCreate({
    where: { [senderIdType]: userId, [receiverIdType]: contactId },
  });

  return chat[0];
};
