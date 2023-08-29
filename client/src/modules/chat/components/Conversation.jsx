import axios from "axios";
import Avatar from "./Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({
  isGroup,
  conversationId,
  contactName,
  contactAvatar,
  contactStatus,
  messages,
  lastMessage,
  unreadCount,
  setActiveConversation,
}) => {
  return (
    <div
      className={styles.conversation_item}
      onClick={async () => {
        setActiveConversation(conversationId);

        if (isGroup) {
          for (const message of messages) {
            if (message.messageStatus === "sent") {
              await axios.put(
                `http://localhost:3001/api/v1/chatroom/groups/${conversationId}/messages/${message.messageId}`,
                { content: message.content, messageStatus: "read" },
                {
                  withCredentials: "include",
                }
              );
            }
          }
        } else {
          for (const message of messages) {
            if (message.messageStatus === "sent") {
              await axios.put(
                `http://localhost:3001/api/v1/chatroom/chat/${conversationId}/message/${message.messageId}`,
                { content: message.content, messageStatus: "read" },
                {
                  withCredentials: "include",
                }
              );
            }
          }
        }
      }}
    >
      <Avatar
        imageUrl={contactAvatar}
        altText={contactName}
        size={"50px"}
        status={contactStatus}
      />
      <div className={styles.conversation_details}>
        <h3>{contactName}</h3>
        <p>{lastMessage?.content || "No messages"}</p>
      </div>
      {unreadCount > 0 && (
        <div className={styles.unread_count}>{unreadCount}</div>
      )}
    </div>
  );
};

export default Conversation;
