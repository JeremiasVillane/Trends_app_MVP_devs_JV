import Conversation from "./Conversation";
import styles from "./ConversationList.module.css";

const ConversationList = ({ conversations, setActiveConversation }) => {
  return (
    <div className={styles.conversation_list}>
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversationId={conversation.id}
          contactName={conversation.contactName}
          lastMessage={conversation.lastMessage}
          unreadCount={conversation.unreadCount}
          setActiveConversation={setActiveConversation}
        />
      ))}
    </div>
  );
};

export default ConversationList;
