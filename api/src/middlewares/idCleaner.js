// Middleware que limpia el id de las cadenas 
// "chat" y "group" usadas en el front.
const idCleaner = (req, res, next) => {
  const { chatId, groupId } = req.params;

  if (chatId && chatId.includes("chat")) {
    const num = chatId.match(/\d+/);
    const chatIdNumber = num[0];
    req.params.chatId = chatIdNumber;
  }

  if (groupId && groupId.includes("group")) {
    const num = groupId.match(/\d+/);
    const groupIdNumber = num[0];
    req.params.groupId = groupIdNumber;
  }

  next();
};

module.exports = idCleaner;
