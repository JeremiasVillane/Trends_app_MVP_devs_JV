const noReadCounter = (messages) => {
  let counter = 0;

  messages.map((msg) => (counter += msg.messageStatus === "sent"));

  return counter;
};

module.exports = noReadCounter;
