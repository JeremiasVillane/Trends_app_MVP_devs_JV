const getContactData = (data, prop, chat) => {
  let typeReceived;
  let typeSent;

  chat.UserReceived
    ? (typeReceived = "UserReceived")
    : (typeReceived = "CompanyReceived");
  chat.UserSent 
    ? (typeSent = "UserSent") 
    : (typeSent = "CompanySent");

  const datas = [chat[typeReceived][prop], chat[typeSent][prop]];
  const output = datas.filter((ele) => ele !== data);

  if (!output.length) {
    return datas[0];
  }

  return output[0];
};

module.exports = getContactData;
