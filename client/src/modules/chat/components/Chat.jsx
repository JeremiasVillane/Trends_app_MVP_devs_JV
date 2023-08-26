import { useState } from "react";
import styles from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSideBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { TypingIndicatorProvider } from "./TypingIndicatorContext";

const Chat = ({ userId }) => {
  const [activeConversation, setActiveConversation] = useState(null);
  const conversations = [
    {
      id: 1,
      contactName: "Alice",
      lastMessage: "Hey! How are you?",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          content: "Hi there!",
          author: "Alice",
          timestamp: "2023-08-27 10:00 AM",
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
          content: "Hello!",
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
