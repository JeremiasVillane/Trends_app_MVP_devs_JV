export const getStatusColor = (status) => {
  switch (status) {
    case "online":
      return "green";
    case "offline":
      return "red";
    case "invisible":
      return "gray";
    default:
      return "transparent";
  }
};

export const getStatusBorderColor = (status, darkMode) => {
  if (["online", "offline", "invisible"].includes(status)) {
    return darkMode ? "#383836" : "#fff";
  }
  return "invisible";
};