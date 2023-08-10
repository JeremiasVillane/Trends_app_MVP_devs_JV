const messageFormatter = (messages) => {
  let inputMessages = Array.isArray(messages) ? messages : [messages];

  let outputMessages = [];

  for (const message of inputMessages) {
    const plainMessage = message.toJSON();
    
    const outputMessage = {
      userId: plainMessage.user?.id,
      username: plainMessage.user?.username,
      profile_image: plainMessage.user?.profile_image,
      messageId: plainMessage.message_id,
      createdAt: plainMessage.createdAt,
      content: plainMessage.content,
      messageStatus: plainMessage.messageStatus,
    };
    outputMessages.unshift(outputMessage);
  }

  return outputMessages;
};

module.exports = messageFormatter;
