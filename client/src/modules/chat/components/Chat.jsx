import React, { useState } from "react";
import { TypingIndicatorProvider } from "./TypingIndicatorContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "./Chat.module.css";
import ChatSidebar from "./ChatSideBar";

const Chat = ({ userId }) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const conversations = [
    {
      id: 1,
      contactName: "Alice",
      lastMessage: "Hey! How are you? I was wondering if you wanted to see me soon.",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          content: "Hey! How are you? I was wondering if you wanted to see me soon.",
          author: "Alice",
          timestamp: "2023-08-26 10:39 PM",
          // parentMessage: {
          //   id: 1,
          //   content: "Hi there!",
          //   author: "Bob",
          //   timestamp: "2023-08-27 11:30 AM",
          // }
        },
      ],
    },
    {
      id: 2,
      contactName: "Bob",
      lastMessage: "Sure thing!",
      unreadCount: 0,
      messages: [
        {
          id: 1,
          content: "Sure thing!",
          author: "Bob",
          timestamp: "2023-08-27 11:30 AM",
        },
      ],
    },
  ];
  
  const activeConversationData = conversations.find(
    (conversation) => conversation.id === activeConversation
  );

  const onSendMessage = (message) => {
    console.log("Enviando mensaje:", message);
  };

  return (
    <TypingIndicatorProvider>
      <div className={styles.chat_container}>
        <ChatSidebar
          conversations={conversations}
          setActiveConversation={setActiveConversation}
          handleSearch={handleSearch}
        />
        <div className={styles.chat_content}>
          {activeConversationData ? (
            <>
              <ChatHeader
                chatTitle={activeConversationData.contactName}
                participants={[activeConversationData.contactName]}
              />
              <MessageList messages={activeConversationData.messages} />
              <MessageInput userId={userId} onSendMessage={onSendMessage} />
            </>
          ) : (
            <div className={styles.empty_chat}>
              Elige un contacto para comenzar una conversación.
            </div>
          )}
        </div>
      </div>
    </TypingIndicatorProvider>
  );
};

export default Chat;
