export const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "green";
    case "offline":
      return "red";
    case "invisible":
      return "transparent";
    default:
      return "transparent";
  }
};

export const getStatusBorderColor = (status, darkMode) => {
  if (["online", "offline"].includes(status)) {
    return darkMode ? "#383836" : "#fff";
  } else return "transparent";
};