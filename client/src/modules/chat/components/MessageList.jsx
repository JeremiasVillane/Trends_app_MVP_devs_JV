import React, { useEffect, useRef } from "react";
import Message from "./Message";
import styles from "./MessageList.module.css";

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messageListRef} className={styles.message_list}>
      {messages?.map((message, index) => (
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
    </div>
  );
};

export default MessageList;
