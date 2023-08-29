import React from "react";
import Message from "./Message";
import styles from "./MessageList.module.css";
import { useTypingIndicatorContext } from "./TypingIndicatorContext";

const MessageList = ({ messages }) => {
  const { typingUsers } = useTypingIndicatorContext();
// console.log("messages: ", messages)
  return (
    <div className={styles.message_list}>
      {messages.map((message, index) => (
        <Message
          key={index}
          author={message.username}
          avatar={message.profile_image}
          messageId={message.messageId}
          timestamp={message.createdAt}
          content={message.content}
          parentMessage={message.parentMessage}
        />
      ))}
      {/* {typingUsers.length > 0 && (
        <div className={styles.typing_indicator}>
          {typingUsers.length === 1
            ? `${typingUsers[0]} está escribiendo...`
            : `${typingUsers.join(", ")} están escribiendo...`}
        </div>
      )} */}
    </div>
  );
};

export default MessageList;

// <MessageList messages={messageData} />
