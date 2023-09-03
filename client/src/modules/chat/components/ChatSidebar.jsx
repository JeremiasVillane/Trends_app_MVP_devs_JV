import ConversationList from "./ConversationList";
import ConversationSearchBar from "./ConversationSearchBar";
import styles from "./ChatSidebar.module.css";
import ConversationButtons from "./ConversationButtons";

const ChatSidebar = ({ onSearch, onCreatePrivateChat, onCreateGroup }) => {
  return (
    <div className={styles.chat_sidebar}>
      <ConversationSearchBar onSearch={onSearch} />
      <ConversationButtons
        onCreatePrivateChat={onCreatePrivateChat}
        onCreateGroup={onCreateGroup}
      />
      <ConversationList />
    </div>
  );
};

export default ChatSidebar;
