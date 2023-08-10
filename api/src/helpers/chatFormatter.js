const messageFormatter = require("./messageFormatter");

const chatFormatter = (chat) => {
  let inputchat = Array.isArray(chat) ? chat : [chat];
  let plainChats = [];

  inputchat.forEach((chat) => {
    const plainMessages = messageFormatter(chat.messages);
    const plainChat = chat.toJSON();
    plainChat.messages = plainMessages;

    for (const key in plainChat) {
      if (plainChat[key] === null || plainChat[key] === undefined) {
        delete plainChat[key];
      }
    }

    plainChats.push(plainChat);
  });

  return plainChats;
};

module.exports = chatFormatter;
