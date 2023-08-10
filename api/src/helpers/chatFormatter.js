const messageFormatter = require("./messageFormatter");

const chatFormatter = (chat) => {
  const plainMessages = messageFormatter(chat.messages);

  const plainChat = chat.toJSON();

  plainChat.messages = plainMessages;

  return plainChat;
};

module.exports = chatFormatter;
