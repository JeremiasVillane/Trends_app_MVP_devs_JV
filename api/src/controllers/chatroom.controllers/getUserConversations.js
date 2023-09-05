const noReadCounter = require("../../helpers/noReadCounter");
const getContactData = require("../../helpers/getContactData");
const chatListFilter = require("../../helpers/chatListFilter");
const getAllGroups = require("./getAllGroups");
const getChatsByUser = require("./getChatsByUser");

module.exports = async (
  id,
  userId,
  userType,
  username,
  name,
  profile_image,
  status,
  query_name
) => {
  let conversations = [];

  const userGroups = await getAllGroups(userId, userType);
  const userChats = await getChatsByUser(id, userId, userType);

  if ((!userGroups || userGroups.error) && (!userChats || userChats.error)) {
    return [];
    // return { error: "No conversations found" };
  }

  if (userGroups && !userGroups.error) {
    for (const group of userGroups) {
      const [last_message] = [...group.messages].reverse();
      const countNoRead = noReadCounter(userId, group.messages);
      
      const conversation = {
        isGroup: true,
        id: `group${group.id}`,
        ownerId: group.ownerId,
        name: group.name,
        image: group?.image || null,
        lastMessage: { id: last_message?.messageId, content: last_message?.content },
        lastMessageDate: last_message?.createdAt,
        unreadCount: countNoRead,
        messages: group.messages,
        members: group.users,
      };

      conversations.push(conversation);
    }
  }

  if (userChats && !userChats.error) {
    for (const chat of userChats) {
      const [last_message] = [...chat.messages].reverse();
      const countNoRead = noReadCounter(userId, chat.messages);
      const contactName = getContactData(name, "name", chat);
      const contactUsername = getContactData(username, "username", chat);
      const contactProfileImage = getContactData(profile_image, "profile_image", chat);
      const contactStatus = getContactData(status, "status", chat);
      const contactId = getContactData(id, "id", chat);
      
      const conversation = {
        isGroup: false,
        id: `chat${chat.chat_id}`,
        userId: contactId,
        name: contactName,
        username: contactUsername,
        image: contactProfileImage,
        status: contactStatus,
        lastMessage: chat.messages.length
          ? { id: last_message?.messageId, content: last_message?.content }
          : "",
        lastMessageDate: last_message?.createdAt,
        unreadCount: countNoRead,
        messages: chat.messages,
      };

      conversations.push(conversation);
    }
  }
  const orderedConversations = conversations.sort(
    (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
  );

  if (query_name) {
    const filteredChats = chatListFilter(orderedConversations, query_name);

    return filteredChats;
  }

  return orderedConversations;
};
