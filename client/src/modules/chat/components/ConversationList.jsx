import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import styles from "./ConversationList.module.css";

const ConversationList = ({ setShowMessagesInSmallScreens, isSmallerThan590 }) => {
  const conversations = useSelector((state) => state.chat.conversations);

  return (
    <div className={styles.conversation_list}>
      {conversations?.map((conversation, index) => (
        <Conversation
          key={index}
          isGroup={conversation.isGroup}
          conversationId={conversation.id}
          contactName={conversation.name}
          contactAvatar={conversation.image}
          contactStatus={conversation.status}
          messages={conversation.messages}
          lastMessage={conversation.lastMessage}
          setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
          isSmallerThan590={isSmallerThan590}
          // unreadCount={conversation.unreadCount}
        />
      ))}
    </div>
  );
};

export default ConversationList;
