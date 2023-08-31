import ConversationList from "./ConversationList";
import ConversationSearchBar from "./ConversationSearchBar";
import styles from "./ChatSidebar.module.css";
import ConversationButtons from "./ConversationButtons";

const ChatSidebar = ({ onSearch, onCreateGroup }) => {
  return (
    <div className={styles.chat_sidebar}>
      <ConversationSearchBar onSearch={onSearch} />
      <ConversationButtons onCreateGroup={onCreateGroup} />
      <ConversationList />
    </div>
  );
};

export default ChatSidebar;
