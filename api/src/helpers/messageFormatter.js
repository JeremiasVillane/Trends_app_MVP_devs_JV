const decryptMessage = require("./decryptMessage");

const messageFormatter = (messages) => {
  let inputMessages = Array.isArray(messages) ? messages : [messages];

  let outputMessages = [];

  for (const message of inputMessages) {
    const plainMessage = message.toJSON();
    const outputMessage = {
      userId:
        plainMessage.user?.id ||
        plainMessage?.sender_id ||
        plainMessage?.company_sender_id,
      username:
        plainMessage.user?.username ||
        plainMessage.UserSender?.username ||
        plainMessage.CompanySender?.username,
      profile_image:
        plainMessage.user?.profile_image ||
        plainMessage.UserSender?.profile_image ||
        plainMessage.CompanySender?.image,
      messageId: plainMessage.message_id,
      createdAt: plainMessage.createdAt,
      content: decryptMessage(plainMessage.content),
      messageStatus: plainMessage.messageStatus,
    };

    for (const key in outputMessage) {
      if (outputMessage[key] === null || outputMessage[key] === undefined) {
        delete outputMessage[key];
      }
    }

    outputMessages.push(outputMessage);
  }

  outputMessages = outputMessages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return outputMessages;
};

module.exports = messageFormatter;
