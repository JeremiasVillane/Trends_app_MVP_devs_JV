import React, { createContext, useContext, useState } from "react";

const TypingIndicatorContext = createContext();

export const useTypingIndicatorContext = () =>
  useContext(TypingIndicatorContext);

export const TypingIndicatorProvider = ({ children }) => {
  const [typingUsers, setTypingUsers] = useState([]);

  const startTyping = (userId) => {
    if (!typingUsers.includes(userId)) {
      setTypingUsers([...typingUsers, userId]);
    }
  };

  const stopTyping = (userId) => {
    setTypingUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
  };

  const isTyping = (userId) => {
    return typingUsers.includes(userId);
  };

  return (
    <TypingIndicatorContext.Provider
      value={{
        typingUsers,
        startTyping,
        stopTyping,
        isTyping,
      }}
    >
      {children}
    </TypingIndicatorContext.Provider>
  );
};
