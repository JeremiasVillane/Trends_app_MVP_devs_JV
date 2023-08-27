import ConversationList from "./ConversationList";
import ConversationSearchBar from "./ConversationSearchBar";
import styles from "./ChatSidebar.module.css";

const ChatSidebar = ({
  conversations,
  setActiveConversation,
  handleSearch,
}) => {
  return (
    <div className={styles.chat_sidebar}>
      <ConversationSearchBar onSearch={handleSearch} />
      <ConversationList
        conversations={conversations}
        setActiveConversation={setActiveConversation}
      />
    </div>
  );
};

export default ChatSidebar;
