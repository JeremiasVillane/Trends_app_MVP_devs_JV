import React, { useEffect, useRef } from "react";
import { Message } from ".";
import styles from "./MessageList.module.css";

export const MessageList = ({ socket, messages }) => {
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
          socket={socket}
          author={message.username}
          authorName={message.name}
          authorId={message.userId}
          avatar={message.profile_image}
          userStatus={message.user_status}
          messageId={message.messageId}
          timestamp={message.createdAt}
          content={message.content}
          messageStatus={message.messageStatus}
          parentMessage={message.parentMessage}
        />
      ))}
    </div>
  );
};
