import Conversation from "./Conversation";
import styles from "./ConversationList.module.css";

const ConversationList = ({ conversations, setActiveConversation }) => {
  return (
    <div className={styles.conversation_list}>
      {conversations.map((conversation, index) => (
        <Conversation
          key={index}
          isGroup={conversation.isGroup}
          conversationId={conversation.id}
          contactName={conversation.name}
          contactAvatar={conversation.image}
          contactStatus={conversation.status}
          messages={conversation.messages}
          lastMessage={conversation.lastMessage}
          unreadCount={conversation.unreadCount}
          setActiveConversation={setActiveConversation}
        />
      ))}
    </div>
  );
};

export default ConversationList;
