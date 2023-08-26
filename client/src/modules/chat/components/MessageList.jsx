import React from "react";
import Message from "./Message";
import styles from "./MessageList.module.css";
import { useTypingIndicatorContext } from "./TypingIndicatorContext";

const MessageList = ({ messages }) => {
  const { typingUsers } = useTypingIndicatorContext();

  return (
    <div className={styles.message_list}>
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          author={message.author}
          timestamp={message.timestamp}
        />
      ))}
      {typingUsers.length > 0 && (
        <div className={styles.typing_indicator}>
          {typingUsers.length === 1
            ? `${typingUsers[0]} está escribiendo...`
            : `${typingUsers.join(", ")} están escribiendo...`}
        </div>
      )}
    </div>
  );
};

export default MessageList;

// <MessageList messages={messageData} />
