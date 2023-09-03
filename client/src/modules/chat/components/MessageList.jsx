import React, { useEffect, useRef } from "react";
import Message from "./Message";
import styles from "./MessageList.module.css";

const MessageList = ({ socket, messages }) => {
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
          parentMessage={message.parentMessage}
        />
      ))}
    </div>
  );
};

export default MessageList;
