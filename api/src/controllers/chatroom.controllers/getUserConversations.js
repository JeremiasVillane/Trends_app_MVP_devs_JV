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
  query_name
) => {
  let conversations = [];

  const userGroups = await getAllGroups(userId, userType);
  const userChats = await getChatsByUser(id, userId, userType);

  if ((!userGroups || userGroups.error) && (!userChats || userChats.error)) {
    return { error: "No conversations found" };
  }

  if (userGroups && !userGroups.error) {
    for (const group of userGroups) {
      const [last_message] = [...group.messages].reverse();
      const countNoRead = noReadCounter(group.messages);

      const conversation = {
        isGroup: true,
        id: group.id,
        name: group.name,
        image: group?.image || null,
        last_message: last_message?.content,
        last_message_date: last_message?.createdAt,
        no_read_counter: countNoRead,
      };

      conversations.push(conversation);
    }
  }

  if (userChats && !userChats.error) {
    for (const chat of userChats) {
        const [last_message] = [...chat.messages].reverse();
        const countNoRead = noReadCounter(chat.messages);
        const contactName = getContactData(name, "name", chat);
        const contactUsername = getContactData(username, "username", chat);
        const contactProfileImage = getContactData(profile_image, "profile_image", chat);
        
        const conversation = {
          isGroup: false,
          id: chat.chat_id,
          name: contactName,
          username: contactUsername,
          image: contactProfileImage,
          last_message: chat.messages.length ? last_message.content : "",
          last_message_date: last_message?.createdAt,
          no_read_counter: countNoRead,
        };

        conversations.push(conversation);
      }
  }
  const orderedConversations = conversations.sort(
    (a, b) => new Date(b.last_message_date) - new Date(a.last_message_date)
  );

  if (query_name) {
    const filteredChats = chatListFilter(orderedConversations, query_name);

    return filteredChats;
  }

  return orderedConversations;
};
