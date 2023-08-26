import Avatar from "./Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({
  conversationId,
  contactName,
  lastMessage,
  unreadCount,
  setActiveConversation,
}) => {
  return (
    <div
      className={styles.conversation_item}
      onClick={() => setActiveConversation(conversationId)}
    >
      <Avatar />
      <div className={styles.conversation_details}>
        <h3>{contactName}</h3>
        <p>{lastMessage}</p>
      </div>
      {unreadCount > 0 && (
        <div className={styles.unread_count}>{unreadCount}</div>
      )}
    </div>
  );
};

export default Conversation;
